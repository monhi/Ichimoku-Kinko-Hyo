const express       = require('express');
const path          = require('path');
const { join }      = require("path");
const app           = express();
const PORT          = 80;

app.use(express.json());

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");


const database = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

new Router(app,database.db);

app.listen(PORT,()=>{
	console.log(`Listening to port ${PORT}`);
});