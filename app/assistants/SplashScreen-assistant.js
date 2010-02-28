/*
 * Copyright 2009 OpenSourceJason
 * 
 * Modification and redistribution prohibited.
 * 
 */

function SplashScreenAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

SplashScreenAssistant.prototype.setup = function() {
	
	

	if (this.controller.stageController.setWindowOrientation) {
        this.controller.stageController.setWindowOrientation("free");
    }
	/* this function is for setup tasks that have to happen when the scene is first created */
		
	
 	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	/* setup widgets here */
	this.controller.setupWidget('start_button',{label:"Levels Game"},{});
	this.controller.setupWidget('start_endless_button',{label:"Endless Game"},{});
    
	this.controller.setupWidget('continue_button',{label:"Continue Game"},{disabled: true});
	/* add event handlers to listen to events from widgets */
	
	this.controller.listen($('start_button'), Mojo.Event.tap, this.handleStartTap.bindAsEventListener(this, {
		"continue": false,
		endless: false
	}));
	this.controller.listen($('start_endless_button'), Mojo.Event.tap, this.handleStartTap.bindAsEventListener(this, {
		"continue": false,
		"endless": true
	}));   
	this.controller.listen($('continue_button'), Mojo.Event.tap, this.handleStartTap.bindAsEventListener(this, {
		"continue": true,
		"endless": false
	}));
	
	
	//if(!tallScreen) {
        $$(".info").each(function(e) {
            e.style.fontSize = "10pt";		
		});
    //}
	this.high_score = new Mojo.Model.Cookie("HighScores");
	
	this.controller.listen(document, 'orientationchange', this.handleOrientation.bindAsEventListener(this));

    
	
}

SplashScreenAssistant.prototype.handleOrientation = function(o){
	
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
SplashScreenAssistant.prototype.aboutToActivate = function() {
	var scores = this.high_score.get();
	if(scores == undefined || scores.highest_level == undefined || scores.levels == undefined ||  scores.endless == undefined) {
		var old_score = scores;
		scores = { highest_level: 0, levels: old_score || 0, endless: {}};
		this.high_score.put(scores);
	}
	var hs = scores.levels || 0;
	$('high_score').innerHTML = hs.toString(true);
	hs = scores.endless || {};
	var total_endless_score = 0;
	var max_levels = 20;
	for(var i = 0; i < max_levels; i++) {
		var s = hs["level"+i];
		if(s && typeof s == "number") {
			total_endless_score += s;
		}
	}
    $('high_score_endless').innerHTML = total_endless_score.toString(true); 
	var saved_state = new Mojo.Model.Cookie("GameState");
	
	if(scores.highest_level > 0) {
		this.controller.setWidgetModel('start_endless_button', {disabled: false});	
	} else {
		this.controller.setWidgetModel('start_endless_button', {disabled: true});
	}
	
	var ss = saved_state.get();
	if(ss.valid === true) {
		this.controller.setWidgetModel('continue_button', {disabled: false});
	} else {
		this.controller.setWidgetModel('continue_button', {disabled: true});
	}
	var preferences = new Mojo.Model.Cookie("Preferences");
	prefs = preferences.get();
	
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


SplashScreenAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

SplashScreenAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}

SplashScreenAssistant.prototype.handleStartTap = function(event, args){
	this.controller.stageController.pushScene({name:'GamePlay', disableSceneScroller:true},args);
}

