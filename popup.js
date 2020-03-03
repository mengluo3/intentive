var newGoal;

document.addEventListener('DOMContentLoaded', function() {
    var subButton = document.getElementById("submitButton");
    // onClick's logic below:
    subButton.addEventListener('click', function() {
        newGoal = document.getElementById("userInput").value;
    	changeGoal();
    });
});

/*
if(document.getElementById("switchToggle") = off){
	chrome.runtime.sendMessage({greeting: "turnAllOff"});
}else if(if(document.getElementById("switchToggle") = on){
	chrome.runtime.sendMessage({greeting: "turnAllOn"});
}
*/

//send newGoal to the content script

//send a Message of "changeGoal" to background 
//send a message to background script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //if the content script is asking for the window's goal variable, then perform this.
    if (request.greeting == "getNewGoal"){
    	sendResponse({farewell: newGoal});
    }
  }
 );


//send message to background script to change the goal
function changeGoal(){
	chrome.runtime.sendMessage({greeting: "changeGoal"}, function() {});	
}


