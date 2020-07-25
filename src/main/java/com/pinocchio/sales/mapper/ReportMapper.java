package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.CollectVo;
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
}