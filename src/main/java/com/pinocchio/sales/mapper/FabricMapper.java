package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.FabricVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface FabricMapper {

    public List<FabricVo> selectFabricList(FabricVo fabricVo);
    public int selectFabricListCount(FabricVo fabricVo);
    public FabricVo selectFabricDetail(FabricVo fabricVo);
    public FabricVo insertFabricData(FabricVo fabricVo);

}