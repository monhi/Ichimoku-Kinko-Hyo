#include "IchimokuCalculator.h"
#include <iostream>
#include "General.h"
#include "FileApi.h"

CIchimokuCalculator::CIchimokuCalculator(const std::vector<PriceData>& priceData)
{
	TENKANSEN_PERIOD	=  9;
	KIJUNSEN_PERIOD		= 26;
	CHIKOUSPAN_PERIOD	= 26;
	SENKOUSPANB_PERIOD  = 52;

	m_prices			= priceData;
	m_size				= priceData.size();

	m_tenkanSen		= new node_t[m_size];
	m_kijunSen		= new node_t[m_size];
	m_chikouSpan	= new node_t[m_size];
	m_kumo			= new SenkouSpan_t[m_size];

	for (int i	= 0; i < m_size; i++)
	{
		m_tenkanSen[i]	=	calculateTenkanSen(i);
		m_kijunSen[i]	=	calculateKijunSen(i);
		m_chikouSpan[i]	=	calculateChikouSpan(i);
		m_kumo[i].a		=	calculateKumoA(i);
		m_kumo[i].b		=	calculateKumoB(i);
	}
}

CIchimokuCalculator::~CIchimokuCalculator()
{
	delete [] m_tenkanSen;
	delete [] m_kijunSen;
	delete [] m_chikouSpan;
	delete [] m_kumo;
}

node_t CIchimokuCalculator::calculateTenkanSen(int currentIndex)// Conversion line
{
	// Calculate Tenkan Sen logic here using historical prices
	// Example: Simple average of high and low prices over the specified period

	node_t highest_high = -1000000000000;
	node_t lowest_low	=  1000000000000;
	for (int i = currentIndex - TENKANSEN_PERIOD + 1; i <= currentIndex; i++)
	{
		if (i >= 0)
		{
			if (m_prices[i].high > highest_high)
			{
				highest_high = m_prices[i].high;
			}

			if (m_prices[i].low < lowest_low)
			{
				lowest_low = m_prices[i].low;
			}
		}
	}
	return (highest_high + lowest_low) / 2;
}

node_t CIchimokuCalculator::calculateKijunSen(int currentIndex)// Base line
{
	// Calculate Tenkan Sen logic here using historical prices
	// Example: Simple average of high and low prices over the specified period
	node_t highest_high = -1000000000000;
	node_t lowest_low	=  1000000000000;
	for (int i = currentIndex - KIJUNSEN_PERIOD + 1; i <= currentIndex; i++)
	{
		if (i >= 0)
		{
			if (m_prices[i].high > highest_high)
			{
				highest_high = m_prices[i].high;
			}

			if (m_prices[i].low < lowest_low)
			{
				lowest_low = m_prices[i].low;
			}
		}
	}
	return (highest_high + lowest_low) / 2;
}

node_t CIchimokuCalculator::calculateChikouSpan(int currentIndex)// Chikou Span light green.
{
	// Calculate ChikouSpan logic here 
	if ( currentIndex <  m_size - CHIKOUSPAN_PERIOD )
	{
		return m_prices[currentIndex + CHIKOUSPAN_PERIOD].close;
	}
	else
	{
		return 0;
	}
}

node_t CIchimokuCalculator::calculateKumoA(int currentIndex)
{
	return (m_tenkanSen[currentIndex] + m_kijunSen[currentIndex]) / 2;
}

node_t CIchimokuCalculator::calculateKumoB(int currentIndex)
{
	node_t highest_high = -1000000000000;
	node_t lowest_low	=  1000000000000;
	for (int i = currentIndex - SENKOUSPANB_PERIOD + 1; i <= currentIndex; i++)
	{
		if (i >= 0)
		{
			if (m_prices[i].high > highest_high)
			{
				highest_high = m_prices[i].high;
			}

			if (m_prices[i].low < lowest_low)
			{
				lowest_low = m_prices[i].low;
			}
		}
	}
	return (highest_high + lowest_low) / 2;
}



