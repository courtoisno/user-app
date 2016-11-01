//Do the code when document ready
$(document).ready(function() {

	//set variable = date now() to be able to compare it later in a if else statement (to check the time)
	var prevTime = 0
	// Trigger when key is pressed in the form
	$( "#formjs" ).keyup(function() {

		// set other variable (it will overwrite the other one above)
		var nowTime = Date.now()
		// Debug console - to see if it works
		console.log( "test key press" );
  		//wrapper function that takes in the whole post ajax request.
  		function timeAjax() {
  		// Do a post request with the value of the inputs
  			$.post('/search', {firstname: $('#firstinput').val(), lastname: $('#lastinput').val()}, function(data, status){
  			console.log(data)
//  			$('#firstinput').html('')
  			//for (var i = 0; i < data.length; i++) {
  				//$('#firstinput').append( data[i].firstname + ' ' + data[i].lastname + '<br>')

  			//}

  			// Set the autocomplete functions that allows to have a dropdown bar/menu in the field to be filled in
  			$("#firstinput").autocomplete ({
  					source: data});
  			$("#lastinput").autocomplete ({
  					source: data});

  			})
  		}
  		// If else statement that will check if the difference between the second time and the first is equal or smaller than 300 miliseconds
 		if ((nowTime - prevTime ) >= 300 ) {
 			//If it is, then call the function to run it and assign prevTIme the value of the second time.
 			timeAjax() 
 			prevTime = Date.now()
 			//Else, we want to call the setTimeout function and assign it 2 parameters (the function timeAjax and 300milisec)
 		} else {
 			console.log('yay')

 		}

  		

  	})


	
	// when click on the button, it will add my data from my json file to a div under the search bar. -> dynamic
	$("#button").click(function(event){
		event.preventDefault()

		// Ajax post request in my search route - with 3 parameters : values entered to 'firstname' and 'lastname' and a callback function
		$.post('/search', {firstname: $('#firstinput').val(), lastname: $('#lastinput').val() } , function (data, status) {
				//clean the entry everytime
				$('#resultat').empty()
				//Create a loop that will count from 0 till the end of my array
			for (var i = 0; i < data.length; i++) {
				//add the data to my div
  				$('#resultat').append( data[i] + '<br>')

  			}
	
		})

	})

	
		
		//force it to not load a new page
		//$("#button").click(function(event){
	  		//event.preventDefault()
			//$('#resultat').append(names.firstname + ' ' +  names.lastname)
	  	//})

});

