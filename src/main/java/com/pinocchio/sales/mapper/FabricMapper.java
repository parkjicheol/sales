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
	
     /**
     * <PRE>
     * 1. MethodName	:	섬유정보리스트(전체)
     * 2. Comment		:	User 정보 조회
     * 3. 작성자		:	jcpark
     * 4. 작성일		:	2020. 7. 03.	오후 3:20:57
     * </PRE>
     *
     *	@param
     *	@return
     */
    public List<FabricVo> selectFabricListAll();

    public FabricVo insertFabricData(FabricVo fabricVo);

}