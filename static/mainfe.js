$(document).ready(function() {

	//complete this when doc ready
	var prevTime = Date.now()
	// Trigger when key is pressed in the form
	$( "#formjs" ).keyup(function() {

		// constances (overwrite when key up, for comparaison)
		var nowTime = Date.now()


		// Debug console
		console.log( "test key press" );
  		// Do a post request with the value of the input


  		//wrapper function
  		function timeAjax() {

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
  		}

 		if ((nowTime - prevTime ) <= 300 ) {
 			timeAjax() 
 			prevTime = nowTime
 		} else {
 			//No brackets because we just defining a function and brackets if we want it to run. HEre we just implement it.
 			setTimeout(timeAjax, 3000)
 			prevTime = nowTime

 		}

  		

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

