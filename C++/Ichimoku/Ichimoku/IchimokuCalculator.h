#pragma once
#include "General.h"





class CIchimokuCalculator
{
private:
	int						TENKANSEN_PERIOD;
	int						KIJUNSEN_PERIOD;
	int						CHIKOUSPAN_PERIOD;
	int						SENKOUSPANB_PERIOD;
private:
	node_t*					m_tenkanSen;
	node_t*					m_kijunSen;
	node_t*					m_chikouSpan;
	SenkouSpan_t*			m_kumo;
	//////////////////////////////////////////////////
	std::vector<PriceData>	m_prices;
	int						m_size;
	//////////////////////////////////////////////////
	node_t					calculateTenkanSen(int currentIndex);
	node_t					calculateKijunSen(int currentIndex);
	node_t					calculateChikouSpan(int currentIndex);	
	node_t					calculateKumoA(int currentIndex);
	node_t					calculateKumoB(int currentIndex);

public:
							CIchimokuCalculator(const std::vector<PriceData>& priceData);
						   ~CIchimokuCalculator();
	int						SaveData();
	//////////////////////////////////////////////////

};

