//Include the modules
const express    = require ('express')
const fs         = require ('fs')
const app        = express()
const bodyParser = require ('body-parser')

//Makes sure we use the body parser
app.use( bodyParser.urlencoded({ extended: false }) )
app.use(express.static('static'))
// We want to make sure express knows we are using pug. It is setting up PUG.
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')



//FOR PUG USE RESPONSE.RENDER -> here create a pug page.

app.get('/index', (request, response ) => {
	console.log('almost a pug page!')

	fs.readFile(__dirname + '/users.json', (error, data) => {
		if (error) throw error
			let parsedData = JSON.parse( data )
		console.log( parsedData )
		parsedData.sort( function( a, b ) {
			return a.lastname.toUpperCase() < b.lastname.toUpperCase() ? -1 : a.lastname.toUpperCase() > b.lastname.toUpperCase() ? 1 : 0;
		});
		//NOW parsed data will exist because in the loop ! SCOPE !!!
		// THIS STEP DOESNT CHANGE ANYTHING !! Only on backend -> it just give access to our data on index
		response.render('index', {data: parsedData})
	} )
} )





app.get('/search', (request, response) => {
	console.log('almost a search page!')
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if (error) throw error
			let parsedData = JSON.parse( data )
		console.log( parsedData )
		parsedData.sort( function( a, b ) {
			return a.lastname < b.lastname ? -1 : a.lastname > b.lastname ? 1 : 0;
		});
		//NOW parsed data will exist because in the loop ! SCOPE !!!
		// THIS STEP DOESNT CHANGE ANYTHING !! Only on backend -> it just give access to our data on index
		response.render('search', {data: parsedData})

	})
})





app.post ('/search', (request, response) =>{
	// Print the POST data
	console.log('Data posted:')
	console.log( request.body )
	// Read the json file
	fs.readFile(__dirname + '/users.json', (error, data) => {
		// Check if there is an error
		if (error) throw error
		// Change data from file to an object
		let parsedData = JSON.parse( data )
		// Console the object for debugging
		console.log( 'The json file has length: ' + parsedData.length )
		// Make empty array to contain the search results
		let searchResults = []
		// Store the requests in shorter variables
		var userFirst = request.body.firstname.toLowerCase() || undefined;
		var userLast = request.body.lastname.toLowerCase() || undefined;

		// Loop over the json file data
		for (var i =0; i < parsedData.length ; i++) {
			// Check if the user data matches any users from the JSON
			/////NOW INDEXOF to check n noemie nora blabla -> 
			// If i type a -> if it's a part of one of the string in my arrray (check)
			//if(parsedData[i].firstname === userFirst || parsedData[i].lastname === userLast) {
				//console.log('loop works')
				// Add result to the array
				//searchResults.push(parsedData[i]) 
			//}
		//}

			if ( parsedData[i].firstname.toLowerCase().indexOf( userFirst ) != -1 || parsedData[i].lastname.toLowerCase().indexOf( userLast ) != -1 ) {
				searchResults.push( parsedData[i].firstname +  ' ' + parsedData[i].lastname )
			}
		}

		// Render the results on the return.pug view
			// response.render('return', {unicorn: searchResults})

			// Send the result object instead of rendering a page
			response.send( searchResults )

			console.log( 'Amount of results ' + searchResults.length )
	} )
} )

app.post ('/search', (request, response) => {
	// Print the POST data
	console.log('Data posted:')
	console.log( request.body )
	// Read the json file
	fs.readFile(__dirname + '/users.json', (error, data) => {
		// Check if there is an error
		if (error) throw error
		// Change data from file to an object
		let parsedData = JSON.parse( data )
		// Console the object for debugging
		console.log( 'The json file has length: ' + parsedData.length )
		// Make empty array to contain the search results
		let searchResults = []
		// Store the requests in shorter variables
		var userFirst = request.body.firstname.toLowerCase()
		var userLast = request.body.lastname.toLowerCase() 
		// Loop over the json file Data
		for (var i =0; i < parsedData.length ; i++) {
			
				if (parsedData[i].firstname.toLowerCase() == userFirst || parsedData[i].lastname.toLowerCase() == userLast) {
					console.log ('it workdsss')
					searchResults.push(parsedData[i].firstname +  ' ' + parsedData[i].lastname)
				}

			//if ( parsedData[i].firstname.toLowerCase().indexOf( userFirst ) != -1 || parsedData[i].lastname.toLowerCase().indexOf( userLast ) != -1 ) {
				//searchResults.push( parsedData[i].firstname +  ' ' + parsedData[i].lastname )
			//}
		}
			response.send( searchResults )

			console.log( 'Amount of results ' + searchResults.length )


	} )
} )






//Get request on the newusers route with two parameters

app.get('/newusers', (request, response) => {
	//debug
	console.log('almost a users page!')
	//read the file json and parse it.
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if (error) throw error
			//create a variable jason parsed
			let parsedData = JSON.parse( data )
		// debug	
		console.log( parsedData )
		//render the parsed data to my newusers route
		response.render('newusers', {data: parsedData})

	} )
} )

app.post ('/addusers', (request, response) => {
	console.log('almost a page!')

	fs.readFile(__dirname + '/users.json', (error, data) => {
		if (error) throw error
		let parsedData = JSON.parse( data )
		console.log( parsedData )
		console.log("it workds so far")
		var userFirst = request.body.firstname;
		var userLast = request.body.lastname;
		let newUser = {
			firstname: request.body.firstname,
			lastname: request.body.lastname,
			email: request.body.email
		}

		
		parsedData.push(newUser)
  		var configJSON = JSON.stringify(parsedData);
  		fs.writeFileSync('./users.json', JSON.stringify(parsedData), 'utf8', (error, data) => {
  			if (error) throw error
		})

	})
		
		response.redirect('/index')
});












app.listen(8000, function () {
	console.log('YAY I AM RUNNING!');

});




