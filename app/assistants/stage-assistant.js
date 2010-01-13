/*
 * Copyright 2009 OpenSourceJason
 * 
 * Modification and redistribution prohibited.
 * 
 */

Number.prototype.oldToString = Number.prototype.toString;
Number.prototype.toString = function(commas) {
	if(!commas) {
		return this.oldToString();
	} else {
		var result = "";
		var left = this.oldToString();
		
		while(left.length > 3) {
			result = ","+left.slice(-3)+result;
			left = left.substr(0,left.length-3);
		}
		return left+result;
	}
}

function StageAssistant() {
}

var tallScreen = true;
StageAssistant.prototype.setup = function(){

    delete Mojo.Menu.helpItem['checkEnabled'];
    delete Mojo.Menu.prefsItem['checkEnabled'];
    Mojo.Widget._Menu.prototype.kDefaultAppMenuSuffixItems.unshift({label: "High Scores", command:"gliss-hs"});
        
    tallScreen = false;
    if (Mojo && Mojo.Environment && Mojo.Environment.DeviceInfo) {
        tallScreen = (Mojo.Environment.DeviceInfo.screenHeight === 480);
    }
    this.controller.pushScene({
        name: "SplashScreen",
        disableSceneScroller: tallScreen
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
	if(event.command === "gliss-hs") {
        this.controller.pushScene("high-scores");       
    }
}
