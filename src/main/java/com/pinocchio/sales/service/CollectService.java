package com.pinocchio.sales.service;

import com.pinocchio.sales.dto.CollectVo;


import java.util.List;
import java.util.Map;

public interface CollectService {

    public List<CollectVo> getCollectList(CollectVo collectVo);
    public int getCollectListCount(CollectVo collectVo);
    public CollectVo getCollectDetail(CollectVo collectVo);
    public int setCollectData(CollectVo collectVo);
    public int deleteCollectData(Map seq);
    public int updateCollectData(CollectVo collectVo);

}