package com.pinocchio.sales.service;

import com.pinocchio.sales.dto.FabricVo;

import java.util.List;
import java.util.Map;

public interface FabricService {

    public List<FabricVo> getFabricList(FabricVo fabricVo);
    public int getFabricListCount(FabricVo fabricVo);
    public FabricVo getFabricDetail(FabricVo fabricVo);
    public FabricVo setFabricData(FabricVo fabricVo);
    public int deleteFabricData(Map seq);

}