var gamesList = [];
 

$(document).ready(function(){ 
	// Populate the list of games
	gamesList = LoadGamesJSON();		
	$('#gamePreview').html(PopulateGamesContainer(gamesList));	
}); 

function PopulateGamesContainer(events){
	// Create a string to hold the full HTML
	var htmlString = "", eventslen = events.length;
	// Populate the string for each event in the events array passed in.
	for(var i = 0; i < eventslen; i++) {	
		htmlString += "<div class='gamePreview'>" + 
		"<p class='gameTitlePreview'>" + events[i].title +  "</p>" + 		
		"<img class='gameImagePreview' src='" + events[i].imageURL + "'></p>" + 
		"<p class='gameDescPreview'>" + events[i].description + "</p></div>" ;
	}		
	return htmlString;
}

function LoadGamesJSON(){
	// Pull in data from a JSON file to populate the gamesList	
	var games = [];

	$.ajax({
	    type: 'GET',
	    url: '../assets/data/games.json',
	    dataType: 'json',
	    success: function(data) {	    	
	    	var len = data.games.length;		
			 for(var i=0; i <= len-1; i++) { 			
				games.push(data.games[i]);			
			 }	
	    },
	    complete: function(data){
	    	console.log(data);
	    },    
	    async: false
	});		
	return games;
}
