package com.pinocchio.sales.service.impl;

import com.pinocchio.sales.dto.SalesVo;
import com.pinocchio.sales.mapper.SalesMapper;
import com.pinocchio.sales.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <PRE>
 * 1. FileName	:	UserServiceImpl.java
 * 2. Comment	:	User 정보 조회
 * 3. 작성자	:	jcpark
 * 4. 작성일	:	2018. 8. 23.	오전 10:49:19
 * </PRE>
 *
 */
@Service("salesService")
@Transactional
public class SalesServiceImpl implements SalesService {

	@Autowired
	SalesMapper fabricMapper;

	public List<SalesVo> getSalesList(SalesVo salesVo) {
		return fabricMapper.selectSalesList(salesVo);
	}

	public int getSalesListCount(SalesVo salesVo) {
		return fabricMapper.selectSalesListCount(salesVo);
	}

	public SalesVo getSalesDetail(SalesVo salesVo) {
		return fabricMapper.selectSalesDetail(salesVo);
	}

	public SalesVo setSalesData(SalesVo salesVo) {
		return fabricMapper.insertSalesData(salesVo);
	}

}