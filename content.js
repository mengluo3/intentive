//var goal;
var isOn;
var winID;

//for dragging
var initX, initY, mousePressX, mousePressY, boxWidth = 250, boxHeight = 100;




/***********************************************************************
*
* Functions for passing and receiving variables to and from the background script
*
*/
//Function for getting goal from background script. After getting the goal, insert to a div with the callback function.
function getGoal(_callback){
	//get the goal from the background script. 
	var thisGoal;
    chrome.runtime.sendMessage({greeting: "getGoal"}, function(response) {
	  		thisGoal = response.farewell;//get the goal from the background script. 
	  		_callback(thisGoal);
		});	 
}

//Function for checking if the sticky note has not been exited out of (from the background script), 
//then using that to run the content script if the function has been run.  
function checkIfOn(_callback){
    chrome.runtime.sendMessage({greeting: "checkIfOn"}, function(response) {
	  		isOn = response.farewell;
	  		_callback(isOn);
		});	
}




/***********************************************************************
*
* Function for dynamically adding the sticky note.
*
*/
function addStickyNote(){ 
	
	//1. Check if the extension is on or not
	checkIfOn(function(){
		//2. If on, get the goal, and add the divs.
		if(isOn){
			getGoal(function(goal){

			/************************************************
			Create a new div element that is a white rectangle. This is the background of the sticky note.
			*****/
		  	var box = document.createElement("div");
			  	box.id="sticky";
				box.style.width = boxWidth + "px";
				box.style.height = boxHeight + "px !important";
				box.style.background = "white";
				box.style.borderRadius = "15px";
				box.style.boxShadow = "1px 1px 2px 2px #D0D0D0";
				box.style.color = "black";
				box.style.position = "fixed";
				box.style.right = "0";
				box.style.bottom = "0";
				box.style.margin = "1%";
				box.style.zIndex="1000000000";
				box.style.display = "block";
				box.style.fontStyle = "Calibri !important";
				box.style.fontSize = "10pt";
				box.style.textAlign = "left";
				box.style.borderColor  = "#D0D0D0 !important";
				box.style.borderStyle  = "solid !important";
				box.style.borderWidth  = "1px !important";

				//add new element to the clear background
				document.body.append(box);

				//BELOW two lines: unused code for making the sticky note disappear upon hover.
				//document.getElementById('sticky').addEventListener('mouseover', onHover);
				//document.getElementById('sticky').addEventListener('mouseleave', offHover);

				//add event listener to the sticky note.	
				box.addEventListener('mousedown', function(event) {

					initX = this.offsetLeft;
					initY = this.offsetTop;
					mousePressX = event.clientX;
					mousePressY = event.clientY;

					this.addEventListener('mousemove', repositionStickyNote, false);

					window.addEventListener('mouseup', function() {
					  box.removeEventListener('mousemove', repositionStickyNote, false);
					}, false);

				}, false);
	
			

			/************************************************
			Create a new button element. This is the 'x' exit button on the sticky note.
			*****/
			var circ = document.createElement('button');
				circ.innerHTML ="x";

				circ.style.fontStyle="Calibri";
				circ.style.textAlign = "center"; 
				circ.style.textDecoration = "none";
				circ.id="min";
				//circ.style.width = "20px";
				//circ.style.height = "20px";
			 	circ.style.borderRadius = "50%";
				circ.style.background = "white";
				circ.style.color = "black";
				circ.style.position = "absolute";
				circ.style.right = "5%";
			    circ.style.top = "8%";
		  
			 	document.getElementById("sticky").append(circ); 
			 	circ.addEventListener ("click", function() {
			          removeSticky();
			     }); 


			/************************************************
			Create a new p element. This is the 'GOAL" heading at the top of the sticky note.
			*****/
			var heading = document.createElement("p");                       
				heading.id = "testHead";
				heading.style.margin="10%";
				heading.style.marginBottom="5%";
				heading.innerText = "GOAL";            
				document.getElementById("sticky").append(heading);                     


			/***********************************************
			Create a new div element. This is the horizontal line below "GOAL" on the sticky note.
			*****/
			var line = document.createElement("div");    
				line.style.width = "90%";
				line.style.height = "1px";
				line.style.margin = "auto";
				line.style.background = "#D0D0D0";
				document.getElementById("sticky").append(line);                      



		    /**********************************************
			Create a new p element. This is the goal statement.
			*****/
			var para = document.createElement("p"); 
				para.style.margin = "10%";
				para.style.marginTop="5%";
				para.innerText = goal;
			
				document.getElementById("sticky").append(para);                    


		    /**********************************************
			Create a new span element. This is the area to which the checkbox and the "Goal Accomplished" label are appended.
			*****/
			var checkSpan = document.createElement("span");
				checkSpan.id="checkSpan";
				checkSpan.style.position = "absolute";
				checkSpan.style.display = "inline-block";
				checkSpan.style.float = "left";
				checkSpan.style.float = "left";
			  	checkSpan.style.marginLeft = "10%";
			  	checkSpan.style.marginBottom = "10%";
				document.getElementById("sticky").append(checkSpan);


			/**********************************************
			Create a new span element. This is the div to which the label of the checkbox will be appended.
			*****/
			var labelSpan = document.createElement("span");
				labelSpan.id="labelSpan";
				labelSpan.style.display = "inline-block";
			  	labelSpan.style.marginLeft = "20%";
			  	labelSpan.style.marginBottom = "10%";

				document.getElementById("sticky").append(labelSpan);
			

			/**********************************************
			Create a new span element. This is the checkbox that removes the sticky note if clicked.
			*****/
			var check = document.createElement("input");
			  check.type = "checkbox";

	    	  check.style.height = "15px";
	    	  check.style.width = "15px";
	    	  check.style.background = "white !important";
	    	  check.style.borderRadius = "5px";
	    	  check.style.border = "2px solid #000000 !important";
	    	  check.style.display = "inline";
			  check.style.marginLeft = "10%";
			  check.style.marginRight = "1%";
			  check.style.marginBottom = "10%";
			  check.style.marginTop = "-8%";
			  check.innerHTML = "Goal Accomplished";

			  check.href="javascript:removeStickyPermanent()"
			  check.addEventListener('change', () => {
			        if (check.checked) {
			            removeStickyPermanent();
			        }
			  });
			    
			  document.getElementById("checkSpan").append(check);
			  

			  /**********************************************
			  Create a new label element. This is the label of the checkbox.
			  *****/
			  var newlabel = document.createElement("label");
				  newlabel.style.display = "inline";
				  newlabel.innerHTML = "Goal Accomplished!";
				  newlabel.style.marginBottom = "10%";
				  newlabel.color = "black";
				  document.getElementById("labelSpan").append(newlabel);

			  //document.getElementById('sticky').childNodes.addEventListener('mouseover', onHover);
			  //document.getElementById('sticky').childNodes.addEventListener('mouseout', offHover);

			  /**********************************************
			  Create a new button element. This is for exporting the csv file of data.
			  *****/
			  var exportButton = document.createElement('button');
				exportButton.innerHTML ="Export CSV Data";

				exportButton.style.textAlign = "center"; 
				exportButton.style.textDecoration = "none";
				exportButton.style.background = "white";
				exportButton.style.color = "black";
				exportButton.style.marginLeft = "10%";
			  	exportButton.style.marginRight = "1%";
			  	exportButton.style.marginBottom = "10%";
			  	exportButton.style.marginTop = "-8%";

		  
			 	document.getElementById("sticky").append(exportButton); 
			 	exportButton.addEventListener ("click", function() {
			          writeCSV();
			     }); 
	  

			});//end of getGoal()

		}//end of if(isOn)

	});//end of checkIfOn()

}//end of addStickyNote();





