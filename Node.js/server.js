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


app.get("/v1/getData", (req, res) => {
    res.json({title:"BTC",ChikouSpan,KijunSen,Kumo,TenkanSen,RawData});
	console.log("Here:/v1/getData");
});


app.listen(PORT,()=>{
	console.log(`Listening to port ${PORT}`);
});