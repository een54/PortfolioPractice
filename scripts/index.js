// Start at the first image index
var currentImageListIndex = 0,
// Define variables to avoid retyping selectors
latestProjectImage = $('#latestImage'),
eventsCalendar = $('#eventsCalendar');
// Define imageList and events globally so they can be accessed in all functions
var imageList, events = [];
 

$(document).ready(function(){ 
	// Populate the list of images for latest projects and the events
	imageList = LoadImageJSON();
	events = LoadEventsJSON();

	// Populate the events div with the data in the JSON file.
	$('#eventsCalendar').html(PopulateEventsContainer(events));		

	// Automatically scroll through the images on a set delay
	AutoRotateImage();

	// Set the latest projects image to be the first image in the above list.
	UpdateImageUrl(latestProjectImage);		

	// Handle the two image navigation buttons being pressed
	$('#nextArrow').click(function() {
		NextImage();
	});
	$('#prevArrow').click(function() {		
		PrevImage();
	});			
}); 


function AutoRotateImage() { 
	setInterval(NextImage, 5000);
}

function PopulateEventsContainer(events){
	// Create a string to hold the full HTML
	var htmlString = "", eventslen = events.length;
	// Populate the string for each event in the events array passed in.
	for(var i = 0; i < eventslen; i++) {	
		htmlString += "<div class='event'>" + 
		"<p class='eventDate'>" + events[i].date + " - " + events[i].header + "</p>" + 		
		"<p class='eventSubheader'>" + events[i].subheader + "</p>" + 
		"<p class='eventDesc'>" + events[i].description + "</p></div>" ;
	}		

	return htmlString;
}

function LoadImageJSON(){
	// Pull in data from a JSON file to populate the imageList	
	var images = [];

	$.ajax({
	    type: 'GET',
	    url: '/assets/data/images.json',
	    dataType: 'json',
	    success: function(data) { 
	    	var len = data.images.length;		
			 for(var i=0; i <= len-1; i++) { 			
				images.push(data.images[i]);			
			 }	
	    },	    
	    async: false
	});	
	return images;
}

function LoadEventsJSON() { 
	// Pull in data from a JSON file to populate the events calendar	
	var events = [];

	$.ajax({
	    type: 'GET',
	    url: '/assets/data/calendar.json',
	    dataType: 'json',
	    success: function(data) { 
	    	var len = data.events.length;		
			 for(var i=0; i <= len-1; i++) { 			
				events.push(data.events[i]);			
			 }	
	    },	    
	    async: false
	});	
	return events;
}

// Decrements the current index accordingly and updates the 
// images URL property
function PrevImage() { 			
	// handle the currentImageIndex reaching the min number and reset
	if (currentImageListIndex == 0) { 
		currentImageListIndex = (imageList.length - 1);
	}
	// otherwise just decrement the index
	else {  
		currentImageListIndex--;
	} 
	UpdateImageUrl(latestProjectImage);
}

// Increments the current index accordingly and updates the 
// images URL property
function NextImage() { 	
	// handle the currentImageIndex reaching the max number and reset
	if (currentImageListIndex == (imageList.length - 1)){ 
		currentImageListIndex = 0;
	}
	// otherwise just increment the index
	else {  
		currentImageListIndex++;
	}	        	
	UpdateImageUrl(latestProjectImage);
}

// Updates a given images src attribute from the image list
// with the index set to currentImageListIndex
function UpdateImageUrl(imageId) {		
	$('#latestImage').attr("src", imageList[currentImageListIndex].url)
}
