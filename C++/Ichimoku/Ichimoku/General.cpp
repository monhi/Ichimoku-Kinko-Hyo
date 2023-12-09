#include "General.h"
#include <cstdlib> 
#include <iostream> 

using namespace std;


//#define min(a,b) a>b?b:a
//#define max(a,b) a>b?a:b

void generateChartData(std::vector<PriceData> &input)
{
	PriceData node;
	node_t value = 1200;
	for (int i = 0; i < 256; i++) 
	{
		//var newDate = new Date(firstDate);
		//newDate.setDate(newDate.getDate() + i);

		value += ((((node_t)rand())/ RAND_MAX < 0.5 ? 1 : -1) * ((node_t)rand())/RAND_MAX * 10);
		node.open	= value + (((node_t)rand())/RAND_MAX) * 16 - 8;
		node.close = node.open;
		node.low	= min(value, node.open) - (((node_t)rand()/ RAND_MAX) * 5);
		node.high	= max(value, node.open) + (((node_t)rand()/RAND_MAX)  * 5);
		input.push_back(node);
	}
}

std::string GetRunningDirectory()
{
	char buffer[MAX_PATH];
	GetModuleFileNameA(NULL, buffer, MAX_PATH);
	std::string stemp = buffer;
	stemp = stemp.substr(0,stemp.find_last_of('\\') + 1);
	return stemp;
}

