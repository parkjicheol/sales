package com.pinocchio.sales.service.impl;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pinocchio.sales.mapper.UserMapper;
import com.pinocchio.sales.dto.UserVo;
import com.pinocchio.sales.service.UserService;

/**
 * <PRE>
 * 1. FileName	:	UserServiceImpl.java
 * 2. Comment	:	User 정보 조회
 * 3. 작성자	:	jcpark
 * 4. 작성일	:	2018. 8. 23.	오전 10:49:19
 * </PRE>
 *
 */
@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	UserMapper userMapper;

	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetailsService#loadUserByUsername(java.lang.String)
	 */
	@SuppressWarnings("unused")
	@Override
	public UserDetails loadUserByUsername(final String id) throws UsernameNotFoundException {

		UserVo userVo = userMapper.selectUser(id);
		
		if (userVo == null) {
		    String[] ids = id.split("_");
		    
			throw new UsernameNotFoundException("회원정보를 확인할 수 없습니다.");
		}

		userVo.setRoles(Arrays.asList("ADMIN"));
        
		return userVo;
	}

}