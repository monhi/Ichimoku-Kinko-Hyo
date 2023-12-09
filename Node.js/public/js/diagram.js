window.onload = function () 
{
	FetchActiveCoinsFunction();
}

function add(type,name) 
{
	//Create an input type dynamically.   
	var element = document.createElement("input");
	//Assign different attributes to the element. 
	element.type = type;
	element.value = name; // Really? You want the default value to be the type string?
	element.name = name; // And the name too?
	element.classList.add("button");
	element.classList.add("button1");
	element.onclick = function()
	{
		FetchDataFunction(element.value);
	} 
	var container = document.getElementById("coins"); 
	container.appendChild(element);
}

function FetchActiveCoinsFunction()
{
	fetch('http://localhost:3000/v1/getCoins')
	.then(data => {
	return data.json();
	})
	.then(post => {
		post.map((i)=>{
			console.log(i);
			add("button",i.data);
		})
	});
}

function FetchDataFunction(coinName)
{
	console.log("FetchDataFunction is called with param:",coinName );

	fetch(`http://localhost:3000/v1/getData?coin=${coinName}`)
	.then(data => {
	return data.json();
	})
	.then(post => {
		console.log(post.ChikouSpan);
		RenderFunction(post.title,post.Date,post.quantom,JSON.parse(post.RawData),JSON.parse(post.TenkanSen),JSON.parse(post.KijunSen),JSON.parse(post.ChikouSpan),JSON.parse(post.Kumo));
	});
}

function CalcXVector(date,quantom,length)
{
	let res = [];
	for (let i=0; i < length+26;i++)
	{
		res[i] = new Date(date);
		if( quantom == "5min" )
		{
			res[i].setMinutes(res[i].getMinutes()+i*5);
		}		
	}
	return res;
}

function RawDataDiagram(x,y)
{
	let res = [];
	let length = y.length;
	for (let i=0; i < length; i++)
	{ //y: [Open, High ,Low, Close]
		let obj = {};
		obj.x 	= x[i];
		obj.y 	= [y[i].open,y[i].high,y[i].low,y[i].close];
		res[i] 	= obj;
	}
	return res;
}

function TenKanSenDiagram(x,y)
{
	let res = [];
	let length = y.length;
	for (let i=0; i < length; i++)
	{ 
		let obj = {};
		obj.x 	= x[i];
		obj.y 	= y[i].data;
		res[i] 	= obj;
	}
	return res;
}

function KiJunSenDiagram(x,y)
{
	let res = [];
	let length = y.length;
	for (let i=0; i < length; i++)
	{ 
		let obj = {};
		obj.x 	= x[i];
		obj.y 	= y[i].data;
		res[i] 	= obj;
	}
	return res;
}

function ChikouSpanDiagram(x,y)
{
	let res = [];
	let length = y.length;
	for (let i=0; i < length-26; i++)
	{ 
		let obj = {};
		obj.x 	= x[i];
		obj.y 	= y[i].data;
		res[i] 	= obj;
	}
	return res;	
}

function KumoADiagram(x,y)
{
	let res = [];
	let length = y.length;
	for (let i=0; i < length; i++)
	{ 
		let obj = {};
		obj.x 	= x[i+26];
		obj.y 	= y[i].a;
		res[i] 	= obj;
	}
	return res;	
}


function KumoBDiagram(x,y)
{
	let res = [];
	let length = y.length;
	for (let i=0; i < length; i++)
	{ 
		let obj = {};
		obj.x 	= x[i+26];
		obj.y 	= y[i].b;
		res[i] 	= obj;
	}
	return res;	
}

function KumoDiagram(x,y)
{
	let res = [];
	let length = y.length;
	for (let i=0; i < length; i++)
	{ 
		let a = y[i].a;
		let b = y[i].b;
/*
		if (a>b)
		{
			a = a-2;
			b = b+2;
		}
		else if (b > a )
		{
			a = a+2;
			b = b-2;
		}
*/
		let obj = {};
		obj.x 	= x[i+26];
		obj.y 	= [a,b];
		res[i] 	= obj;
	}
	return res;	
}


function RenderFunction(title,date,quantom,RawData,TenkanSen,KijunSen,ChikouSpan,Kumo)
{
	let xVector 		 = CalcXVector(date,quantom,RawData.length);
	let rawDataPoints	 = RawDataDiagram(xVector,RawData);
	let tenKanSenPoints  = TenKanSenDiagram(xVector,TenkanSen);
	let kiJunSenPoints   = KiJunSenDiagram(xVector,KijunSen);
	let chikouSpanPoints = ChikouSpanDiagram(xVector,ChikouSpan);
	let kumoAPoints      = KumoADiagram(xVector,Kumo);
	let KumoBPoints      = KumoBDiagram(xVector,Kumo);
	let KumoPoints 		 = KumoDiagram(xVector,Kumo);


var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light1", // "light1", "light2", "dark1", "dark2"
	exportEnabled: true,
	title:{
		text: title
	},
	axisX: {
		valueFormatString: "hh:mm"
	},
	axisY: {
		includeZero:false, 
		prefix: "$",
		title: "Price (USDT)"
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		itemclick: toogleDataSeries
	},
	data: [
	{
		type: "candlestick",
		showInLegend: true,
		name: title,
		yValueFormatString: "$###0.00",
		dataPoints: rawDataPoints

	},
	{
		type: "line",
		showInLegend: true,
		name: "TenkanSen",
		markerType: "square",	
		color: "#F08080",
		dataPoints: tenKanSenPoints
	},
	{
		type: "line",
		showInLegend: true,
		name: "KijunSen",
		markerType: "square",	
		color: "#1f2fbf",
		dataPoints: kiJunSenPoints
	},
	{
		type: "line",
		showInLegend: true,
		name: "ChikouSpan",
		markerType: "square",	
		color: "#37f734",
		dataPoints: chikouSpanPoints
	},
	{
		type: "rangeArea",
		showInLegend: true,
		fillOpacity: .1,
		name: "Kumo",
		markerType: "square",	
		color: "#5e1011",
		dataPoints: KumoPoints
	},	
	{
		type: "line",
		showInLegend: true,
		name: "KumoA",
		markerType: "square",	
		color: "#105e13",
		dataPoints: kumoAPoints
	},
	{
		type: "line",
		showInLegend: true,
		name: "KumoB",
		markerType: "square",	
		color: "#5e1011",
		dataPoints: KumoBPoints
	}
	]
});
chart.render();

function toogleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}

}