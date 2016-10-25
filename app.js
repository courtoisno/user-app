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


app.post ('/return', (request, response) =>{
	console.log( request.body )
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if (error) throw error
		let parsedData = JSON.parse( data )
		console.log( parsedData )
		let searchResults = []
		var userFirst = request.body.firstname;
		var userLast = request.body.lastname;

		for (var i =0; i < parsedData.length ; i++) {
			if(parsedData[i].firstname === userFirst || parsedData[i].lastname === userLast) {
				console.log('loop works')
				searchResults.push(parsedData[i]) 
			}
			
			else{ 
				console.log("no finding match")}
		}
		// THIS STEP DOESNT CHANGE ANYTHING !! Only on backend -> it just give access to our data on return
		response.render('return', {unicorn: searchResults})
		console.log(searchResults)
	} )
} )




app.get('/newusers', (request, response) => {
	console.log('almost a users page!')
	fs.readFile(__dirname + '/users.json', (error, data) => {
		if (error) throw error
			let parsedData = JSON.parse( data )
		console.log( parsedData )
		response.render('newusers', {data: parsedData})

	})
})




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




