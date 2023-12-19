const express       = require('express');
const path          = require('path');
const { join }      = require('path');
const app           = express();
const fs 			= require('node:fs');
const https  		= require('https');

const PORT          = 3000;

app.use(express.json());

let ChikouSpan;
let KijunSen;
let Kumo;
let TenkanSen;
let RawData;

try 
{
  	ChikouSpan = fs.readFileSync('./DATA/ChikouSpan.json', 'utf8');
	console.log("ChikouSpan:",ChikouSpan);
} 
catch (err) 
{
  console.error(err);
}


try 
{
  KijunSen = fs.readFileSync('./DATA/KijunSen.json', 'utf8');
	//console.log(KijunSen);
} 
catch (err) 
{
  console.error(err);
}


try 
{
  	Kumo = fs.readFileSync('./DATA/kumo.json', 'utf8');
	//console.log(Kumo);
} 
catch (err) 
{
  console.error(err);
}

try 
{
	TenkanSen = fs.readFileSync('./DATA/TenkanSen.json', 'utf8');
	//console.log(TenkanSen);
} 
catch (err) 
{
  console.error(err);
}

try 
{
	RawData = fs.readFileSync('./DATA/RawData.json', 'utf8');
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
	let content = [{data:"FLM"},{data:"SCRT"},{data:"BTT"},{data:"WNXM"},{data:"TON"},{data:"GAL"},{data:"MBL"},{data:"MIR"},{data:"GFT"},{data:"ZIL"},{data:"LYXE"},{data:"UOS"},{data:"GLM"},{data:"BURGER"},{data:"ARPA"},{data:"QTUM"},{data:"DGB"},{data:"AXS"},{data:"RUNE"},{data:"ICX"},{data:"GMX"},{data:"BEAMX"},{data:"RSR"},{data:"VIC"},{data:"CHESS"},{data:"VITE"},{data:"MOB"},{data:"ALPINE"},{data:"T"},{data:"KEY"},{data:"WTC"},{data:"DOGE"},{data:"CTXC"},{data:"MDT"},{data:"LEND"},{data:"CVC"},{data:"XAUT"},{data:"ACM"},{data:"KLAY"},{data:"USDP"},{data:"LIT"},{data:"DCR"},{data:"C98"},{data:"XLM"},{data:"ONG"},{data:"TLM"},{data:"TFUEL"},{data:"PAXG"},{data:"SEI"},{data:"ANKR"},{data:"BTC"},{data:"GT"},{data:"ELF"},{data:"EGLD"},{data:"CELR"},{data:"FIL"},{data:"FET"},{data:"USTC"},{data:"ALICE"},{data:"TUSD"},{data:"GLMR"},{data:"FLOW"},{data:"IDEX"},{data:"MBOX"},{data:"ID"},{data:"TRU"},{data:"HIVE"},{data:"PYR"},{data:"RPL"},{data:"BNB"},{data:"SYN"},{data:"DENT"},{data:"GNS"},{data:"GAS"},{data:"SUSHI"},{data:"ACS"},{data:"AUDIO"},{data:"COTI"},{data:"ARKM"},{data:"MASK"},{data:"DAR"},{data:"WRX"},{data:"XYM"},{data:"FIS"},{data:"SUSHIUP"},{data:"MULTI"},{data:"GTC"},{data:"BOND"},{data:"HOOK"},{data:"BTS"},{data:"EDU"},{data:"UNFI"},{data:"ACH"},{data:"OOKI"},{data:"FIRO"},{data:"CKB"},{data:"ENS"},{data:"EOS"},{data:"ERD"},{data:"DYDX"},{data:"XEM"},{data:"ONT"},{data:"RGT"},{data:"GXS"},{data:"CLV"},{data:"COS"},{data:"WAN"},{data:"SC"},{data:"BEAM"},{data:"IRT"},{data:"BUSD"},{data:"ASR"},{data:"CRO"},{data:"CAKE"},{data:"AVA"},{data:"PORTO"},{data:"MAV"},{data:"SUN"},{data:"NEAR"},{data:"JOE"},{data:"XEC"},{data:"AGIX"},{data:"KSM"},{data:"MEME"},{data:"STORJ"},{data:"HFT"},{data:"STG"},{data:"NEXO"},{data:"BTG"},{data:"PNT"},{data:"LIR"},{data:"RAD"},{data:"IGU"},{data:"OGN"},{data:"KP3R"},{data:"INJ"},{data:"GENE"},{data:"ELON"},{data:"ALPACA"},{data:"ALCX"},{data:"FXS"},{data:"0BLOK"},{data:"TKO"},{data:"IMX"},{data:"CYBER"},{data:"DREP"},{data:"COMP"},{data:"POWR"},{data:"SANTOS"},{data:"ADA"},{data:"XNO"},{data:"CTK"},{data:"AUTO"},{data:"LTC"},{data:"FIO"},{data:"API3"},{data:"ZEC"},{data:"TLOS"},{data:"FTM"},{data:"PHB"},{data:"STEEM"},{data:"PEOPLE"},{data:"OG"},{data:"DIA"},{data:"ARDR"},{data:"TAMA"},{data:"LOKA"},{data:"LRC"},{data:"APE"},{data:"ERN"},{data:"SOL"},{data:"SYS"},{data:"RLC"},{data:"NULS"},{data:"SNT"},{data:"BAND"},{data:"POLYX"},{data:"DOCK"},{data:"AIDOGE"},{data:"UTK"},{data:"XRD"},{data:"ALGO"},{data:"WIN"},{data:"BTCST"},{data:"RNDR"},{data:"APT"},{data:"FOR"},{data:"BEL"},{data:"HIGH"},{data:"WEMIX"},{data:"XCAD"},{data:"VGX"},{data:"GODS"},{data:"LTO"},{data:"THETA"},{data:"LDO"},{data:"FRONT"},{data:"QUICK"},{data:"PSG"},{data:"RSS3"},{data:"MANA"},{data:"DEXE"},{data:"STMX"},{data:"DATA"},{data:"REI"},{data:"VANRY"},{data:"XDC"},{data:"STRAX"},{data:"AVAX"},{data:"BNX"},{data:"YFI"},{data:"CFX"},{data:"ENJ"},{data:"BLZ"},{data:"BAT"},{data:"XVS"},{data:"KCS"},{data:"SSV"},{data:"KAVA"},{data:"MINA"},{data:"ZRX"},{data:"TURBO"},{data:"VET"},{data:"PUNDIX"},{data:"REP"},{data:"MOVR"},{data:"FLOKI"},{data:"DOT"},{data:"WAVES"},{data:"MITH"},{data:"LINK"},{data:"NMR"},{data:"FDUSD"},{data:"USDC"},{data:"HBAR"},{data:"RIF"},{data:"BAL"},{data:"COMBO"},{data:"ELA"},{data:"MKR"},{data:"BIT"},{data:"ATA"},{data:"AR"},{data:"AKITA"},{data:"SRM"},{data:"NANO"},{data:"CSPR"},{data:"BNT"},{data:"GRT"},{data:"XTZ"},{data:"BONE"},{data:"LUNA"},{data:"EVER"},{data:"ATOM"},{data:"MNT"},{data:"UMA"},{data:"LAZIO"},{data:"VOXEL"},{data:"WOO"},{data:"TCT"},{data:"CHR"},{data:"WBTC"},{data:"PERL"},{data:"TRIBE"},{data:"ETH"},{data:"REN"},{data:"KMD"},{data:"BTTD"},{data:"ORDI"},{data:"SUPER"},{data:"OSMO"},{data:"HIFI"},{data:"QI"},{data:"PROM"},{data:"CVP"},{data:"BTCUP"},{data:"JASMY"},{data:"COCOS"},{data:"EPX"},{data:"1INCH"},{data:"DEGO"},{data:"YFII"},{data:"ORN"},{data:"SFP"},{data:"PENDLE"},{data:"WING"},{data:"OAX"},{data:"UNI"},{data:"BONK"},{data:"SWEAT"},{data:"PERP"},{data:"BABYDOGE"},{data:"XMR"},{data:"ADX"},{data:"SHIB"},{data:"STX"},{data:"OP"},{data:"JUV"},{data:"DASH"},{data:"WMT"},{data:"XVG"},{data:"NPXS"},{data:"KNC"},{data:"QKC"},{data:"BETA"},{data:"DF"},{data:"ONE"},{data:"WAXP"},{data:"FLUX"},{data:"OM"},{data:"FORTH"},{data:"BSW"},{data:"HOT"},{data:"SXP"},{data:"FARM"},{data:"CEEK"},{data:"SUI"},{data:"IOTX"},{data:"WLD"},{data:"BADGER"},{data:"RAMP"},{data:"AMP"},{data:"LSK"},{data:"AMB"},{data:"HT"},{data:"SLP"},{data:"AED"},{data:"AGLD"},{data:"CHZ"},{data:"KAS"},{data:"ABBC"},{data:"LEVER"},{data:"RDNT"},{data:"LPT"},{data:"LADYS"},{data:"STPT"},{data:"GHST"},{data:"BRISE"},{data:"MLN"},{data:"MC"},{data:"OKB"},{data:"NEO"},{data:"UNIUP"},{data:"ANT"},{data:"DUSK"},{data:"REEF"},{data:"ERG"},{data:"LOOM"},{data:"WAXL"},{data:"PHA"},{data:"OCEAN"},{data:"DNT"},{data:"BLUR"},{data:"HNT"},{data:"TOMI"},{data:"PLA"},{data:"VTHO"},{data:"FIDA"},{data:"VRA"},{data:"DC"},{data:"PIT"},{data:"PEPE"},{data:"BSV"},{data:"POND"},{data:"TORN"},{data:"POLS"},{data:"GMT"},{data:"BAKE"},{data:"ALI"},{data:"POLY"},{data:"MATIC"},{data:"ICP"},{data:"CRV"},{data:"WLKN"},{data:"TWT"},{data:"BCH"},{data:"ILV"},{data:"DODO"},{data:"ACA"},{data:"TRB"},{data:"EUR"},{data:"AZERO"},{data:"FTT"},{data:"ZEN"},{data:"CELO"},{data:"OMG"},{data:"TIA"},{data:"BAR"},{data:"CTSI"},{data:"MTL"},{data:"YGG"},{data:"FLR"},{data:"LOOKS"},{data:"IOTA"},{data:"GNO"},{data:"XCH"},{data:"SKL"},{data:"IRIS"},{data:"CORE"},{data:"ETHW"},{data:"XRP"},{data:"EPS"},{data:"FUN"},{data:"GBP"},{data:"NFT"},{data:"ATLAS"},{data:"SAND"},{data:"BLOK"},{data:"CVX"},{data:"RFOX"},{data:"MDX"},{data:"LYX"},{data:"QOM"},{data:"GTO"},{data:"NKN"},{data:"EURT"},{data:"RARE"},{data:"AKRO"},{data:"TOMO"},{data:"BICO"},{data:"LINA"},{data:"TVK"},{data:"USDT"},{data:"REQ"},{data:"LQTY"},{data:"RAY"},{data:"ROSE"},{data:"OAS"},{data:"KDA"},{data:"CITY"},{data:"JST"},{data:"NYM"},{data:"AERGO"},{data:"MFT"},{data:"AION"},{data:"KISHU"},{data:"USD"},{data:"ASTR"},{data:"OXT"},{data:"RVN"},{data:"TRX"},{data:"ATM"},{data:"DAI"},{data:"AUCTION"},{data:"DAO"},{data:"PAX"},{data:"SPELL"},{data:"UFT"},{data:"HARD"},{data:"TROY"},{data:"ARB"},{data:"QNT"},{data:"GALA"},{data:"AAVE"},{data:"ETC"},{data:"STARL"},{data:"IOST"},{data:"MAGIC"},{data:"OBI"},{data:"ALPHA"},{data:"LUNC"},{data:"SNX"}]
			content.sort(function (a, b) {
		if (a.data < b.data) {
			return -1;
		}
		else if (a.data > b.data) {
			return 1;
		}
		return 0;
		});
	res.json(content);
	
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


app.get("/audio/notif.mp3", (req, res) => {
	console.log(`HERE /v1/notif.mp3 `);

});

app.listen(PORT,()=>{
	console.log(`Listening to port ${PORT}`);
});