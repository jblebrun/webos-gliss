/*
 * Copyright 2009 OpenSourceJason
 * 
 * Modification and redistribution prohibited.
 * 
 */

function GamePlayAssistant(args){
    this.maps = [[0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1]];
 
    this.levels = [{
        map: 0,
        colors: 5,
        set: 100,
        startWith: 4,
        time: 60,
        wild_count: 5,
        multiplier: 5
    }, {
        map: 1,
        colors: 5,
        set: 100,
        startWith: 4,
        time: 60,
        wild_count: 5,
        multiplier: 10
    }, {
        map: 2,
        colors: 5,
        set: 100,
        startWith: 4,
        time: 60,
        wild_count: 4,
        multiplier: 15
    }, {
        map: 3,
        colors: 5,
        set: 100,
        startWith: 4,
        time: 60,
        wild_count: 4,
        multiplier: 20
    }, {
        map: 0,
        colors: 6,
        set: 150,
        startWith: 6,
        time: 60,
        wild_count: 5,
        multiplier: 25
    }, {
        map: 1,
        colors: 6,
        set: 150,
        startWith: 6,
        time: 60,
        wild_count: 5,
        multiplier: 30
    }, {
        map: 2,
        colors: 6,
        set: 150,
        startWith: 6,
        time: 60,
        wild_count: 4,
        multiplier: 40
    }, {
        map: 3,
        colors: 6,
        set: 150,
        startWith: 6,
        time: 60,
        wild_count: 4,
        multiplier: 50
    }];
	
    /*Constants*/
	//Block types
	this.MAP_TILE_TYPE = 1;
	this.SPRITE_TYPE = 2;
	
	//Sizes
    this.BLOCK_SIZE = 40;
    this.TILE_SIZE = 44;
    
	//Tile types
	this.HOLE_TILE = 0;
    this.EMPTY_TILE = 1;
	 this.tile_classes = ['hole', 'empty'];
	
	//Sprite types
    this.WILD_TILE = 0;
    this.sprite_classes = ['wild', 'red', 'blue', 'green', 'yellow', 'orange', 'purple'];
    
	//Element pools
    this.sprite_pool = [];
    this.map_tiles = [];
    
    //Cookies
    this.saved_state = new Mojo.Model.Cookie("GameState");
    this.saved_blocks = new Mojo.Model.Cookie("GameBlocks");
    this.saved_queue = new Mojo.Model.Cookie("BlockQueue");
    this.high_scores = new Mojo.Model.Cookie("HighScores");
	
    //Transient state
    this.selectedSrc = null;
    this.moving = null;
    this.paths = [];
    this.wild_count = 0;
	this.removing = 0;
    
    //Game state
    this.orientation = "up";
    this.spots = 0;
    this.holes = 0;
    this.map_blocks = [];
    this.current_map = null;
    this.block_count = 0;
	this.empty;
	this.wild_count = 5;
	this.multiplier = 1;
	
	//Set up block accounting. Used to determine quickly if
	//Possible moves remain.
    this.accounting = {};
	for(var s = 0; s <  this.sprite_classes.length; s++) {
		this.accounting[this.sprite_classes[s]] = 0;
	}
    
    //Game state that needs to be saved
    this.score = 0;
    this.level = 0;
    this.block_queue = [];
    this.blocks = {};
	this.moving_to = null;
    
    //State passed in from start screen
    this.restore = args;
      
}

GamePlayAssistant.prototype.cleanup = function(event){	
    if (!this.game_is_over) {
		//Make a saved state object.
        var ss = {
            score: this.score,
            level: this.level,
			moving_to: this.moving_to,
			valid: true,
            
        };
        
        //Build a list of block types to save
        var sb = [];
        for (var i in this.blocks) {
            sb.push([this.blocks[i].tile_type, i]);
        }
        
        this.saved_blocks.put(sb);
        this.saved_queue.put(this.block_queue);
        this.saved_state.put(ss);   
    }
}

