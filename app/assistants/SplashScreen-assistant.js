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
		
	this.tallScreen = false;
    if(Mojo && Mojo.Environment && Mojo.Environment.DeviceInfo) {
        this.tallScreen = (Mojo.Environment.DeviceInfo.screenHeight === 480);
    } 
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	this.controller.setupWidget(Mojo.Menu.appMenu, StageAssistant.menuAttr, StageAssistant.menuModel);
	/* setup widgets here */
	this.controller.setupWidget('start_button',{label:"Start Game"},{});
	this.controller.setupWidget('continue_button',{label:"Continue Game"},{disabled: true});
	/* add event handlers to listen to events from widgets */
	this.controller.listen($('start_button'), Mojo.Event.tap, this.handleStartTap.bindAsEventListener(this));
	this.controller.listen($('continue_button'), Mojo.Event.tap, this.handleContinueTap.bindAsEventListener(this));
	
	
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
	var hs = this.high_score.get() || 0;
	$('high_score').innerHTML = hs.toString(true);
	 
	var saved_state = new Mojo.Model.Cookie("GameState");
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

SplashScreenAssistant.prototype.handleStartTap = function(event){
	this.controller.stageController.pushScene({name:'GamePlay', disableSceneScroller:this.tallScreen},'new');
}
SplashScreenAssistant.prototype.handleContinueTap = function(event){
	this.controller.stageController.pushScene({name:'GamePlay', disableSceneScroller:this.tallScreen},"continue");
}
