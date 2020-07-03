package com.pinocchio.sales.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@ToString
public class FabricVo {

    private Long seq;
    private String fabricNo;
    private String fabricName;
    private LocalDateTime registerDate;

    public String getFormatRegisterDate() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd");
        return simpleDateFormat.format(registerDate);
    }
}
