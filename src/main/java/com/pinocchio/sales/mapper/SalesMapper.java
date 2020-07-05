package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.SalesVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface SalesMapper {

    public List<SalesVo> selectSalesList(SalesVo salesVo);
    public int selectSalesListCount(SalesVo salesVo);
    public SalesVo selectSalesDetail(SalesVo salesVo);
    public SalesVo insertSalesData(SalesVo salesVo);

}