GamePlayAssistant.prototype.updateNextBlocks = function(){
    var nexts = Math.min(3, this.block_queue.length);
    $$('.sprite.next').each(function(el){
        el.style.display = "none";
    });
    for (var i = 0; i < nexts; i++) {
        $('next_block_' + i).style.display = 'block';
        this.controller.get('next_block_' + i).className = "sprite | next "+ this.sprite_classes[this.block_queue[i]];
    }
	
    $('remaining').innerHTML = this.block_queue.length;   
}

GamePlayAssistant.prototype.buildBlockQueue = function(count, colors){
    this.block_queue = [];
    for (var i = 0; i < count; i++) {
        this.block_queue.push(Math.floor(Math.random() * colors) + 1);
    }
}

GamePlayAssistant.prototype.putSprite = function(type, position){
    var sprite = this.sprite_pool.shift();
	sprite.className = "sprite | " +this.sprite_classes[type];
	this.accounting[this.sprite_classes[type]]++;
    sprite.tile_type = type;
    sprite.style.top = this.TILE_SIZE * Math.floor(position / 7) + "px";
    sprite.style.left = this.TILE_SIZE * (position % 7) + "px";
    sprite.style.display = "block";
	sprite.style.opacity = 1.0;
	sprite.position = position;
    this.blocks[position] = sprite;
    this.block_count++;	
}

GamePlayAssistant.prototype.removeSprite = function(sprite) {
	this.accounting[this.sprite_classes[sprite.tile_type]]--;
	this.sprite_pool.push(sprite);
	sprite.style.display = "none";
	delete this.blocks[sprite.position];
	sprite.position = null;	
}

GamePlayAssistant.prototype.fadeOutSprite = function(sprite){
	this.accounting[this.sprite_classes[sprite.tile_type]]--;
    
    if (sprite === this.blocks[sprite.position]) {
		this.sprite_pool.push(sprite);
		
		delete this.blocks[sprite.position];
		sprite.position = null;
		
		var fader = document.createElement('div');
		fader.className = "sprite | fader";
		fader.style.backgroundColor = 'white';
		
		fader.style.opacity = 0.0;
		sprite.appendChild(fader);
		this.removing++;
		Mojo.Animation.animateStyle(fader, 'opacity', 'linear', {
			duration: 0.25,
			from: 0.0,
			to: 1.0,
			styleSetter: function(value){
				fader.style.opacity = value;
			},
			onComplete: (function(){
				sprite.style.opacity = 1.0;
				Mojo.Animation.animateStyle(sprite, 'opacity', 'linear', {
					duration: 0.5,
					from: 1.0,
					to: 0.0,
					styleSetter: function(value){
						sprite.style.opacity = value;
					},
					onComplete: (function(){
						sprite.style.display = "none";
						fader.remove();
						this.block_count--;
						this.removing--;
						
						if (this.block_count === 0) {
							this.levelComplete(true);
            			} else if (this.block_queue.length === 0 && this.removing === 0) {
							this.checkForMoves();
						}
					}).bind(this)
				});				
			}).bind(this)
		});
	}   
}

GamePlayAssistant.prototype.addRandomBlock = function(){
	if(this.game_is_over) {
		return;
	}
	if (this.empty <= this.block_count+1) {
        this.game_is_over = true;
		return;
    }	
    if (this.block_queue.length == 0) {
        return false;
    }
    
    var type = this.block_queue.shift();
       
    //+1 because we need to make sure to check at least once
    
    var choice = Math.floor(Math.random() * (this.empty - this.block_count)) + 1;
    
    for (var i = 0; i < 49; i++) {
    
        if (this.current_map[i] === 1 && !this.blocks[i]) {
            choice--;
        }
        if (choice === 0) {
            break;
        }
    }
    this.putSprite(type, i);
       
    return i;
}


