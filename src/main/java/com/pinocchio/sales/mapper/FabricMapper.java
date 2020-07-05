package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.FabricVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <PRE>
 * 1. FileName	:	FabricMapper.java
 * 2. Comment	:	로그인 회원 관련 Mapper
 * 3. 작성자	:	jhkim
 * 4. 작성일	:	2020. 7. 03.	오후 1:17:28
 * </PRE>
 *
 */
@Mapper
@Repository
public interface FabricMapper {

    public List<FabricVo> selectFabricList(FabricVo fabricVo);
    public int selectFabricListCount(FabricVo fabricVo);
    public FabricVo selectFabricDetail(FabricVo fabricVo);
    public FabricVo insertFabricData(FabricVo fabricVo);

}