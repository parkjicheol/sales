package com.pinocchio.sales.service.impl;

import com.pinocchio.sales.dto.SellVo;
import com.pinocchio.sales.mapper.SellMapper;
import com.pinocchio.sales.service.SellService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("sellService")
@Transactional
public class SellServiceImpl implements SellService {

	@Autowired
	SellMapper sellMapper;

	public List<SellVo> getSellList(SellVo sellVo) {
		return sellMapper.selectSellList(sellVo);
	}

	public int getSellListCount(SellVo sellVo) {
		return sellMapper.selectSellListCount(sellVo);
	}

	public SellVo getSellDetail(SellVo sellVo) {
		return sellMapper.selectSellDetail(sellVo);
	}

	public int setSellData(SellVo sellVo) {
		return sellMapper.insertSellData(sellVo);
	}

	public int updateSellData(SellVo sellVo) {
		return sellMapper.updateSellData(sellVo);
	}

}