GamePlayAssistant.prototype.clearPaths = function(){
    for (var i = 0; i < 49; i++) {
        this.paths[i] = null;
        this.map_tiles[i].removeClassName('possible');
    }
}


GamePlayAssistant.prototype.moveAlongPath = function(sprite, path, finished_callback){

    if (path.length < 2) {       
        finished_callback();
        return;
    }
	var duration = 0.075;
	var curve = "linear";
	
    var start = path.shift();
    
    if (path[0][0] === start[0]) {   
        Mojo.Animation.animateStyle(sprite, 'top', curve, {
            duration: duration,
            from: start[1] * this.TILE_SIZE,
            to: path[0][1] * this.TILE_SIZE,
            onComplete: (function(){
                this.moveAlongPath(sprite, path, finished_callback);
            }).bind(this)
        });        
    } else {
        Mojo.Animation.animateStyle(sprite, 'left', curve, {
            duration: duration,
            from: start[0] * this.TILE_SIZE,
            to: path[0][0] * this.TILE_SIZE,
            onComplete: (function(){
                this.moveAlongPath(sprite, path, finished_callback);
            }).bind(this)
        });       
    }
}

GamePlayAssistant.prototype.handleOrientation = function(o){
	
	var els = document.getElementsByClassName('rotatable');
	
    if (o.position === 4 || o.position === 5) {		
		for(var i = 0; i<els.length; i++) {
			els[i].addClassName('horizontal');
		}       
    } else if(o.position === 2 || o.position ===3) {   
	 	
        for(var i = 0; i<els.length; i++) {
			els[i].removeClassName('horizontal');
		}
    }
}


GamePlayAssistant.prototype.checkForMatch = function(src){
	
    if (!this.blocks[src]) {
        Mojo.Log.error('no block at', src);
        return;
    }
    var win_set = [];
    //Check the row of the moved block's new position for a win
    var y = Math.floor(src / 7);
    var x = src % 7;
    
    var indexers = [
		function(i){
        	return y * 7 + i;
    	}, 
		function(i){
        	return i * 7 + x;
    	}
	];
    
    var tmp_win_set = [];
    
    for (var f = 0; f < 2; f++) {
        var indexer = indexers[f];
        var matching = this.WILD_TILE;
        tmp_win_set = [];
        var gettin_wild = false;
        for (var i = 0; i < 7; i++) {
        	
            var b = this.blocks[indexer(i)];

            if (b && (b.tile_type == this.WILD_TILE || matching == this.WILD_TILE || b.tile_type == matching)) {
                tmp_win_set.push(b);                
                if (!gettin_wild && b.tile_type === this.WILD_TILE) {
                    gettin_wild = true;
                } else {
                    gettin_wild = false;
                    matching = b.tile_type;
                }               
            } else {
                if (tmp_win_set.length > 2) {
                    win_set = win_set.concat(tmp_win_set);
                }
                if (b) {
					//Remove everything from the tmp set 
					//that's not a wild tile
                    var j = tmp_win_set.length - 1;
                    while (j > 0 && tmp_win_set[j].tile_type === this.WILD_TILE) {
                        j--;
                    }                   
                    tmp_win_set = tmp_win_set.splice(j + 1);
                    tmp_win_set.push(b);
                    matching = b.tile_type;
                } else {                   
                    tmp_win_set = [];
                    matching = this.WILD_TILE;
                }
            }           
        }
        if (tmp_win_set.length > 2) {
            win_set = win_set.concat(tmp_win_set);
        }
    }
       
    var wild_count = 0;
   
    win_set.each((function(b){
        //Already removed
        if (b.position === null) {
            return;
        }
        if (b.tile_type === this.WILD_TILE) {
            wild_count++;
        }      
        this.fadeOutSprite(b);       
    }).bind(this));
    
    score_add = (win_set.length) * (win_set.length - 2) * (wild_count + 1) * this.multiplier;
	
    if (score_add > 0) {
    	this.score += score_add;
        var last_point_sprite = $('last_points_sprite');
        last_point_sprite.innerHTML = score_add;
		last_point_sprite.style.display = "block";
		last_point_sprite.style.top = y*44+40+"px";
		last_point_sprite.style.left = x*44+20+"px";
        Mojo.Animation.animateStyle(last_point_sprite, "top", "ease-out",
			{from: y*44+40,
			 to: -10,
			 duration: 1
			 }
			
		);
		Mojo.Animation.animateStyle(last_point_sprite, "left", "ease-out",
			{from: x*44+20,
			 to: 330,
			 duration: 1
			 }		
		);
		           
    }
    this.controller.get('score').innerHTML = this.score;
    
	if (win_set.length >= this.wild_count && this.block_count > win_set.length) {
        this.putSprite(0, src);
		this.checkForMatch(src);
    }
    return win_set.length;
}

