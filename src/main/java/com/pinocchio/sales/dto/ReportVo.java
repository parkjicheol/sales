package com.pinocchio.sales.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReportVo extends DefaultVo {

    private String year;
    private String month;
    private String yyyyMM;
    private String companyName;
    private Double sellTotal;
    private Double purchaseTotal;
    private Double percent;
    private Double emptyPrice;
}
