package com.pinocchio.sales.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pinocchio.sales.service.LoginService;

@Service("loginService")
@Transactional
public class LoginServiceImpl implements LoginService {
	
//	@Autowired
//	UserMapper userMapper;
//	
//	@Autowired
//	EmmaMapper smsMapper;
//
//	@Override
//	public UserVO selectUser(final String loginId) {
//		// TODO Auto-generated method stub
//		return userMapper.selectUser(loginId);
//	}
//	
//	@Override
//	public List<String> selectAuthority(final String loginId) {
//		// TODO Auto-generated method stub
//		return userMapper.selectAuthority(loginId);
//	}	

}
