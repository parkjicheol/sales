package com.pinocchio.sales.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CollectVo extends DefaultVo {

    private Long seq;
    private String collectDate; //수금일자
    private String collectType; //수금지급방법
    private String price; //수금액
    private String registerId; //등록아이디
    private String registerDate; // 등록일자
    private String state; //삭제여부

//    public String getRegisterDate(LocalDateTime registerDate) {
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
//        return simpleDateFormat.format(registerDate);
//    }
}
