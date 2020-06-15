/**
 * creating a server using express.js
 * express simplifies the process of creating servers as opposed to using core http modules
 * express is just a single function
 * with app.get() we can specify whatever we want our server to do when someone tries to get a resource at a specific URL
 *  such as send back a json or an HTML
 * app.get() takes in two arguements i.e. route we want to visit and the callback to be invoked upon visiting that route
 * the callback function takes in two arguements i.e.
 * req (request) -> object that contains information about incoming request to the server.
 * res (response) -> object that allows us to specify what we are going to send back to the request
 * we the call app.listen() to start up the server,
 * we pass the port number and optional callback arguement to the method above.
 * the node process continues running until we close the server
 */
const path = require('path');
 const express = require('express');
 const hbs = require('hbs');

 const geocode = require('./utils/geocode');
 const forecast = require('./utils/forecast');

 // we instantiate our app as an express application by invoking express function
 const app = express();

 const publicDirectory = path.join(__dirname, '../public');
 const viewsPath = path.join(__dirname, '../templates/views');
 const partialsPath = path.join(__dirname, '../templates/partials');

 app.use(express.static(publicDirectory));

 // set up handlebars engine and view location
 // allows you to set a value for express settings i.e. key, setting name and setting value
 app.set('view engine', 'hbs');
 // customize views folder for express
 app.set('views', viewsPath);
 // configure hbs to detect partials
 hbs.registerPartials(partialsPath);

 // setting up route for the template
 app.get('', (req, res) => {
     // render our view
     res.render('index', {
         title: "Dynamically render HTML using express",
         name: "Isaac Obuya"
     });
 });

 // set up route for about page
 app.get('/about', (req, res) => {
     // render about view
    res.render('about', {
        title: 'About page',
        name: "Isaac Obuya"
    });
 });

 // set up route for help page
 app.get('/help', (req, res) => {
     res.render('help', {
         title: "Help page",
         name: "Isaac Obuya",
         message: "Contact system admin for help"
     });
 });

//  app.get('/help', (req, res) => {
//      res.send("Help page!")
//  });

//  app.get('/about', (req, res) => {
//      res.send([{
//          name: "Isaac Obuya",
//          age: 24
//      },
//     {
//         name: "THomas Tom",
//         age: 36
//     }])
//  });

 app.get('/weather', (req, res) => {
     // if address is not provided as a query string
     if (!req.query.address) {
         return res.send({
             error: "You must provide a location"
         });
     }

     const { address } = req.query;

     geocode(address, (error, data) => {
         if (error) {
             return res.send({
                error: "Could not get cordinates for specified location"
             });
         }
         // destructure off location, latitude and longitude from data
         const { location, latitude, longitude } = data;

         // callback chaining -> the result of geocode will be used as arguement to forecast
         forecast(latitude, longitude, (error, forecastData) => {
             if (error) {
                 return res.send({
                     error: "Unable to get forecast data for the provided address"
                 });
                }
                console.log(forecastData);
               // we got forecast data succesfully
               res.send({
                forecast: forecastData,
                location: location,
                address: address
            });
         })
     });
 });

 app.get('/help/*', (req, res) => {
     res.render("errorPage", {
        title: "Help page",
        name: "Isaac Obuya",
         message: "Sorry, the help document was not found"
     });
 });

 app.get('*', (req, res) => {
     res.render("errorPage", {
        title: "Error page",
        name: "Isaac Obuya",
        message: "404 Page not found!"
     });
 });

app.listen(3000, () => {
    console.log("Server is up and running succesfully.")
});