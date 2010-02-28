/*
 * Copyright 2009 OpenSourceJason
 * 
 * Modification and redistribution prohibited.
 * 
 */

function GamePlayAssistant(args){
    this.maps = [
	[
        0,1,1,1,1,1,0,
		1,1,1,1,1,1,1,
	    1,1,1,1,1,1,1,
        1,1,1,0,1,1,1,
    	1,1,1,1,1,1,1,
    	1,1,1,1,1,1,1,
    	0,1,1,1,1,1,0
	],	
	[1,1,1,0,1,1,1,
     1,1,1,0,1,1,1,
     1,1,1,1,1,1,1,
     0,0,1,1,1,0,0,
     1,1,1,1,1,1,1,
     1,1,1,0,1,1,1,
     1,1,1,0,1,1,1
	 ],
	 
	[1,1,1,0,1,1,1,
     1,1,0,0,1,1,1,
     1,1,1,1,1,0,1,
     0,0,1,1,1,0,0,
     1,0,1,1,1,1,1,
     1,1,1,0,0,1,1,
     1,1,1,0,1,1,1],
	[
	 0,0,1,1,1,0,0,
	 0,0,1,1,1,0,0,
	 1,1,1,1,1,1,1,
	 1,1,1,0,1,1,1,
	 1,1,1,1,1,1,1,
	 0,0,1,1,1,0,0,
	 0,0,1,1,1,0,0
	 
	 ],	
	 [
	   0,1,1,1,1,1,0,
	   0,0,0,1,0,0,0,
       0,1,1,1,1,1,0,
       1,1,1,1,1,1,1,
       0,1,1,1,1,1,0,
       0,0,0,1,0,0,0,
       0,1,1,1,1,1,0
	 ],
	  
	 [
      0,1,1,1,1,1,1,0,
      1,0,0,1,1,1,1,1,
      1,0,0,1,0,0,1,1,
      1,1,1,1,0,0,1,1,
      1,1,1,1,1,1,1,1,
      1,1,0,0,1,1,0,0,
      0,1,0,0,1,1,0,0,
      0,1,1,1,1,1,1,1
     ],
	 [1,1,1,1,1,0,0,0,
      1,1,1,1,1,0,0,0,
      1,1,0,1,1,0,1,1,
      1,1,0,1,1,0,1,1,
      1,1,0,1,1,0,1,1,
      1,1,0,1,1,0,1,1,
      0,0,0,1,1,1,1,1,
      0,0,0,1,1,1,1,1     
     ],
	 [0,0,1,1,1,1,0,0,
      0,0,1,1,1,1,0,0,
      1,1,0,1,1,0,1,1,
      1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,
      1,1,0,1,1,0,1,1,
      0,0,1,1,1,1,0,0,
      0,0,1,1,1,1,0,0     
     ],
	 [0,1,1,0,0,1,1,0,
      1,1,1,0,0,1,1,1,
      1,1,1,0,0,1,1,1,
      0,0,1,1,1,1,0,0,
      0,0,1,1,1,1,0,0,
      1,1,1,0,0,1,1,1,
      1,1,1,0,0,1,1,1,
      0,1,1,0,0,1,1,0    
     ],
	
	 
	 [0,0,0,1,1,1,1,0,
      1,0,0,1,1,1,0,0,
      1,1,0,1,1,0,0,0,
      1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,
      0,0,0,1,1,0,1,1,
      0,0,1,1,1,0,0,1,
      0,1,1,1,1,0,0,0     
     ],
	 [0,1,1,1,1,1,1,0,
      0,0,0,1,1,0,0,0,
      0,0,1,1,1,1,0,0,
      1,1,1,1,1,1,1,1,
      0,1,1,1,1,1,1,0,
      0,0,1,1,1,1,0,0,
      0,0,0,1,1,0,0,0,
      0,0,0,1,1,0,0,0     
     ],
	 [1,1,1,1,1,1,1,1,1,
	  1,1,0,0,1,0,0,1,1,
	  1,1,0,0,1,0,0,1,1,
	  1,1,1,1,1,1,1,1,1,
      1,1,1,1,0,1,1,1,1,
      1,1,1,1,0,1,1,1,1,
      1,0,1,1,1,1,1,0,1,
      1,1,0,0,0,0,0,1,1,
      1,1,1,1,1,1,1,1,1 
	 ],
	 [0,1,1,0,0,0,1,1,0,
      1,1,1,0,0,0,1,1,1,
      1,1,1,0,0,0,1,1,1,
      0,0,1,1,1,1,1,0,0,
      0,0,1,1,1,1,1,0,0,
      0,0,1,1,1,1,1,0,0,
      1,1,1,0,0,0,1,1,1,
      1,1,1,0,0,0,1,1,1,
	  0,1,1,0,0,0,1,1,0
	      
     ],
	 [0,0,1,0,1,0,1,0,0,
      0,0,1,0,1,0,1,0,0,
      1,1,1,1,1,1,1,1,1,
      0,0,1,1,1,1,1,0,0,
      1,1,1,1,0,1,1,1,1,
      0,0,1,1,1,1,1,0,0,
      1,1,1,1,1,1,1,1,1,
      0,0,1,0,1,0,1,0,0,
      0,0,1,0,1,0,1,0,0
          
     ],
	 
	 [0,0,0,1,1,1,1,0,0,
      0,0,0,1,1,1,0,0,0,
      0,0,0,1,1,0,0,0,1,
      1,1,1,1,0,0,0,1,1,
      1,1,1,0,0,0,1,1,1,
	  1,1,1,1,0,1,1,1,1,
      0,0,0,1,1,1,0,0,0,
      0,0,0,1,1,1,0,0,0,
      0,0,0,1,1,1,0,0,0
	  
      
     ],
	 [0,0,0,1,1,1,0,0,0,
      0,0,1,1,1,1,1,0,0,
      0,1,0,1,0,1,0,1,0,
      1,1,1,1,0,1,1,1,1,
      1,1,0,0,0,0,0,1,1,
      1,1,1,1,0,1,1,1,1,
      0,1,0,1,0,1,0,1,0,
      0,0,1,1,1,1,1,0,0,
      0,0,0,1,1,1,0,0,0
          
     ],
	 
	 [
	  0,1,0,1,0,1,0,1,0,
	  1,1,1,1,1,1,1,1,1,
	  0,1,0,1,0,1,0,1,0,
      1,1,1,1,1,1,1,1,1,
	  0,1,0,1,0,1,0,1,0,
      1,1,1,1,1,1,1,1,1,
	  0,1,0,1,0,1,0,1,0,
      1,1,1,1,1,1,1,1,1,
	  0,1,0,1,0,1,0,1,0
	 ],
	 
	 [
	  1,1,1,1,0,1,1,1,1,
	  1,1,1,1,0,1,1,1,1,
	  1,1,1,0,0,0,1,1,1,
	  1,1,0,0,0,0,0,1,1,
	  1,1,0,0,0,0,0,1,1,
	  1,1,0,0,0,0,0,1,1,
	  1,1,1,0,0,0,1,1,1,
	  1,1,1,1,0,1,1,1,1,
	  1,1,1,1,0,1,1,1,1
	 
	 ]
	 ,
	  [
      1,1,1,1,0,1,1,1,1,
      1,1,1,1,0,1,1,1,1,
      1,1,1,1,0,1,1,1,1,
      1,1,1,1,0,1,1,1,1,
      1,1,1,0,0,0,1,1,1,
      1,1,0,1,1,1,0,1,1,
      1,1,0,1,1,1,0,1,1,
      1,0,1,1,1,1,1,0,1,
      0,1,1,1,1,1,1,1,0
     
     ],
	 [0,1,1,1,0,1,1,1,0,
      1,0,1,0,0,0,1,0,1,
      1,1,1,0,0,0,1,1,1,
      1,0,1,1,1,1,1,0,1,
      0,0,1,1,0,1,1,0,0,
      1,0,1,1,1,1,1,0,1,
      1,1,1,0,0,0,1,1,1,
      1,0,1,0,0,0,1,0,1,
      0,1,1,1,0,1,1,1,0        
     ]
	 
	 
	 ];
 
    this.levels = [
	{map: 0, colors: 5, wild_count: 5}, 
	{map: 1, colors: 6, wild_count: 5}, 
    {map: 2, colors: 6, wild_count: 4}, 
    {map: 3, colors: 6, wild_count: 5}, 
    {map: 4, colors: 5, wild_count: 4}, 
    
	{map: 5, colors: 5,  wild_count: 5}, 
    {map: 6, colors: 6,  wild_count: 4}, 
    {map: 7, colors: 6,  wild_count: 5}, 
    {map: 8, colors: 6,  wild_count: 4}, 
    {map: 9, colors: 6,  wild_count: 5},  
	{map: 10, colors: 6, wild_count: 5}, 
	
    {map: 11, colors: 6 ,wild_count: 5}, 
    {map: 12, colors: 6 ,wild_count: 5}, 
    {map: 13, colors: 6 ,wild_count: 5}, 
    {map: 14, colors: 6 ,wild_count: 4}, 
    {map: 15, colors: 6 ,wild_count: 4}, 
    {map: 16, colors: 6 ,wild_count: 5}, 
    {map: 17, colors: 6 ,wild_count: 5}, 
    {map: 18, colors: 6 ,wild_count: 5}, 
    {map: 19, colors: 6 ,wild_count: 4}, 
 
	];
	
    /*Constants*/
	//Block types
	this.MAP_TILE_TYPE = 1;
	this.SPRITE_TYPE = 2;
	
	this.MAGIC = "JBL";
	
	//Sizes
    this.BLOCK_SIZE = 40;
    this.TILE_SIZE = 44;
    this.SIZE = 7;
	this.MAXSIZE = 9;
	
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
	
	var hs = this.high_scores.get();
	if(!!hs && !!hs.highest_level) {
		this.highest_level = hs.highest_level;
	}
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
    this.restore = args['continue'];
	this.endless = args.endless;
	
	pref_cookie = new Mojo.Model.Cookie("Preferences")
	this.prefs = pref_cookie.get();
    if(this.prefs == undefined) {
		this.prefs = {
			sound: false
		}
	}
}

