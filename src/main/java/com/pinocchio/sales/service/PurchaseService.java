package com.pinocchio.sales.service;

import com.pinocchio.sales.dto.PurchaseVo;

import java.util.List;
import java.util.Map;

public interface PurchaseService {

    public List<PurchaseVo> getPurchaseList(PurchaseVo purchaseVo);
    public int getPurchaseListCount(PurchaseVo purchaseVo);
    public PurchaseVo getPurchaseDetail(PurchaseVo purchaseVo);
    public int setPurchaseData(PurchaseVo purchaseVo);
    public int updatePurchaseData(PurchaseVo purchaseVo);
    public int deletePurchaseData(Map seq);

}