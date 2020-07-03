package com.pinocchio.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pinocchio.sales.dto.UserVo;

/**
 * <PRE>
 * 1. FileName	:	UserMapper.java
 * 2. Comment	:	로그인 회원 관련 Mapper
 * 3. 작성자	:	jcpark
 * 4. 작성일	:	2018. 8. 27.	오후 1:17:28
 * </PRE>
 *
 */
@Mapper
@Repository
public interface UserMapper {
	
     /**
     * <PRE>
     * 1. MethodName	:	selectUser
     * 2. Comment		:	User 정보 조회
     * 3. 작성자		:	jcpark
     * 4. 작성일		:	2018. 8. 24.	오후 3:20:57
     * </PRE>
     *
     *	@param id
     *	@return
     */
    public UserVo selectUser(String id);
     
}