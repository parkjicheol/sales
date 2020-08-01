package com.pinocchio.sales.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CompanyVo extends DefaultVo {

    private Long seq;
    private String companyNo = "";
    private String companyName;
    private String companyLicense = "";
    private String fileName;
    private String registerId;
    private String registerDate;

//    public String getRegisterDate(LocalDateTime registerDate) {
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
//        return simpleDateFormat.format(registerDate);
//    }
}
