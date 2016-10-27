$(document).ready(function() {


	// Trigger when key is pressed in the form
	$( "#formjs" ).keyup(function() {
		// Debug console
		console.log( "test key press" );
  		// Do a post request with the value of the input
  		$.post('/search', {firstname: $('#firstinput').val(), lastname: $('#lastinput').val()}, function(data, status){
  			console.log(data)
//  			$('#firstinput').html('')
  			//for (var i = 0; i < data.length; i++) {
  				//$('#firstinput').append( data[i].firstname + ' ' + data[i].lastname + '<br>')

  			//}
  			$("#firstinput").autocomplete ({
  					source: data});
  			$("#lastinput").autocomplete ({
  					source: data});

  			})

  	})
	

	$("#button").click(function(event){
		event.preventDefault()


		$.post('/search', {firstname: $('#firstinput').val(), lastname: $('#lastinput').val() } , function (data, status) {
				$('#resultat').empty()
			for (var i = 0; i < data.length; i++) {
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

