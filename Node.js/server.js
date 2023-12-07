const express       = require('express');
const path          = require('path');
const { join }      = require('path');
const app           = express();
const PORT          = 3000;

app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get("/", (req, res) => {
    
});


app.listen(PORT,()=>{
	console.log(`Listening to port ${PORT}`);
});