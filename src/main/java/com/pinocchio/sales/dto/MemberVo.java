package com.pinocchio.sales.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class MemberVo {

	private static final long serialVersionUID = -8198051207755152242L;
	
	private Integer memberSeq;
	private String id;
	private String pwd;
	private String memberName;
}
