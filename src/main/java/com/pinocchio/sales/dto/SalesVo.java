package com.pinocchio.sales.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SalesVo extends DefaultVo {

    private Long seq;
    private String saleDate;
    private Byte saleFlag;
    private Long fabricSeq;
    private String fabricNo;
    private String fabricName;
    private String section;
    private String color;
    private Float fabricCount;
    private Float deduction;
    private Float unit;
    private Float price;
    private Float tax;
    private Float delivery;
    private Float receivable;
    private String etc;
    private String orderNo;
    private String registerName;
    private String registerId;
    private String registerDate;

}
