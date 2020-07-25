package com.pinocchio.sales.dto;

import com.pinocchio.sales.dto.DefaultVo;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SellVo extends DefaultVo {

    private Long seq;
    private String sellDate;
    private Long companySeq;
    private String companyNo;
    private String companyName;
    private Double price;
    private Double publish;
    private Double deposit;
    private String registerName;
    private String registerId;
    private String registerDate;

}
