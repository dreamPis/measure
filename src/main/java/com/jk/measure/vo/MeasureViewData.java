package com.jk.measure.vo;

public class MeasureViewData {

    private String jieLvStr;

    private MeasureViewDataInfo ganZhiInfo;

    private String jieLvTime;

    private MeasureViewDataInfo jieLvInfo;

    private String shsh;

    private MeasureViewDataInfo viewShSh;

    private String tianKeDiChong;

    private MeasureViewDataInfo houseInfo;

    public MeasureViewDataInfo getHouseInfo() {
        return houseInfo;
    }

    public void setHouseInfo(MeasureViewDataInfo houseInfo) {
        this.houseInfo = houseInfo;
    }

    public String getTianKeDiChong() {
        return tianKeDiChong;
    }

    public void setTianKeDiChong(String tianKeDiChong) {
        this.tianKeDiChong = tianKeDiChong;
    }

    public MeasureViewDataInfo getViewShSh() {
        return viewShSh;
    }

    public void setViewShSh(MeasureViewDataInfo viewShSh) {
        this.viewShSh = viewShSh;
    }

    public String getShsh() {
        return shsh;
    }

    public void setShsh(String shsh) {
        this.shsh = shsh;
    }

    public String getJieLvStr() {
        return jieLvStr;
    }

    public void setJieLvStr(String jieLvStr) {
        this.jieLvStr = jieLvStr;
    }

    public String getJieLvTime() {
        return jieLvTime;
    }

    public void setJieLvTime(String jieLvTime) {
        this.jieLvTime = jieLvTime;
    }

    public MeasureViewDataInfo getGanZhiInfo() {
        return ganZhiInfo;
    }

    public void setGanZhiInfo(MeasureViewDataInfo ganZhiInfo) {
        this.ganZhiInfo = ganZhiInfo;
    }

    public MeasureViewDataInfo getJieLvInfo() {
        return jieLvInfo;
    }

    public void setJieLvInfo(MeasureViewDataInfo jieLvInfo) {
        this.jieLvInfo = jieLvInfo;
    }
}
