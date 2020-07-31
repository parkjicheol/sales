package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.SellVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface SellMapper {

    public List<SellVo> selectSellList(SellVo sellVo);
    public int selectSellListCount(SellVo sellVo);
    public SellVo selectSellDetail(SellVo sellVo);
    public int insertSellData(SellVo sellVo);
    public int updateSellData(SellVo sellVo);
    public int deleteSellData(Map seq);

}