package com.pinocchio.sales.dto;

import com.pinocchio.sales.common.enumerate.ExceptionTypeEnum;
import lombok.Data;

import java.util.Date;

@Data
public class ExceptionResponseVo {

    private String name;
    private String message;
    private String details;
    private String trace;
    private ExceptionTypeEnum exceptionTypeEnum;
    private Date date;

    public ExceptionResponseVo(String name, String message, String details, String trace, ExceptionTypeEnum exceptionTypeEnum, Date date) {
        this.name = name;
        this.message = message;
        this.details = details;
        this.trace = trace;
        this.exceptionTypeEnum = exceptionTypeEnum;
        this.date = date;
    }
}
