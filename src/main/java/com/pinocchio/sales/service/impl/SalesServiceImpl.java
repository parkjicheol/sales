package com.pinocchio.sales.service.impl;

import com.pinocchio.sales.dto.SalesVo;
import com.pinocchio.sales.mapper.SalesMapper;
import com.pinocchio.sales.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("salesService")
@Transactional
public class SalesServiceImpl implements SalesService {

	@Autowired
	SalesMapper salesMapper;

	public List<SalesVo> getSalesList(SalesVo salesVo) {
		return salesMapper.selectSalesList(salesVo);
	}

	public int getSalesListCount(SalesVo salesVo) {
		return salesMapper.selectSalesListCount(salesVo);
	}

	public SalesVo getSalesDetail(SalesVo salesVo) {
		return salesMapper.selectSalesDetail(salesVo);
	}

	public int setSalesData(SalesVo salesVo) {
		return salesMapper.insertSalesData(salesVo);
	}

	public int updateSalesData(SalesVo salesVo) {
		return salesMapper.updateSalesData(salesVo);
	}

}