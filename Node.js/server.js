const express       = require('express');
const path          = require('path');
const { join }      = require('path');
const app           = express();
const fs 			= require('node:fs');

const PORT          = 3000;

app.use(express.json());

let ChikouSpan;
let KijunSen;
let Kumo;
let TenkanSen;
let RawData;






try 
{
  const ChikouSpan = fs.readFileSync('../C++/Ichimoku/Debug/DATA/ChikouSpan.json', 'utf8');
	console.log(ChikouSpan);
} 
catch (err) 
{
  console.error(err);
}


try 
{
  KijunSen = fs.readFileSync('../C++/Ichimoku/Debug/DATA/KijunSen.json', 'utf8');
	console.log(KijunSen);
} 
catch (err) 
{
  console.error(err);
}


try 
{
  	Kumo = fs.readFileSync('../C++/Ichimoku/Debug/DATA/komu.json', 'utf8');
	console.log(Kumo);
} 
catch (err) 
{
  console.error(err);
}

try 
{
	TenkanSen = fs.readFileSync('../C++/Ichimoku/Debug/DATA/TenkanSen.json', 'utf8');
	console.log(TenkanSen);
} 
catch (err) 
{
  console.error(err);
}

try 
{
	RawData = fs.readFileSync('../C++/Ichimoku/Debug/DATA/RawData.json', 'utf8');
	console.log(RawData);
} 
catch (err) 
{
  console.error(err);
}

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


// const d = new Date(2021,3,25,10,30,00);
// console.log(d);

//let d = new Date().toLocaleString();
let d = new Date();
console.log(d);
// Create new Date instance
//var date = new Date()
// Add a day
//d.setDate(d.getDate() + 1)
//console.log(d);

//d.setMinutes(d.getMinutes()+20)
//console.log(d);





app.get("/v1/getCoins", (req, res) => {
    res.json([{data:"BTC"},{data:"OP"},{data:"C98"}]);
	console.log("Here:/v1/getCoins");
});


app.get("/v1/getData", (req, res) => {
    res.json({title:"BTC",Date:d,quantom:"1day",ChikouSpan,KijunSen,Kumo,TenkanSen,RawData});
	console.log("Here:/v1/getData");
});




app.listen(PORT,()=>{
	console.log(`Listening to port ${PORT}`);
});