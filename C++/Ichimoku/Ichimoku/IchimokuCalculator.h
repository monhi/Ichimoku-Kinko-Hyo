#pragma once
#include "General.h"





class CIchimokuCalculator
{
private:
	int						TENKANSEN_PERIOD;
	int						KIJUNSEN_PERIOD;
private:
	node_t*					m_tenkanSen;
	node_t*					m_kijunSen;
	//////////////////////////////////////////////////
	std::vector<PriceData>	m_prices;
	int						m_size;
	//////////////////////////////////////////////////
	node_t					calculateTenkanSen(int currentIndex);
	node_t					calculateKijunSen(int currentIndex);
	
public:
							CIchimokuCalculator(const std::vector<PriceData>& priceData);
						   ~CIchimokuCalculator();
	int						SaveData();
	//////////////////////////////////////////////////

};