//now that the functions have been defined, we're going to call upon them
addStickyNote();






















//_________________________________________________________________________________________________________________________________________

/***********************************************************************
*
* Function for writing to CSV file.
*
*/
function writeCSV(){
	var rows = [
			    ["name1", "city1", "some other info"],
			    ["name2", "city2", "more info"]
			];

	let csvContent = "data:text/csv;charset=utf-8,";

	rows.forEach(function(rowArray) {
	    let row = rowArray.join(","); //combine everything in the array in a single string
	    csvContent += row + "\r\n"; //add the row to the csv content
	});

	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "my_data.csv");
	document.body.append(link); // Required for FF

	link.click(); // This will download the data file named "my_data.csv".
}




/***********************************************************************
*
* Function for removing sticky note permanently after the checkbox is checked.
*
*/
function removeStickyPermanent() {
  console.log("removeSticky() is working.");
  // Removes an element from the document.
  var element = document.getElementById("sticky");
  element.style.display = "none";
  //turn off so next time the program does not add a sticky note once the goal is accomplished.
  chrome.runtime.sendMessage({greeting: "turnOff"});	
}


/***********************************************************************
*
* Function for removing sticky note temporarily when the 'x' button is clicked.
*
*/
function removeSticky() {
  console.log("removeSticky() is working.");
  // Removes an element from the document.
  var stickyNote = document.getElementById("sticky");
  stickyNote.remove();
}

/***********************************************************************
*
* Functions for making sticky note invisible when hovered over and visible when hovered over. 
* Unused.
*
*/
function onHover(){
	var element = document.getElementById("sticky");
	var children = document.getElementById("sticky").childNodes;
	//element.hide();
  	element.style.opacity = "0";
  	element.style.zIndex="-100000000000";
  	for (var i = 0; i < children.length; i++) {
    	children[i].style.opacity = "0";
    	children[i].style.zIndex="-100000000000";
  	}
  	//children.style.opacity = "0";
  	//children.style.zIndex="-100000000000";
}

function offHover(){
	setTimeout(function () {
        var element = document.getElementById("sticky");
	  	var children = document.getElementById("sticky").childNodes;
	  	element.style.opacity = "1.0";
	  	element.style.zIndex="100000000000";
	  	for (var i = 0; i < children.length; i++) {
	    	children[i].style.opacity = "1.0";
	    	children[i].style.zIndex="100000000000";
	  	}
    }, 500);
	
}

/***********************************************************************
*
* Functions for repositioning sticky note when dragged. 
*
*/
function repositionStickyNote(event) {
	this.style.left = initX + event.clientX - mousePressX + 'px';
	this.style.top = initY + event.clientY - mousePressY + 'px';

	
	var box = document.getElementById("sticky");
	var h = box.scrollHeight;
	

	
	this.style.bottom = window.innerHeight - (initY + event.clientY - mousePressY) - 200 + 'px';//This is DISTANCE from the bottom, NOT the bottom coordinate from top
	console.log("sticky top: " + this.style.top + ", sticky bottom: " + this.style.bottom);
}