GamePlayAssistant.prototype.setupMap = function(level){
    this.holes = 0;
    this.empty = 0;
    
	this.current_map = this.maps[this.levels[level].map];
	
    for (var position = 0; position < 49; position++) {
		
        var tile_type = this.current_map[position];
        var tile_class = this.tile_classes[tile_type];
        var tile = this.map_tiles[position];
        
        if (tile_type === this.EMPTY_TILE) {
            this.empty++;
        }
		
        if (tile_type === this.HOLE_TILE) {
            this.holes++;
        }
		
        tile.tile_type = tile_type;
        tile.className = "map_tile " + tile_class;
    }
}

GamePlayAssistant.prototype.startLevel = function(level){
    
    $('level').innerHTML = level + 1;
    $('score').innerHTML = this.score;
    
	level = this.levels[level];
	for(var b in this.blocks) {
		this.removeSprite(this.blocks[b]);
	}
	this.blocks = {};
    this.block_count = 0;
    this.wild_count = level.wild_count;
    this.multiplier = level.multiplier;
     
    this.setupMap(level.map);
    this.buildBlockQueue(level.set, level.colors);
    for (var i = 0; i < level.startWith; i++) {
        this.addRandomBlock();
    }
	
	this.clearPaths();
    this.updateNextBlocks();
    this.done_button.style.display = 'none';
}

GamePlayAssistant.prototype.restoreGame = function() {	
    var sb = this.saved_blocks.get();
    var sq = this.saved_queue.get();
    var ss = this.saved_state.get();
	
    if(!ss.valid) {
		this.saved_state.put({valid: false});
		this.level = 0;
		this.startLevel(0);
	}
	
    this.block_queue = sq;
    this.level = ss.level;
	this.moving_to = ss.moving_to; 
    var level = this.levels[this.level];
	this.setupMap(level.map);	
    this.score = ss.score;
    this.wild_count = level.wild_count;
    this.multiplier = level.multiplier;
    $('level').innerHTML = this.level+1;
    $('score').innerHTML = this.score;
	
    this.updateNextBlocks();
    if (sq.length == 0) {
        this.done_button.style.display = 'block';
    }
	
    for(var b = 0; b < sb.length; b++) {
		this.putSprite(sb[b][0],sb[b][1]);
	}	
	
	/* If the game was moving a block into a position before cleanup,
	 * the match would not have been calculated. So figure it out now.
	 */
	if (this.moving_to !== null) {
		this.checkForMatch(this.moving_to);
		this.moving_to = null;
	}
}

