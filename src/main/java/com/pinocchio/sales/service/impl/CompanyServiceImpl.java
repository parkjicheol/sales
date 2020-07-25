package com.pinocchio.sales.service.impl;

import com.pinocchio.sales.dto.CompanyVo;
import com.pinocchio.sales.mapper.CompanyMapper;
import com.pinocchio.sales.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * <PRE>
 * 1. FileName	:	UserServiceImpl.java
 * 2. Comment	:	User 정보 조회
 * 3. 작성자	:	jcpark
 * 4. 작성일	:	2018. 8. 23.	오전 10:49:19
 * </PRE>
 *
 */
@Service("companyService")
@Transactional
public class CompanyServiceImpl implements CompanyService {

	@Autowired
	CompanyMapper companyMapper;

	public List<CompanyVo> getCompanyList(CompanyVo companyVo) {
		return companyMapper.selectCompanyList(companyVo);
	}

	public int getCompanyListCount(CompanyVo companyVo) {
		return companyMapper.selectCompanyListCount(companyVo);
	}

	public CompanyVo getCompanyDetail(CompanyVo companyVo) {
		return companyMapper.selectCompanyDetail(companyVo);
	}

	public int setCompanyData(CompanyVo companyVo) {
		return companyMapper.insertCompanyData(companyVo);
	}

	public int deleteCompanyData(Map seq) {
		return  companyMapper.deleteCompanyData(seq);
	}

	public int updateCompanyData(CompanyVo companyVo){ return  companyMapper.updateCompanyData(companyVo);}

}