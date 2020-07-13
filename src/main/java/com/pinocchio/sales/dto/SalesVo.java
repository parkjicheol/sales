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
    private Byte saleFlag = 0;
    private Long fabricSeq;
    private String fabricNo = "";
    private String fabricName = "";
    private String color;
    private Double section;
    private Double fabricCount;
    private Double deduction;
    private Double unit;
    private Double price;
    private Double tax;
    private Double delivery;
    private Double receivable;
    private String etc;
    private String orderNo;
    private String registerName;
    private String registerId;
    private String registerDate;

}
