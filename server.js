const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//AUTH 0 DEPENDENCIES
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

//AUTH 0
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://medici.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://protected-bayou-55860.herokuapp.com/',
    issuer: "https://medici.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
  res.send('Secured Resource');
});
//END OF AUTH 0

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/officerfeedback");
// mongoose.connect("mongodb://transparentcop:changeishere2018@ds263619.mlab.com:63619/officerfeedback");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
