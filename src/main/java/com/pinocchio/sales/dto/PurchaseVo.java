package com.pinocchio.sales.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PurchaseVo extends DefaultVo {

    private Long seq;
    private String purchaseDate;
    private Long companySeq;
    private String companyNo;
    private String companyName;
    private Double total;
    private Double bank;
    private Double cash;
    private Byte billFlag;
    private Byte pageFlag;
    private String registerName;
    private String registerId;
    private String registerDate;

}
