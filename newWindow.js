//an array of current open windows.
var windowArray = {};
var allOn = 1;

//when a new window is created, start the creation of a new package.
chrome.windows.onCreated.addListener(createWindowPackage);



//get current window's id
function getCurrentWinID(callback){
  var windId;
  chrome.windows.getCurrent(function(currentWin){
     windId = currentWin.id;
      //console.log("from getCurrentWinID(), windId = " + windId)
     //*****unique window Id properly getting retrieved here
     callback(windId);
  });  
}

//_______________________________________________________________________________________

//start the creation of a new 'windowPackage' object by prompting the user for a goal. 
function createWindowPackage(){
  if(allOn == 1){
    var goal = prompt("What is your goal this browsing session?","E.g: To watch Daniel Schiffman's first video.");
    var windId;

    //getting the current window's id
    getCurrentWinID(function(windId){
    var winId = windId.toString();
      //*****unique window id properly received here

      //in the windowArray, have the windId key refer to a new windowPackage object.
      windowArray[winId] = new windowPackage(goal, windId);
      //*****so we've successfully created a new window package with this goal and a unique window Id
    });
  }
 
}

//_________________________________________________________________________________________
//a window package includes the window id and a tasks[] array
class windowPackage{
  constructor(startTask, winId){
    this.id = winId;//winId is a string right now.
    this.tasks = [startTask];
    this.goal = startTask;
    this.isItOn = 1;
  }

  /*
  getGoal2(){
    console.log("getGoa2() was called");
    return this.goal;
  }
  */
}

//_________________________________________________________________________________________

//Kind of like the mailbox between the background and the content script.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //if the content script is asking for the window's goal variable, then perform this.
    if (request.greeting == "getGoal"){

      getCurrentWinID(function(windId){
        var winId = windId.toString();
        var goal = windowArray[winId].goal;//let's see if this is possible. We might have to write a method to return the goal instead fo accessing it directly like this. 
        //the response is the windowArray object's goal variable. 

        sendResponse({farewell: goal});
      });
      return true;

    }else if(request.greeting == "checkIfOn"){
      //getting the current window's id
      getCurrentWinID(function(windId){
        var winId = windId.toString();
        var onOrOff = windowArray[winId].isItOn  && allOn;
        sendResponse({farewell: onOrOff});
      });
      return true;
    }else if(request.greeting == "turnOff"){
      //getting the current window's id
      getCurrentWinID(function(windId){
        var winId = windId.toString();
        windowArray[winId].isItOn = 0;
      });
      return true;
    }else if(request.greeting == "changeGoal"){

      /*if the background script receives a message to change the goal, 
      then the background script sends back another message to retreive the goal*/
      chrome.runtime.sendMessage({greeting: "getNewGoal"}, function(response) {
        var newGoal = response.farewell;
        //getting the current window's id
        getCurrentWinID(function(windId){
          var winId = windId.toString();
          windowArray[winId].isItOn = 1;
          //afterwards, change the current window's goal to newGoal
          windowArray[winId].goal = newGoal;
        });
        return true;
      }); 

    }
    /*
    else if(request.greeting == "turnAllOff"){
        allOn = 0;
    }else if(request.greeting == "turnAllOn"){
        allOn = 1;
    }
    */
});

//___________________________________________________________________________________________




function closeScript(){
  //create a pop up module with a bunch of text fields 

  var closeModule = document.createElement("div");
        closeModule.style.display = "none"; /* Hidden by default */
        closeModule.style.position = "fixed"; /* Stay in place */
        closeModule.style.zIndex = "1"; /* Sit on top */
        closeModule.style.left= "0";
        closeModule.style.top= "0";
        closeModule.style.width= "80%"; /* Full width */
        closeModule.style.height= "80%"; /* Full height */
        closeModule.style.overflow= "auto"; /* Enable scroll if needed */
        closeModule.style.backgroundColor= "rgb(0,0,0)"; /* Fallback color */
        closeModule.style.backgroundColor= "rgba(0,0,0,0.4)"; /* Black w/ opacity */

        //add new element to the clear background
        document.body.append(closeModule);



  //Things: start time, end time, goal, subtasks
}

//chrome.windows.onClosed.addListener(closeScript);
chrome.windows.onClosed.addListener(alert("hi"));
