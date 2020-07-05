package com.pinocchio.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pinocchio.sales.dto.UserVo;

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