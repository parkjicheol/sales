package com.pinocchio.sales.service;

import com.pinocchio.sales.dto.FabricVo;

import java.util.List;

public interface FabricService {

    public List<FabricVo> getFabricList(FabricVo fabricVo);
    public int getFabricListCount(FabricVo fabricVo);
    public FabricVo getFabricDetail(FabricVo fabricVo);
    public FabricVo setFabricData(FabricVo fabricVo);

}