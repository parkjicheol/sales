package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.CollectVo;
import com.pinocchio.sales.dto.PurchaseVo;
import com.pinocchio.sales.dto.ReportVo;
import com.pinocchio.sales.dto.SalesVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ReportMapper {

    public List<SalesVo> selectSalesList(SalesVo salesVo);
    public SalesVo selectSalesTotalList(SalesVo salesVo);
    public List<CollectVo> selectCollectList(CollectVo CollectVo);
    public int selectCollectTotalPrice(CollectVo CollectVo);
    public List<ReportVo> selectPurchaseList(ReportVo reportVo);
    public ReportVo selectPurchaseTotalList(ReportVo reportVo);
    public List<ReportVo> selectMonthList(ReportVo reportVo);
    public ReportVo selectMonthTotalList(ReportVo reportVo);

}