int CIchimokuCalculator::SaveData()
{	
	std::string dir = GetRunningDirectory();
	std::string stemp;

	char buffer[256];

	dir = dir + "DATA\\";
	CreateDirectoryA(dir.c_str(),NULL);
	stemp = dir + "RawData.json";
	FILE* f1 = fopen(stemp.c_str(), "w");
	if (f1)
	{
		fputs("[", f1);

		for (int i = 0; i < m_size; i++)
		{
			memset(buffer, 0, sizeof(buffer));

			if (i == (m_size - 1))
			{
				sprintf(buffer, "{\"open\":%0.7f,\"close\":%0.7f,\"high\":%0.7f,\"low\":%0.7f}\n", m_prices.at(i).open, m_prices.at(i).close, m_prices.at(i).high, m_prices.at(i).low);
			}
			else
			{
				sprintf(buffer, "{\"open\":%0.7f,\"close\":%0.7f,\"high\":%0.7f,\"low\":%0.7f},\n", m_prices.at(i).open, m_prices.at(i).close, m_prices.at(i).high, m_prices.at(i).low);
			}			
			fwrite(buffer, 1, strlen(buffer), f1);			
		}		
		fputs("]", f1);
		fclose(f1);
	}

	stemp = dir + "TenkanSen.json";
	FILE* f2 = fopen(stemp.c_str(), "w");
	if (f2)
	{
		fputs("[", f2);

		for (int i = 0; i < m_size; i++)
		{
			memset(buffer, 0, sizeof(buffer));

			if (i == (m_size - 1))
			{
				sprintf(buffer, "{\"data\":%0.7f}\n", m_tenkanSen[i]);
			}
			else
			{
				sprintf(buffer, "{\"data\":%0.7f},\n", m_tenkanSen[i]);
			}						
			fwrite(buffer, 1, strlen(buffer), f2);
		}
		fputs("]", f2);
		fclose(f2);
	}


	stemp = dir + "KijunSen.json";
	FILE* f3 = fopen(stemp.c_str(), "w");
	if (f3)
	{
		fputs("[", f3);

		for (int i = 0; i < m_size; i++)
		{
			memset(buffer, 0, sizeof(buffer));
			if ( i == (m_size-1) )
			{
				sprintf(buffer, "{\"data\":%0.7f}\n", m_kijunSen[i]);
			}
			else
			{
				sprintf(buffer, "{\"data\":%0.7f},\n", m_kijunSen[i]);
			}
			fwrite(buffer, 1, strlen(buffer), f3);
		}
		fputs("]", f3);
		fclose(f3);
	}

	stemp = dir + "ChikouSpan.json";
	FILE* f4 = fopen(stemp.c_str(), "w");
	if (f4)
	{
		fputs("[", f4);

		for (int i = 0; i < m_size; i++)
		{
			memset(buffer, 0, sizeof(buffer));
			if (i == (m_size - 1))
			{
				sprintf(buffer, "{\"data\":%0.7f}\n",  m_chikouSpan[i]);
			}
			else
			{
				sprintf(buffer, "{\"data\":%0.7f},\n", m_chikouSpan[i]);
			}
			fwrite(buffer, 1, strlen(buffer), f4);
		}
		fputs("]", f4);
		fclose(f4);
	}

	stemp = dir + "kumo.json";
	FILE* f5 = fopen(stemp.c_str(), "w");
	if (f5)
	{
		fputs("[", f5);

		for (int i = 0; i < m_size; i++)
		{
			memset(buffer, 0, sizeof(buffer));
			if (i == (m_size - 1))
			{
				sprintf(buffer, "{\"a\":%0.7f,\"b\":%0.7f}\n", m_kumo[i].a, m_kumo[i].b);
			}
			else
			{
				sprintf(buffer, "{\"a\":%0.7f,\"b\":%0.7f},\n", m_kumo[i].a, m_kumo[i].b);
			}



			fwrite(buffer, 1, strlen(buffer), f5);
		}
		fputs("]", f5);
		fclose(f5);
	}


	return SUCCESS;
}


