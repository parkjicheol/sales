package com.pinocchio.sales.service.impl;

import com.pinocchio.sales.dto.CollectVo;
import com.pinocchio.sales.dto.SalesVo;
import com.pinocchio.sales.mapper.ReportMapper;
import com.pinocchio.sales.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("reportService")
@Transactional
public class ReportServiceImpl implements ReportService {

	@Autowired
	ReportMapper reportMapper;

	public List<SalesVo> getSalesList(SalesVo salesVo) {
		return reportMapper.selectSalesList(salesVo);
	}
	public SalesVo getSalesTotalList(SalesVo salesVo) {
		return reportMapper.selectSalesTotalList(salesVo);
	}
	public List<CollectVo> getCollectList(CollectVo collectVo) { return reportMapper.selectCollectList(collectVo); }
	public int getCollectTotalPrice(CollectVo collectVo) {
		return reportMapper.selectCollectTotalPrice(collectVo);
	}
}