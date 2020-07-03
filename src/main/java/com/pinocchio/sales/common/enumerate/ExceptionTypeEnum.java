package com.pinocchio.sales.common.enumerate;

import lombok.Getter;

@Getter
public enum ExceptionTypeEnum {

    SQL("code"),
    SERVER("server"),
    NH("nh"),
    IO("io"),
    DATA_NOT_FOUND("data not found"),
    RESOURCE_NOT_FOUND("resource not found");

    private final String exception;

    private ExceptionTypeEnum(String exception) {
        this.exception = exception;
    }

}