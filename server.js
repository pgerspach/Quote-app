const express = require("express");
require("dotenv").config();

// Sets up the Express App
// =============================================================
let app = express();
var session = require('express-session');

let PORT = process.env.PORT || 3001;

// Requiring our models for syncing
let db = require("./models");
let seed = require("./seeders/seeds.js");

let firebase = require("firebase");
const router = express.Router();
const admin = require("firebase-admin");
const adminFb = require("./firebase/admin/userbase.js")(admin);

let config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "quote-userauth.firebaseapp.com",
  databaseURL: "https://quote-userauth.firebaseio.com",
  projectId: "quote-userauth",
};

firebase.initializeApp(config);


const Firebase = {firebase:firebase,admin:adminFb};
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({secret: "MySecret"}));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

let routes = require("./routes")(router, Firebase);

app.use(routes);



db.sequelize.sync({force:true}).then(function() { //{force:true}
    seed(db);
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
});