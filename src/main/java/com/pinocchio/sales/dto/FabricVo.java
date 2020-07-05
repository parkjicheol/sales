package com.pinocchio.sales.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@ToString
public class FabricVo extends DefaultVo {

    private Long seq;
    private String fabricNo;
    private String fabricName;
    private String registerName;
    private String registerId;
    private String registerDate;

//    public String getRegisterDate(LocalDateTime registerDate) {
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
//        return simpleDateFormat.format(registerDate);
//    }
}
