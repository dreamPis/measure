package com.jk.measure.httpVo;

import java.util.List;

public class MeasurceAllDataInfoDetail {

    private List<String> wxInfo;
    private String zhenZhu;
    private String yueZhu;
    private String shiZhu;
    private String riZhu;
    private String jiZhu;
    private String nianZhu;

    private MeasurceCulRhy rhy;
    private MeasurceCulRhyInfo rhyDate;

    public MeasurceCulRhyInfo getRhyDate() {
        return rhyDate;
    }

    public void setRhyDate(MeasurceCulRhyInfo rhyDate) {
        this.rhyDate = rhyDate;
    }

    public List<String> getWxInfo() {
        return wxInfo;
    }

    public void setWxInfo(List<String> wxInfo) {
        this.wxInfo = wxInfo;
    }

    public String getZhenZhu() {
        return zhenZhu;
    }

    public void setZhenZhu(String zhenZhu) {
        this.zhenZhu = zhenZhu;
    }

    public String getYueZhu() {
        return yueZhu;
    }

    public void setYueZhu(String yueZhu) {
        this.yueZhu = yueZhu;
    }

    public String getShiZhu() {
        return shiZhu;
    }

    public void setShiZhu(String shiZhu) {
        this.shiZhu = shiZhu;
    }

    public String getRiZhu() {
        return riZhu;
    }

    public void setRiZhu(String riZhu) {
        this.riZhu = riZhu;
    }

    public String getJiZhu() {
        return jiZhu;
    }

    public void setJiZhu(String jiZhu) {
        this.jiZhu = jiZhu;
    }

    public String getNianZhu() {
        return nianZhu;
    }

    public void setNianZhu(String nianZhu) {
        this.nianZhu = nianZhu;
    }

    public MeasurceCulRhy getRhy() {
        return rhy;
    }

    public void setRhy(MeasurceCulRhy rhy) {
        this.rhy = rhy;
    }
}
