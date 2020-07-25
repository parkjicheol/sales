package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.PurchaseVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PurchaseMapper {

    public List<PurchaseVo> selectPurchaseList(PurchaseVo purchaseVo);
    public int selectPurchaseListCount(PurchaseVo purchaseVo);
    public PurchaseVo selectPurchaseDetail(PurchaseVo purchaseVo);
    public int insertPurchaseData(PurchaseVo purchaseVo);
    public int updatePurchaseData(PurchaseVo purchaseVo);

}