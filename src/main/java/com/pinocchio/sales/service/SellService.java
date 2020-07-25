package com.pinocchio.sales.service;

import com.pinocchio.sales.dto.SellVo;

import java.util.List;

public interface SellService {

    public List<SellVo> getSellList(SellVo sellVo);
    public int getSellListCount(SellVo sellVo);
    public SellVo getSellDetail(SellVo sellVo);
    public int setSellData(SellVo sellVo);
    public int updateSellData(SellVo sellVo);

}