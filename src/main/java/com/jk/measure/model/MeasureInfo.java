package com.jk.measure.model;

public class MeasureInfo {

    private int year;

    private String ganZhi;

    private String ganZhiInfo;

    private int age;

    private MeasureData sun;

    private MeasureData moon;

    public String getGanZhiInfo() {
        return ganZhiInfo;
    }

    public void setGanZhiInfo(String ganZhiInfo) {
        this.ganZhiInfo = ganZhiInfo;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getGanZhi() {
        return ganZhi;
    }

    public void setGanZhi(String ganZhi) {
        this.ganZhi = ganZhi;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public MeasureData getSun() {
        return sun;
    }

    public void setSun(MeasureData sun) {
        this.sun = sun;
    }

    public MeasureData getMoon() {
        return moon;
    }

    public void setMoon(MeasureData moon) {
        this.moon = moon;
    }
}
