/*
 * Copyright 2009 OpenSourceJason
 * 
 * Modification and redistribution prohibited.
 * 
 */

function PreferencesAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
	   this.high_score_cookie = new Mojo.Model.Cookie("HighScores");
	   this.prefs_cookie = new Mojo.Model.Cookie("Preferences");
	   this.prefs = this.prefs_cookie.get();
	   	if(!this.prefs) {
	   		this.prefs = {
				sound: false
			}
			this.prefs_cookie.put(this.prefs);
	   }
	   
	  
}

PreferencesAssistant.prototype.setup = function(){
    /* this function is for setup tasks that have to happen when the scene is first created */
    
    /* use Mojo.View.render to render view templates and add them to the scene, if needed. */
    
    /* setup widgets here */
    var toggleAttr = {
        trueValue: true,
        trueLabel: "On",
        falseValue: false,
        falseLabel: "Off"
    };
    
    this.controller.setupWidget("sound_toggle", toggleAttr, this.toggleModel = {
        value: this.prefs.sound,
        disabled: false
    });
    this.controller.setupWidget("theme_toggle", toggleAttr, this.themeToggleModel = {
        value: this.prefs.theme,
        disabled: false
    });
    this.controller.setupWidget("reset_score_button", {}, {
        label: "Reset High Score"
    });
    /* add event handlers to listen to events from widgets */
    this.controller.listen("sound_toggle", Mojo.Event.propertyChange, this.handleSoundToggle.bindAsEventListener(this));
    this.controller.listen("reset_score_button", Mojo.Event.tap, this.handleResetHighScoreTap.bindAsEventListener(this));
}

PreferencesAssistant.prototype.handleSoundToggle = function(event) {
	Mojo.Log.info('storing pref for sound',this.toggleModel.value);
	this.prefs.sound = this.toggleModel.value;
	this.prefs_cookie.put(this.prefs);
	
}
PreferencesAssistant.prototype.handleResetHighScoreTap = function(event) {
	this.controller.showAlertDialog({ 
    onChoose: function(value) { 
        if(value === "yes") {
			this.high_score_cookie.put({highest_level: 0, levels: 0, endless: {}});
		}
    }, 
    title: "Really Reset Score?", 
    message: "Are you sure you want to reset the high score??", 
    choices:[ 
      {label: "Yes", value: "yes", type: "affirmative"}, 
      {label: "No", value: "no", type: "negative"}
       
    ]}); 

}
PreferencesAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


PreferencesAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

PreferencesAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}
