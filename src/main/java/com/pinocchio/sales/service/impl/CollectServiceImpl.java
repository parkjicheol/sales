package com.pinocchio.sales.service.impl;

import com.pinocchio.sales.dto.CollectVo;
import com.pinocchio.sales.mapper.CollectMapper;
import com.pinocchio.sales.service.CollectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * <PRE>
 * 1. FileName	:	UserServiceImpl.java
 * 2. Comment	:	User 정보 조회
 * 3. 작성자	:	jhkim
 * 4. 작성일	:	2018. 8. 23.	오전 10:49:19
 * </PRE>
 *
 */
@Service("collectService")
@Transactional
public class CollectServiceImpl implements CollectService {

	@Autowired
	CollectMapper collectMapper;

	public List<CollectVo> getCollectList(CollectVo collectVo) {
		return collectMapper.selectCollectList(collectVo);
	}

	public int getCollectListCount(CollectVo collectVo) {
		return collectMapper.selectCollectListCount(collectVo);
	}

	public CollectVo getCollectDetail(CollectVo collectVo){
		return collectMapper.selectCollectDetail(collectVo);
	}
/*
	public FabricVo setFabricData(FabricVo fabricVo) {
		return fabricMapper.insertFabricData(fabricVo);
	}

	public int deleteFabricData(Map seq) {
		return  fabricMapper.deleteFabricData(seq);
	}

	public int updateFabricData(FabricVo fabricVo){ return  fabricMapper.updateFabricData(fabricVo);}*/

}