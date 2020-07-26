package com.pinocchio.sales.service;

import com.pinocchio.sales.dto.CollectVo;
import com.pinocchio.sales.dto.PurchaseVo;
import com.pinocchio.sales.dto.ReportVo;
import com.pinocchio.sales.dto.SalesVo;

import java.util.List;

public interface ReportService {

    public List<SalesVo> getSalesList(SalesVo salesVo);
    public SalesVo getSalesTotalList(SalesVo salesVo);
    public List<CollectVo> getCollectList(CollectVo collectVo);
    public int getCollectTotalPrice(CollectVo collectVo);
    public List<ReportVo> getPurchaseList(ReportVo reportVo);
    public ReportVo getPurchaseTotalList(ReportVo reportVo);

}