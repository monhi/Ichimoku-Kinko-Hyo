#pragma once
#include <Windows.h>
#include <vector>
#include <string>

#define SUCCESS  0
#define FAILURE -1

typedef unsigned int	u32;
typedef			 int	i32;
typedef			 double node_t;

typedef struct SenkouSpan_t {
	node_t a;
	node_t b;
} SenkouSpan_t;


struct PriceData 
{
	node_t high;
	node_t low;
	node_t open;
	node_t close;
};


void generateChartData(std::vector<PriceData> &input);
std::string GetRunningDirectory();