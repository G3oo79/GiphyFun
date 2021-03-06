$(document).ready(function(){
//Pseudo 

//create an array of topics. done
//call ajax function
//put together queryURL + searchTerm
//create input filed + submit in HTML
//link input field val() to searchTerm
//when submit is clicked, the HTML field is emptied, or html('');
//    searchTerm is appended to topics array

//ajax query for number of gifs
//click on gif $(this) --> still or animated

// GIPHY parameters (hint, hint): 
//         * `q`
//         * `limit`
//         * `rating`
//
//for loop that:
// creates an HTML element, 
// assigns data attributes, 
// appends to HTML container

//word option array
var topicsArray = ["gears of war", "final fantasy", "duck hunt", "street fighter"];
//function for button presses.
function renderButtons() {
	//It clears button when pressed.
	$('.button').empty();
	//for loop of topics.
	for (var i = 0; i < topicsArray.length; i++){
		//created a var b and assings it to the button tag.
		var b = $('<button>');
		//add the class to this button tag.
		b.addClass('btn-danger btn');
		//sets text to topics array[].
		b.text(topicsArray[i]);
		//sets the data attribute to the button tag.
		b.attr('data-gaming', topicsArray[i]);
		//linking the button tag to the id on html.
		$('.button').append(b);
		//making sure it is working :).
		/*console.log(b.text());*/

	}

	
}
//button click event for the still images
$(document).on('click','.setimage', function() {
	//Assigning this attr method to setImage.
	var setImage = $(this).attr('data-still');
	//assigning this src attr to omgClicked
	var imgClicked = $(this).attr('src');
		console.log(setImage);
	// statment to toggle between still and move image
	if (imgClicked == setImage) {
		setImage = $(this).attr('data-move');
        $(this).attr('src', setImage);
	}else{		
		setImage = $(this).attr('data-still');
        $(this).attr('src', setImage);
        console.log(setImage);
	}

})
//Sets the function click to id submit button.
$('#submitbutton').on('click', function() {
	//returns the value of id to wordInput?.
	var wordInput = $('#userinput').val();
	//this adds new items to the word array
	topicsArray.push(wordInput);
	//sets in motion the render button function 
	renderButtons();
	//this stops the function.
	return false;


})

//add function: first set an id for the href image. use "this"

//in the document when red button clicked run gifDisplay function 
$(document).on('click', '.btn-danger', gifDisplay);
//Sets the gif display function
function gifDisplay() {
	//create new variable to and assigns the attribute
	var searchName = $(this).attr('data-gaming');
	//assingns the api from to queryUrl and adds it to the searchname variable.
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ searchName +"&api_key=dc6zaTOxFJmzC&limit=5";
	console.log(queryURL);
	//Requests json file to be used
	$.ajax({
		url: queryURL,
		method: 'GET'
		//this method stops the ajax and continues the response function.
	}).done(function(response){
		// empties the image container.
		$('.images').empty();
		//loop for the response.data 
		for (var i = 0; i < response.data.length; i++) {
			//crate new variable and asign the tag img
			var newPic = $('<img class="setimage">');
			//we created a paragraph tag and added the text rating to it
			var p = $(' <p> ').text(" Rating: " + response.data[i].rating);
			//this is to change the rating text color to white
			 $(p).css("color", "white");
			//Created some attriv methos.
			newPic.attr('src', response.data[i].images.fixed_height_still.url);
			newPic.attr('data-still', response.data[i].images.fixed_height_still.url);
			newPic.attr('data-move', response.data[i].images.fixed_height.url);
			//appended all tthe images and ratings.
			$(".images").append(p, newPic);
			/*console.log(response);*/

			
		}
	})

}

renderButtons();
});

