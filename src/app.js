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
 // we instantiate our app as an express application by invoking express function
 const app = express();

 const publicDirectory = path.join(__dirname, '../public');

 app.use(express.static(publicDirectory));

 // allows you to set a value for express settings i.e. key, setting name and setting value
 app.set('view engine', 'hbs');

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
     res.send("Weather forecast page");
 });

app.listen(3000, () => {
    console.log("Server is up and running succesfully.")
});