GamePlayAssistant.prototype.setup = function(event){  
    /* Make rotation work */
    if (this.controller.stageController.setWindowOrientation) {
        this.controller.stageController.setWindowOrientation("free");
    }
    
	/* Set up map elements, and pre-create block sprites */
	var map = $('map_area');
    for (var y = 0; y < 7; y++) {
        for (var x = 0; x < 7; x++) {
            var position = y * 7 + x;
            
			var s = document.createElement('div');
            s.addClassName('sprite');
            s.style.display = "none";
			s.type = this.SPRITE_TYPE;
            this.sprite_pool.push(s);
			map.appendChild(s);
			
			var m = document.createElement('div');
            m.addClassName('map_tile');
			m.style.top = y * this.TILE_SIZE + "px";
            m.style.left = x * this.TILE_SIZE + "px";
			m.position = position;
			m.type = this.MAP_TILE_TYPE;
			this.map_tiles.push(m);
			map.appendChild(m);           
        }
    }
	
    /* setup widgets here */
    this.controller.setupWidget("done_button", {
        label: "Done!"
    }, {
        disabled: false
    });
	this.controller.setupWidget("game_over_button", {
        label: "OK"
    }, {
        disabled: false
    });
	this.controller.setupWidget("level_over_button", {
        label: "OK"
    }, {
        disabled: false
    });
    this.done_button = this.controller.get('done_button');
    /* add event handlers to listen to events from widgets */
    this.controller.listen(document, 'orientationchange', this.handleOrientation.bindAsEventListener(this));
    this.controller.listen(this.done_button, Mojo.Event.tap, this.handleDoneTap.bindAsEventListener(this));
    this.controller.listen(this.controller.get('game_over_button'), Mojo.Event.tap, this.handleOkTap.bindAsEventListener(this));
    this.controller.listen(this.controller.get('level_over_button'), Mojo.Event.tap, this.handleNextLevelTap.bindAsEventListener(this));
    
	/* Map area is a delegate event handler*/
	this.controller.get('map_area').addEventListener(Mojo.Event.tap, this.handleBlockTap.bind(this));
	    
    
    /* Set up game screen */
    if (this.restore === 'continue') {       
        this.restoreGame();
    } else {
		this.saved_state.put({valid: false});
        this.level = 0;
        this.startLevel(0);
    }
}

/*Breadth-first search of possible path*/
/*This marks all possible squares, and stores their paths*/
GamePlayAssistant.prototype.calculatePaths = function(src){
    /* queue structure: [ [point, [[x,y],[x,y],[x,y]]], ... */
    var bfs_queue = [[src, [[src % 7, Math.floor(src / 7)]]]];
    //First set up closest paths
    while (bfs_queue.length > 0) {
        var to_search = bfs_queue.shift();
        el = to_search[0];
        var path = to_search[1];
        
        var src_x = el % 7;
        var src_y = Math.floor(el / 7);
        var possibles = [[src_x - 1, src_y], [src_x + 1, src_y], [src_x, src_y - 1], [src_x, src_y + 1]];
        
        for (var i = 0; i < 4; i++) {
            var possible = possibles[i];
            var x = possible[0];
            var y = possible[1];
            var position = y * 7 + x;
            
            if (x < 0 || y < 0 || x >= 7 || y >= 7) {
                continue;
            }
            if (this.blocks[position]) {
                continue;
            }
            if (this.map_tiles[position].tile_type !== 1) {
                continue;
            }
            if (this.paths[position] != null) {
                continue;
            }
            path.push([x, y]);
            
            bfs_queue.push([position, path.slice()]);
            this.map_tiles[position].addClassName('possible');
            
            this.paths[position] = path.slice();
            
            path.pop();
        }
    }
}

GamePlayAssistant.prototype.levelComplete = function(cleared){
	if (cleared) {
		var cb = 1000 * (this.level + 1);
		var bqb = 0;
		if (this.block_queue.length > 0) {
			bqb = 100 * this.block_queue.length;
		}
		this.score += cb + bqb;
		this.controller.get('level_over_text').innerHTML = "Clear bonus: "+cb+"<br/>"+"Blocks bonus:"+bqb;
		
	} else {
		this.controller.get('level_over_text').innerHTML = "No more moves.";
	}
	this.controller.get('level_over').style.display="block";
}

