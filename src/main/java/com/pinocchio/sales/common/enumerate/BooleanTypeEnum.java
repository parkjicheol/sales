package com.pinocchio.sales.common.enumerate;

import lombok.Getter;

@Getter
public enum BooleanTypeEnum {

    Y("1", true),
    N("0", false);

    private String value;
    private boolean isValue;

    private BooleanTypeEnum(String value, boolean isValue) {
        this.value = value;
        this.isValue = isValue;
    }

}
