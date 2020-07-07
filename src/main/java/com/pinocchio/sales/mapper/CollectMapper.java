package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.CollectVo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface CollectMapper {

    public List<CollectVo> selectCollectList(CollectVo CollectVo);
    public int selectCollectListCount(CollectVo CollectVo);
    public CollectVo selectCollectDetail(CollectVo CollectVo);
    /*public FabricVo insertFabricData(FabricVo fabricVo);
    public int deleteFabricData(Map seq);
    public int updateFabricData(FabricVo fabricVo);*/


}