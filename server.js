const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine', 'hbs'); //  (key,value)


app.use((req, res, next) => {
	var now = new Date().toString();
	var log =`${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log', log+ '\n', (err) => {
		if (err) 
		{
			console.log('Unable to append to server.log');
		}
	});
	console.log(log);

	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
});
*/

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrYear', () =>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
	return text.toUpperCase();
});

app.get('/', (request, response)=>{

	response.render('home.hbs', {
		//object to be sent
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome to my Website'
	});
	
});
app.get('/about', (request, response)=>{

	response.render('about.hbs', {
		//object to be sent
		pageTitle: 'About Page',
		
	});

});
app.listen(3000, ()=>{
	console.log('Server is up and running');
});