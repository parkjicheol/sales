package com.pinocchio.sales.mapper;

import com.pinocchio.sales.dto.CompanyVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface CompanyMapper {

    public List<CompanyVo> selectCompanyList(CompanyVo companyVo);
    public int selectCompanyListCount(CompanyVo companyVo);
    public CompanyVo selectCompanyDetail(CompanyVo companyVo);
    public int insertCompanyData(CompanyVo companyVo);
    public int deleteCompanyData(Map seq);
    public int updateCompanyData(CompanyVo companyVo);

}