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
  	ChikouSpan = fs.readFileSync('../C++/Ichimoku/Debug/DATA/ChikouSpan.json', 'utf8');
	console.log("ChikouSpan:",ChikouSpan);
} 
catch (err) 
{
  console.error(err);
}


try 
{
  KijunSen = fs.readFileSync('../C++/Ichimoku/Debug/DATA/KijunSen.json', 'utf8');
	//console.log(KijunSen);
} 
catch (err) 
{
  console.error(err);
}


try 
{
  	Kumo = fs.readFileSync('../C++/Ichimoku/Debug/DATA/komu.json', 'utf8');
	//console.log(Kumo);
} 
catch (err) 
{
  console.error(err);
}

try 
{
	TenkanSen = fs.readFileSync('../C++/Ichimoku/Debug/DATA/TenkanSen.json', 'utf8');
	//console.log(TenkanSen);
} 
catch (err) 
{
  console.error(err);
}

try 
{
	RawData = fs.readFileSync('../C++/Ichimoku/Debug/DATA/RawData.json', 'utf8');
	//console.log(RawData);
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
//let d = new Date();
//console.log(d);
// Create new Date instance
//var date = new Date()
// Add a day
//d.setDate(d.getDate() + 1)
//console.log(d);

//d.setMinutes(d.getMinutes()+20)
//console.log(d);

app.get("/v1/getCoins", (req, res) => {
	console.log("HERE /v1/getCoins");    
	res.json([{data:"BTC"},{data:"ETH"},{data:"LUNC"},{data:"DOGE"},{data:"PEOPLE"},{data:"CFX"},{data:"BNB"},{data:"APT"},{data:"DOT"},{data:"LDO"},{data:"FTM"},{data:"OP"},{data:"DYDX"},{data:"SHIB"},{data:"LINK"},{data:"XRP"},{data:"AVAX"},{data:"ICP"},{data:"EOS"},{data:"LTC"},{data:"CRV"},{data:"ADA"},{data:"GALA"},{data:"SAND"},{data:"NEAR"},{data:"MINA"},{data:"AR"},{data:"MATIC"},{data:"FLOW"},{data:"FXS"},{data:"FET"},{data:"CHZ"},{data:"JASMY"},{data:"GRT"},{data:"FIL"},{data:"ATOM"},{data:"STORJ"},{data:"LRC"},{data:"UNI"},{data:"IMX"},{data:"MANA"},{data:"AAVE"},{data:"GMT"},{data:"ROSE"},{data:"EGLD"},{data:"COTI"},{data:"XMR"},{data:"KSM"},{data:"OCEAN"},{data:"HBAR"},{data:"DASH"},{data:"CELO"},{data:"SUSHI"},{data:"KAVA"},{data:"RUNE"},{data:"ZEC"},{data:"ENS"},{data:"SKL"},{data:"BCH"},{data:"TRX"},{data:"GTC"},{data:"1INCH"},{data:"QNT"},{data:"ONE"},{data:"XLM"},{data:"ENJ"},{data:"ALICE"},{data:"BAT"},{data:"XTZ"},{data:"ONT"},{data:"COMP"},{data:"IOTX"},{data:"ARPA"},{data:"BAND"},{data:"RVN"},{data:"APE"},{data:"SFP"},{data:"OMG"},{data:"KNC"},{data:"SOL"},{data:"FLM"},{data:"ANT"},{data:"VET"},{data:"AUDIO"},{data:"AUD"},{data:"BAL"},{data:"CORE"},{data:"IOST"},{data:"COMP"},{data:"LUNA"},{data:"KAVA"},{data:"TONCOIN"},{data:"ANKR"},{data:"SNX"},{data:"RNDR"},{data:"MASK"},{data:"ASTR"},{data:"OGN"},{data:"ETC"},{data:"AXS"},{data:"ZIL"},{data:"YFI"},{data:"ALGO"},{data:"THETA"},{data:"OGN"},{data:"ZRX"},{data:"GT"},{data:"MKR"},{data:"GAL"},{data:"HOOK"},{data:"MAGIC"},{data:"WAVES"}]);
	
});


app.get("/v1/getData", (req, res) => {
	console.log(`HERE /v1/getData CoinName is: ${req.query.coin}`);
	let curCoin = req.query.coin;
	let startTime = new Date();
	startTime.setMinutes(startTime.getMinutes()-1280+210); // 1280 means 1280 munites before. 210 is greenwich offset. 
	console.log(startTime);
	console.log(ChikouSpan);
	
    res.json({title:curCoin,Date:startTime,quantom:"5min",RawData,TenkanSen,KijunSen,ChikouSpan,Kumo});	
});

app.listen(PORT,()=>{
	console.log(`Listening to port ${PORT}`);
});