GamePlayAssistant.prototype.handleNextLevelTap = function(event) {
	this.controller.get('level_over').style.display="none";
	this.level++;
    if (this.levels[this.level]) {
        this.startLevel(this.level);
    } else {
        this.gameOver(true);
    }
}

GamePlayAssistant.prototype.handleDoneTap = function(event){
    this.levelComplete(false);
}

GamePlayAssistant.prototype.checkForMoves = function(){
    var moves_possible = false;
    var wilds = this.accounting['wild'];
    if (wilds > 3) {
        moves_possible = true;
    } else {
        for (a in this.accounting) {
            if (this.accounting[a] === 'wild') {
                continue;
            }
            if (this.accounting[a] >= 3 - wilds) {
                moves_possible = true
                break;
            }
        }
    }
    if (!moves_possible) {
        this.levelComplete(false);
    }
}
GamePlayAssistant.prototype.handleBlockTap = function(event){
    var target = event.target;
	if(!target) {
		Mojo.Log.error('no target');
		return;
	}
	var position = target.position;
	if(position == null) {
		Mojo.Log.error('unspecified position');
		return;
	}
    
	//If we tapped a color block
    if (target.type === this.SPRITE_TYPE) {
        if (this.selectedSrc === position) {
			 //Tapped the same block... deselect
            target.removeClassName('selected');
            this.clearPaths();
            this.selectedSrc = null;
			
            
        } else {
			//Tapped a different block... unselect current if it exists
            //And select the tapped one
			this.clearPaths();
            this.calculatePaths(position, []);
            target.addClassName('selected');
            if (this.selectedSrc != null && this.blocks[this.selectedSrc]) {
                this.blocks[this.selectedSrc].removeClassName('selected');
            }
            this.selectedSrc = position;
            
        }
        
        
    } else if (this.moving === null && target.tile_type === this.EMPTY_TILE && target.hasClassName('possible')) {
        /*If a color block was selected, 
         * and we have tapped an empty block
         * reachable from the selected block...
         */
		
        this.moving = this.selectedSrc;
        this.moving_to = position;
        var path = this.paths[position];
        this.clearPaths();
        var src_block = this.blocks[this.selectedSrc];
        src_block.removeClassName('selected');
        
        this.moveAlongPath(src_block, path, (function(){
            
            this.moving = null;
			this.moving_to = null;
            var matched_count = this.checkForMatch(position);
            
            
            if (matched_count === 0) {
                var new_blocks = [];
				new_blocks.push(this.addRandomBlock());
                new_blocks.push(this.addRandomBlock());
                new_blocks.push(this.addRandomBlock());
                for(var i=0; i<new_blocks.length; i++) {
					if (new_blocks[i] != null) {
						this.checkForMatch(new_blocks[i]);
					}
				}
				
                this.updateNextBlocks();
				//addRandomBlock will set game_is_over if it couldn't add anymore
				if(this.game_is_over) {
					this.gameOver(false);
				}
                if (this.block_queue.length === 0) {
                    this.done_button.style.display = 'block';
					this.checkForMoves();
					
                }
            }             
			if (this.block_count === 0) {
                this.levelComplete(true);
            }            
        }).bind(this));
        
        this.blocks[position] = src_block;
        src_block.position = position;
        delete this.blocks[this.selectedSrc];
        this.selectedSrc = null;  
    }
}


GamePlayAssistant.prototype.gameOver = function(won){
    this.game_is_over = true;
	
    var hs = this.high_scores.get();
    if (!hs || this.score > hs) {
        this.high_scores.put(this.score);
    }
	
	if(won) {
		$('game_over_text').innerHTML = "You win!";
	} else {
		$('game_over_text').innerHTML = "Game Over";
	}
	$('game_over').style.display = "block";
	$('game_over').style.width = "260px";
	
    
}
GamePlayAssistant.prototype.handleOkTap = function() {
	this.controller.stageController.popScene();
	
}
