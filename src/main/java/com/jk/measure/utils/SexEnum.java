package com.jk.measure.utils;

public enum SexEnum {
    SEX_ENUM_M(0, "男"), SEX_ENUM_F(1, "女"),
    ;

    private int index;

    private String sex;

    SexEnum(int index, String sex) {
        this.index = index;
        this.sex = sex;
    }

    public static SexEnum getSexEnum(int index){
        for (SexEnum sexEnum : SexEnum.values()) {
            if(sexEnum.getIndex() == index){
                return sexEnum;
            }
        }
        return null;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
