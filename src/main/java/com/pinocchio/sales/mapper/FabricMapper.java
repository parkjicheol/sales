package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.FabricVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface FabricMapper {

    public List<FabricVo> selectFabricList(FabricVo fabricVo);
    public int selectFabricListCount(FabricVo fabricVo);
    public FabricVo selectFabricDetail(FabricVo fabricVo);
    public FabricVo insertFabricData(FabricVo fabricVo);
    public int deleteFabricData(Map seq);
    public int updateFabricData(FabricVo fabricVo);


}