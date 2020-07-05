package com.pinocchio.sales.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DefaultVo {

    private Integer start = 0;
    private Integer length = 20;
    private String searchKeyword = "";
    private String searchField = "";
    private Boolean bRunning = true;
    private String startDate = "";
    private String finishDate = "";

}
