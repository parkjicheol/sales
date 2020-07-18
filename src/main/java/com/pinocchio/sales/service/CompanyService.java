package com.pinocchio.sales.service;

import com.pinocchio.sales.dto.CompanyVo;

import java.util.List;
import java.util.Map;

public interface CompanyService {

    public List<CompanyVo> getCompanyList(CompanyVo companyVo);
    public int getCompanyListCount(CompanyVo companyVo);
    public CompanyVo getCompanyDetail(CompanyVo companyVo);
    public int setCompanyData(CompanyVo companyVo);
    public int deleteCompanyData(Map seq);
    public int updateCompanyData(CompanyVo companyVo);

}