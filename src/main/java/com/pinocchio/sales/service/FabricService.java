package com.pinocchio.sales.service;

import com.pinocchio.sales.dto.FabricVo;

import java.util.List;


/**
 * <PRE>
 * 1. FileName	:	UserService.java
 * 2. Comment	:	User 정보 조회
 * 3. 작성자	:	jcpark
 * 4. 작성일	:	2018. 8. 23.	오전 10:48:56
 * </PRE>
 *
 */
public interface FabricService {

    public List<FabricVo> getFabricList(FabricVo fabricVo);
    public int getFabricListCount(FabricVo fabricVo);
    public FabricVo getFabricDetail(FabricVo fabricVo);
    public FabricVo setFabricData(FabricVo fabricVo);

}