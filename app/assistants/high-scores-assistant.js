function HighScoresAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

HighScoresAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */
	
	/* add event handlers to listen to events from widgets */
	var max_levels = 20;
	var high_scores = new Mojo.Model.Cookie("HighScores").get() ||
	{
		endless: 0,
		levels: 0,
		winner: false,
		endless: {}
	};
	var endless = high_scores.endless;
	this.controller.get("levels_hs").innerHTML = high_scores.levels;
	var score_items = [];
	var score_items2 = [];
	if(!!high_scores && !!high_scores.winner) {
		this.controller.get("levels_winner").innerHTML = "Completed!";
	}
	for(var i = 0; i < max_levels; i++) {
		score_items[i] = {level:i+1, score:endless["level"+i]||0};
	}
	
	Mojo.Log.info("score_items: "+Object.toJSON(score_items));
	
	
	this.controller.setupWidget("endless_scores_list",
	   {
	   	   itemTemplate: "high-scores/hs-list-template"
	   },
	   {
	   	 items: score_items.slice(0,Math.floor(max_levels/2))
	   }	
	);
	this.controller.setupWidget("endless_scores_list2",
       {
           itemTemplate: "high-scores/hs-list-template"
       },
       {
         items: score_items.slice(Math.floor(max_levels/2))
       }    
    );
	
	Mojo.Log.info("list is set up now");
	if (high_scores.winner) {
		this.a = new Audio();
		this.a.autoplay = true;
		this.a.src = Mojo.appPath + "iv.mp3";
	}
	
	
}

HighScoresAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


HighScoresAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

HighScoresAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}
