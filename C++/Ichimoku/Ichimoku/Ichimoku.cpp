// Ichimoku.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "General.h"
#include <iostream>
#include "IchimokuCalculator.h"
#include "stdio.h"


using namespace std;

int main()
{
	std::vector<PriceData> inputData;
	generateChartData(inputData);
	/*
	for (u32 i = 0; i < inputData.size();i++)
	{
		PriceData p = input.at(i);
		cout << i << "  " << p.open <<" " << p.high << "  " << p.low << endl;
	}
	*/
	CIchimokuCalculator* m_ichimoku = new CIchimokuCalculator(inputData);
	m_ichimoku->SaveData();
	delete m_ichimoku;


    return SUCCESS;
}

