package com.pinocchio.sales.service.impl;

import com.pinocchio.sales.dto.FabricVo;
import com.pinocchio.sales.mapper.FabricMapper;
import com.pinocchio.sales.service.FabricService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * <PRE>
 * 1. FileName	:	UserServiceImpl.java
 * 2. Comment	:	User 정보 조회
 * 3. 작성자	:	jcpark
 * 4. 작성일	:	2018. 8. 23.	오전 10:49:19
 * </PRE>
 *
 */
@Service("fabricService")
@Transactional
public class FabricServiceImpl implements FabricService {

	@Autowired
	FabricMapper fabricMapper;

	public List<FabricVo> getFabricList(FabricVo fabricVo) {
		return fabricMapper.selectFabricList(fabricVo);
	}

	public int getFabricListCount(FabricVo fabricVo) {
		return fabricMapper.selectFabricListCount(fabricVo);
	}

	public FabricVo getFabricDetail(FabricVo fabricVo) {
		return fabricMapper.selectFabricDetail(fabricVo);
	}

	public FabricVo setFabricData(FabricVo fabricVo) {
		return fabricMapper.insertFabricData(fabricVo);
	}

	public int deleteFabricData(Map seq) {
		return  fabricMapper.deleteFabricData(seq);
	}

	public int updateFabricData(FabricVo fabricVo){ return  fabricMapper.updateFabricData(fabricVo);}

}