GamePlayAssistant.prototype.cleanup = function(event){	
    if (!this.game_is_over) {
		//Make a saved state object.
        var ss = {
            score: this.score,
            level: this.level,
			moving_to: this.moving_to,
			valid: true,
			endless: this.endless
            
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
    for(var i = 0; i < this.next_sprites.length; i++) {
		this.next_sprites[i].style.display = "hidden";
	}
	for(var i = 0; i < nexts; i++) {
		this.next_sprites[i].style.display = "block";
		this.next_sprites[i].className = "sprite | next "+ this.sprite_classes[this.block_queue[i]];
	}
	
    if (!this.endless) {
		this.remaining_span.innerHTML = this.block_queue.length;
	}
}

GamePlayAssistant.prototype.buildBlockQueue = function(count, colors){
    this.block_queue.length = 0;
    for (var i = 0; i < count; i++) {
        this.block_queue.push(Math.floor(Math.random() * colors) + 1);
    }
}

GamePlayAssistant.prototype.putSprite = function(type, position){
	var map_tile = this.map_tiles[position];
    var sprite = this.sprite_pool.shift();
	sprite.className = "sprite | " +this.sprite_classes[type];
	this.accounting[this.sprite_classes[type]]++;
    sprite.tile_type = type;
    sprite.style.top = map_tile.style.top;
    sprite.style.left = map_tile.style.left;
    sprite.style.display = "inline";
	sprite.fader.style.display = "none";
	sprite.style.opacity = 1.0;
	sprite.position = position;
    this.blocks[position] = sprite;
    this.block_count++;	
}

GamePlayAssistant.prototype.removeSprite = function(sprite) {
	this.accounting[this.sprite_classes[sprite.tile_type]]--;
	this.sprite_pool.push(sprite);
	sprite.style.display = "none";
	this.blocks[sprite.position] = null;
	sprite.position = null;	
}

GamePlayAssistant.prototype.fadeOutSprite = function(sprite){
	this.accounting[this.sprite_classes[sprite.tile_type]]--;
    
    if (sprite === this.blocks[sprite.position]) {
		this.sprite_pool.push(sprite);
		
		delete this.blocks[sprite.position];
		sprite.position = null;
		
		var fader = sprite.fader;
		fader.style.display = "block";
		this.removing++;
		
		var that = this;
		/* TODO
		 * Swtich to CSS transitions
		 */
		Mojo.Animation.animateStyle(fader, 'opacity', 'linear', {
			duration: 0.25,
			from: 0.0,
			to: 1.0,
			styleSetter: function(value){
				fader.style.opacity = value;
			},
			onComplete: function(){
				sprite.style.opacity = 1.0;
				Mojo.Animation.animateStyle(sprite, 'opacity', 'linear', {
					duration: 0.5,
					from: 1.0,
					to: 0.0,
					styleSetter: function(value){
						sprite.style.opacity = value;
					},
					onComplete: function(){
						sprite.style.display = "none";
						that.block_count--;
						that.removing--;
						
						if (that.block_count === 0) {
							that.levelComplete(true);
            			} else if (that.block_queue.length === 0 && that.removing === 0) {
							that.checkForMoves();
						}
					}
				});				
			}
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
    if (this.block_queue.length === 0) {
        return false;
    }
    
	
    var type = this.block_queue.shift();
	if(this.endless) {
        this.block_queue.push(Math.floor(Math.random() * this.levels[this.level].colors) + 1);
    }
       
    //+1 because we need to make sure to check at least once
    //And choice=0 is the break condition
	
	//TODO -- speed this loop up by maintaining a list of empty spots
	//Then just index a random number and splice out.
	//Push the empty spots on blockmoves and fadeouts
    var choice = Math.floor(Math.random() * (this.empty - this.block_count)) + 1;
    var i,j;
	for (var y = 0, l = this.SIZE; y < l; y++) {
		for (var x = 0, m = this.SIZE; x < m; x++) {
			i = y*this.MAXSIZE+x;
			j = y*this.SIZE+x;
			if (this.current_map[j] === 1 && !this.blocks[i]) {
				choice--;
			}
			if (choice === 0) {
				y = this.SIZE;
				break;
			}
		}
	}
	this.putSprite(type, i);
       
    return i;
}


GamePlayAssistant.prototype.clearPaths = function(){
    for (var i = 0, l=this.MAXSIZE*this.MAXSIZE; i < l; i++) {
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
    var that = this;
	
	/* TODO
	 * Switch to CSS transitions
	 * Once the state management of them
	 * is correct
	 */
    if (path[0][0] === start[0]) {   
        Mojo.Animation.animateStyle(sprite, 'top', curve, {
            duration: duration,
            from: start[1] * this.TILE_SIZE,
            to: path[0][1] * this.TILE_SIZE,
            onComplete: function(){
                that.moveAlongPath(sprite, path, finished_callback);
            }
        });        
    } else {
        Mojo.Animation.animateStyle(sprite, 'left', curve, {
            duration: duration,
            from: start[0] * this.TILE_SIZE,
            to: path[0][0] * this.TILE_SIZE,
            onComplete: function(){
                that.moveAlongPath(sprite, path, finished_callback);
            }
        });       
    }
}

GamePlayAssistant.prototype.handleOrientation = function(o){
	
	var els = document.getElementsByClassName('rotatable');
	
    if (o.position === 4 || o.position === 5) {		
		for(var i = 0, l = els.length; i<l; i++) {
			els[i].addClassName('horizontal');    
		}       
    } else if(o.position === 2 || o.position ===3) {   
	 	
        for(var i = 0, l=els.length; i<l; i++) {
			els[i].removeClassName('horizontal');
			
		}
    }
	this.last_points_offset_left = parseInt(this.map_area.offsetLeft) || 0;
    this.last_points_offset_top = parseInt(this.map_area.offsetTop) || 0;
}


	
GamePlayAssistant.prototype.checkForMatch = function(src){
	if (!this.blocks[src]) {
        Mojo.Log.error('no block at', src);
        return;
    }
    var win_set = [];
    //Check the row of the moved block's new position for a win
    var y = this.map_tiles[src].y;
	var x = this.map_tiles[src].x;
	Mojo.Log.info("x,y: "+x+", "+y);
	var MAXSIZE = this.MAXSIZE;
    var indexers = [
        function(i){
            return y * MAXSIZE + i;
        }, 
        function(i){
            return i * MAXSIZE + x;
        }
    ];
    
    var tmp_win_set = [];
    
    for (var f = 0; f < 2; f++) {
		var indexer = indexers[f];
        var matching = this.WILD_TILE;
        tmp_win_set.length = 0;
        var gettin_wild = false;
		
        for (var i = 0; i < this.SIZE; i++) {
        	var b = this.blocks[indexer(i)];
            if (b && (b.tile_type === this.WILD_TILE || matching === this.WILD_TILE || b.tile_type === matching)) {
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
                if (!!b) {
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
				    tmp_win_set.length = 0;
                    matching = this.WILD_TILE;
                }
            }           
        }
        if (tmp_win_set.length > 2) {
            win_set = win_set.concat(tmp_win_set);
        }
    }
       
    var wild_count = 0;
   
   if (win_set.length > 0) {
       if (this.prefs.sound) {
           this.controller.serviceRequest('palm://com.palm.audio/systemsounds', {
               method: "playFeedback",
               parameters: {
                   name: 'browser_01'
               }
           });
       }
   }
   for(var w_idx = 0, wl = win_set.length; w_idx < wl; w_idx++) {
   	    var b = win_set[w_idx];
		
		//Already removed, 
		//Need to check 
		//since we double-count intersection tile
        if (b.position === null) {
            continue;
        }
		//Keep track of wilds for scoring
        if (b.tile_type === this.WILD_TILE) {
            wild_count++;
        }      
        this.fadeOutSprite(b); 
   }
    score_add = (win_set.length) * (win_set.length - 2) * (wild_count + 1) * this.multiplier;
	if (score_add > 0) {
    	this.score += score_add;
        var last_point_sprite = this.last_points_sprite;
        last_point_sprite.innerHTML = score_add;
		last_point_sprite.style.display = "block";
		last_point_sprite.style.opacoty = 1.0;
		var top_start = (y*this.TILE_SIZE+(this.BLOCK_SIZE/2)) + this.last_points_offset_top;
		var left_start =  (x*this.TILE_SIZE+(this.BLOCK_SIZE/2)) + this.last_points_offset_left;
		last_point_sprite.style.top = top_start+"px";
		last_point_sprite.style.left = left_start+"px";
		Mojo.Log.info(this.last_points_offset_top+", "+this.last_points_offset_left);
		/* TODO
		 * Would love to switch this to CSS animations
		 * But the state management hasn't been quite right so far
		 * Keep an eye on this
		 */
        Mojo.Animation.animateStyle(last_point_sprite, "top", "ease-out", {
            from: top_start,
            to: -20,
            duration: 1.5
        });
        
        Mojo.Animation.animateStyle(last_point_sprite, "left", "ease-out", {
            from: left_start,
            to: -20,
            duration: 1.5
        });           
    }
    this.score_area.innerHTML = this.score.toString(true);
    
	if (win_set.length >= this.wild_count && this.block_count > win_set.length) {
        this.putSprite(0, src);
		
		this.checkForMatch.bind(this, src).delay(1);
    }
    return win_set.length;
}

GamePlayAssistant.prototype.setupMap = function(map){
    this.holes = 0;
    this.empty = 0;
    this.current_map = this.maps[map];
	
	this.SIZE = Math.floor(Math.sqrt(this.current_map.length));
	
	var tilesize =  Math.floor(320/this.SIZE);
	tilesize = tilesize - tilesize%2;
	blocksize = tilesize-4;
	this.TILE_SIZE = tilesize;
	this.BLOCK_SIZE = blocksize;
	var bordersize = (320-this.SIZE*this.TILE_SIZE)/2;
	
	this.map_area.style.borderWidth = bordersize+"px";
	this.map_area.style.width = 320- 2*bordersize + "px";
	this.map_area.style.height = 320- 2*bordersize +"px";
    
	
	
	for(var i = 0, l = this.map_tiles.length; i < l; i++) {
		var item = this.map_tiles[i];
		item.style.width = tilesize+"px";
        item.style.height = tilesize+"px";
        item.style.top = item.y * tilesize+"px";
        item.style.left = item.x * tilesize+"px";
	}
	for(var i = 0, l = this.sprite_pool.length; i < l; i++) {
        var item = this.sprite_pool[i];
        item.style.width = blocksize+"px";
        item.style.height = blocksize+"px";
    }
	for(var b in this.blocks) {
        var item = this.blocks[b];
        item.style.width = blocksize+"px";
        item.style.height = blocksize+"px";
    }
	
	
   
	for (var y = 0, l = this.SIZE; y < l; y++) {
		for (var x = 0, l = this.SIZE; x < l; x++) {
		    var position = y*this.MAXSIZE + x;
			var map_position = y*this.SIZE + x;
			var tile_type = this.current_map[map_position];
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
	
    
}

GamePlayAssistant.prototype.startLevel = function(level){
    
    $('level').innerHTML = level + 1;
    $('score').innerHTML = this.score.toString(true);
    
	this.level = level;
	level = this.levels[level];
	for(var b in this.blocks) {
		this.removeSprite(this.blocks[b]);
	}
	this.blocks = {};
	
    this.block_count = 0;
    this.wild_count = level.wild_count;
    this.multiplier = 5*(this.level+1);
    this.setupMap(level.map);
    this.buildBlockQueue(this.empty*3.5, level.colors);
    for (var i = 0; i < Math.floor(this.empty/8); i++) {
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
		
		this.startLevel(0);
	}
	Mojo.Log.info("saved level: "+ss.level);
    this.block_queue = sq;
    this.level = ss.level;
	this.moving_to = ss.moving_to; 
    var level = this.levels[this.level];
	this.setupMap(level.map);	
    this.score = ss.score;
	this.endless = ss.endless;
    this.wild_count = level.wild_count;
    this.multiplier = (1+this.level) * 5;
    $('level').innerHTML = this.level+1;
    $('score').innerHTML = this.score.toString(true);
	if(this.endless) {
        this.controller.get("blocks_left_label").innerHTML = "Endless Mode";
    } 
	
    this.updateNextBlocks();
    if (sq.length == 0) {
        this.done_button.style.display = 'block';
    }
	
    for(var b = 0, l = sb.length; b < l; b++) {
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
    
	if(this.endless) {
		this.controller.get("blocks_left_label").innerHTML = "Endless Mode";
	}
	
	if(!tallScreen) {	
		var els = document.getElementsByClassName("shortchange");
		for(var i = 0, l=els.length; i<l; i++) {
			els[i].className += ' short';
		}
	}
	this.a = new Audio();
	this.a.autoplay = false;
	this.a.src = Mojo.appPath+"iv.mp3";
	this.a.autoplay = false;
	/* Cache some dom elements */
    this.last_points_sprite = this.controller.get('last_points_sprite');
    this.score_area = this.controller.get('score');
    this.map_area = this.controller.get('map_area');
	this.map_tile_container = this.controller.get('map_tile_container');
	this.game_over = this.controller.get('game_over');
	this.game_over_text = this.controller.get('game_over_text');
	this.remaining_span = this.controller.get('remaining');
	this.short_remaining_span = this.controller.get('remaining_short');
    
	this.next_sprites = $$('.sprite.next.normal');
	this.short_next_sprites = $$('.sprite.next.short');
	
	/* Set up map elements, and pre-create block sprites */
	var map = this.map_tile_container;
	for (var y = 0; y < this.MAXSIZE; y++) {
        for (var x = 0; x < this.MAXSIZE; x++) {
            var position = y * this.MAXSIZE + x;
            
			var s = document.createElement('div');
            s.className = 'sprite';
            s.style.display = "none";
			s.type = this.SPRITE_TYPE;
            this.sprite_pool.push(s);
			map.appendChild(s);
			
			var f = document.createElement('div');			
            f.className = "sprite fader";
            f.style.display = "none";
			s.fader = f;
            s.appendChild(f);
			
			var m = document.createElement('div');
            m.className = 'map_tile';
			m.style.top = y * this.TILE_SIZE + "px";
            m.style.left = x * this.TILE_SIZE  + "px";
			m.x = x;
			m.y = y;
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
	this.controller.setupWidget("endless_level_button", {
        label: "Go!"
    }, {
        disabled: false
    });
	
	
	this.controller.setupWidget("endless_level_select",
         this.attributes = {
             label: 'Level',
             modelProperty: 'value',
             min: 1,
             max: this.highest_level

         },
         this.levelPickerModel = {
             value: 1
         });

	
    this.done_button = this.controller.get('done_button');
    /* add event handlers to listen to events from widgets */
    this.controller.listen(document, 'orientationchange', this.handleOrientation.bindAsEventListener(this));
    this.controller.listen(this.done_button, Mojo.Event.tap, this.handleDoneTap.bindAsEventListener(this));
    this.controller.listen(this.controller.get('game_over_button'), Mojo.Event.tap, this.handleOkTap.bindAsEventListener(this));
    this.controller.listen(this.controller.get('level_over_button'), Mojo.Event.tap, this.handleNextLevelTap.bindAsEventListener(this));  
	this.controller.listen(this.controller.get('endless_level_button'), Mojo.Event.tap, this.handleEndlessLevelTap.bindAsEventListener(this));
    
	this.controller.listen(this.controller.sceneElement, Mojo.Event.keydown, this.handleKeys.bindAsEventListener(this));
    
	/* Map area is a delegate event handler*/
	this.map_area.addEventListener(Mojo.Event.tap, this.handleBlockTap.bind(this));
	    
    
	
	
    /* Set up game screen */
    if (!!this.restore) {       
        this.restoreGame();
    } else {
		this.saved_state.put({valid: false}); 
		if (this.endless) {
			this.controller.get('choose_level').style.display = "block";
		} else {
			this.startLevel(0);
		}
    }
	
	this.last_points_offset_left = parseInt(this.map_area.offsetLeft) || 0;
    this.last_points_offset_top = parseInt(this.map_area.offsetTop) || 0;
	this.handleOrientation(this._orientation);
}

GamePlayAssistant.prototype.handleKeys = function(event) {
	this.pressing = this.pressing || "";
	var which = event.originalEvent.which;
	if(which > 90 || which < 48) {
		return;
	}
	this.pressing += String.fromCharCode(which);
	Mojo.Log.error("now: "+this.pressing);
	if(this.pressing.length < this.MAGIC.length) {
		if(this.MAGIC.indexOf(this.pressing) === -1) {
			Mojo.Log.error('reset');
			this.pressing = "";
		}
		return;
	}
	
	if(this.pressing.indexOf(this.MAGIC) === -1) {
		this.pressing = "";
		return;	
	}
	
	if(this.pressing.length > this.MAGIC.length+1) {
		Mojo.Log.error("parseInt('5'): "+parseInt('5'));
		Mojo.Log.error('typeof "5"'+typeof "5");
		if (this.pressing[this.pressing.length - 1] == "G") {
			var levelString = this.pressing.substring(this.MAGIC.length, this.pressing.length-1);
			Mojo.Log.error("levelString: "+levelString);
			Mojo.Log.error('typeof levelString: '+typeof levelString);
            Mojo.Log.error("levelString === '5' ---"+(levelString==='5'));
			Mojo.Log.error(levelString+" is "+typeof levelString);
			var level = parseInt(levelString,10);
			Mojo.Log.error("5".charCodeAt(0));
			Mojo.Log.error(levelString.charCodeAt(0));
			Mojo.Log.error("in keypress, level: "+level);
			this.pressing = "";
			this.startLevel(level-1);
			
		}
		if (this.pressing[this.pressing.length - 1] == "Q") {
            var clearString = this.pressing.substring(this.MAGIC.length, this.pressing.length-1);
            var clear = parseInt(clearString,10);
            this.pressing = "";
            this.block_queue.splice(0,clear);
			this.updateNextBlocks();
            
        }
		if (this.pressing[this.pressing.length - 1] == "D") {
            var clearString = this.pressing.substring(this.MAGIC.length, this.pressing.length-1);
            var clear = parseInt(clearString,10);
            this.pressing = "";
            for(var i =0; i < clear; i++) {
				this.addRandomBlock();
			}
			this.updateNextBlocks();
            
        }
		/*if(isNaN(parseInt(this.pressing.substr(this.MAGIC.length),10))) {
			
			Mojo.Log.error("not a number: |"+this.pressing.substr(this.MAGIC.length)+"|");
			this.pressing = "";
			return;
		}*/
        
	}
	if(this.pressing.length > this.MAGIC.length+3) {
		this.pressing = "";
		return;
	}
	
	
}

/*Breadth-first search of possible path*/
/*This marks all possible squares, and stores their paths*/
GamePlayAssistant.prototype.calculatePaths = function(src){
    /* queue structure: [ [point, [[x,y],[x,y],[x,y]]], ... */
    var bfs_queue = [[src, [[src % this.MAXSIZE, Math.floor(src / this.MAXSIZE)]]]];
    //First set up closest paths
    while (bfs_queue.length > 0) {
        var to_search = bfs_queue.shift();
        el = to_search[0];
        var path = to_search[1];
        
        var src_x = el % this.MAXSIZE;
        var src_y = Math.floor(el / this.MAXSIZE);
        var possibles = [[src_x - 1, src_y], [src_x + 1, src_y], [src_x, src_y - 1], [src_x, src_y + 1]];
        
        for (var i = 0, l=possibles.length; i < l; i++) {
            var possible = possibles[i];
            var x = possible[0];
            var y = possible[1];
            var position = y * this.MAXSIZE + x;
            
            if (x < 0 || y < 0 || x >= this.SIZE || y >= this.SIZE) {
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
	if (this.prefs.sound) {
            this.controller.serviceRequest('palm://com.palm.audio/systemsounds', {
                method: "playFeedback",
                parameters: {
                    name: 'error_01'
                }
            });
        }
}

GamePlayAssistant.prototype.handleNextLevelTap = function(event) {
	this.controller.get('level_over').style.display="none";
	this.level++;
    if (!!this.levels[this.level]) {
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
            if (a === 'wild') {
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
	if(this.moving != null) {
		return;
	}
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
		if (this.prefs.sound) {
			this.controller.serviceRequest('palm://com.palm.audio/systemsounds', {
				method: "playFeedback",
				parameters: {
					name: 'shuffle_03'
				}
			});
		}

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
		if(src_block == null) {
			this.selectedSrc = null;
			return;
		}
        src_block.removeClassName('selected');
        if (this.prefs.sound) {
			this.controller.serviceRequest('palm://com.palm.audio/systemsounds', {
				method: "playFeedback",
				parameters: {
					name: 'card_05'
				}
			});
		}
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
	
	var hs = this.high_scores.get() || {highest_level: 0, levels: 0, endless: {}};
	Mojo.Log.info("hs.endless: "+hs.endless);
	if (!!this.endless && (!hs.endless[this.level] || this.score > hs.endless[this.level])) {
		Mojo.Log.info("adding "+this.score+"to position"+this.level);
        hs.endless["level"+this.level] = this.score;
		Mojo.Log.info("hs.endless: "+Object.toJSON(hs.endless));
    }
	if (!this.endless && this.score > hs.levels) {
        hs.levels = this.score;
    }

    if(this.level > hs.highest_level) {
            hs.highest_level = this.level;
    }
    var text;
	if(won) {
		text = "You win!";
		if (this.prefs.sound) {
           this.a.play();
        }
		hs.winner = true;
		hs.highest_level = this.levels.length;
		
		
	} else {
		text = "Game Over";
		if (this.prefs.sound) {
            this.controller.serviceRequest('palm://com.palm.audio/systemsounds', {
                method: "playFeedback",
                parameters: {
                    name: 'notification_buzz'
                }
            });
        }
	}
	this.high_scores.put(hs); 
	this.game_over_text.innerHTML = text;
	this.game_over.style.display = "block";
	this.game_over.style.width = "260px";
	
	
    
}
GamePlayAssistant.prototype.handleOkTap = function() {
	this.controller.stageController.popScene();
	
}

GamePlayAssistant.prototype.handleEndlessLevelTap = function() {
	this.controller.get("choose_level").style.display="none";
    this.startLevel(this.levelPickerModel.value-1);
}
