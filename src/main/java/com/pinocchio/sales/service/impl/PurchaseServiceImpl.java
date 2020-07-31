package com.pinocchio.sales.service.impl;

import com.pinocchio.sales.dto.PurchaseVo;
import com.pinocchio.sales.mapper.PurchaseMapper;
import com.pinocchio.sales.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service("purchaseService")
@Transactional
public class PurchaseServiceImpl implements PurchaseService {

	@Autowired
	PurchaseMapper purchaseMapper;

	public List<PurchaseVo> getPurchaseList(PurchaseVo purchaseVo) {
		return purchaseMapper.selectPurchaseList(purchaseVo);
	}

	public int getPurchaseListCount(PurchaseVo purchaseVo) {
		return purchaseMapper.selectPurchaseListCount(purchaseVo);
	}

	public PurchaseVo getPurchaseDetail(PurchaseVo purchaseVo) {
		return purchaseMapper.selectPurchaseDetail(purchaseVo);
	}

	public int setPurchaseData(PurchaseVo purchaseVo) {
		return purchaseMapper.insertPurchaseData(purchaseVo);
	}

	public int updatePurchaseData(PurchaseVo purchaseVo) {
		return purchaseMapper.updatePurchaseData(purchaseVo);
	}

	public int deletePurchaseData(Map seq) { return purchaseMapper.deletePurchaseData(seq); }
}