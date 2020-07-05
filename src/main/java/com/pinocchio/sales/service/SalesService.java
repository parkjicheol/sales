package com.pinocchio.sales.service;

import com.pinocchio.sales.dto.SalesVo;

import java.util.List;

public interface SalesService {

    public List<SalesVo> getSalesList(SalesVo salesVo);
    public int getSalesListCount(SalesVo salesVo);
    public SalesVo getSalesDetail(SalesVo salesVo);
    public SalesVo setSalesData(SalesVo salesVo);

}