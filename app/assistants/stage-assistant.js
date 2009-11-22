/*
 * Copyright 2009 OpenSourceJason
 * 
 * Modification and redistribution prohibited.
 * 
 */

function StageAssistant() {
}

StageAssistant.prototype.setup = function() {

	delete Mojo.Menu.helpItem['checkEnabled'];
	delete Mojo.Menu.prefsItem['checkEnabled'];
    this.controller.pushScene({
		name: "SplashScreen",
		disableSceneScroller: true
	});
	
}

StageAssistant.prototype.handleCommand = function(event) {
	Mojo.Log.info('got command:',event.command);
	if(event.command === "palm-help-cmd") {
		this.controller.pushScene("help");		
	}
	if(event.command === "palm-prefs-cmd") {
		this.controller.pushScene("preferences");		
	}
}
