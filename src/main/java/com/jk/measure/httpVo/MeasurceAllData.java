package com.jk.measure.httpVo;

import java.util.List;
import java.util.Map;

public class MeasurceAllData {

    private Map<String, Object> yinLiDate;

    private Map<String, Object> yangLiDate;

    private MeasurceAllDataInfo currentYearZhuData;

    private String sexFor;

    private List<MeasurceAllDataRhy> allRhy;

    public Map<String, Object> getYinLiDate() {
        return yinLiDate;
    }

    public void setYinLiDate(Map<String, Object> yinLiDate) {
        this.yinLiDate = yinLiDate;
    }

    public Map<String, Object> getYangLiDate() {
        return yangLiDate;
    }

    public void setYangLiDate(Map<String, Object> yangLiDate) {
        this.yangLiDate = yangLiDate;
    }

    public MeasurceAllDataInfo getCurrentYearZhuData() {
        return currentYearZhuData;
    }

    public void setCurrentYearZhuData(MeasurceAllDataInfo currentYearZhuData) {
        this.currentYearZhuData = currentYearZhuData;
    }

    public String getSexFor() {
        return sexFor;
    }

    public void setSexFor(String sexFor) {
        this.sexFor = sexFor;
    }

    public List<MeasurceAllDataRhy> getAllRhy() {
        return allRhy;
    }

    public void setAllRhy(List<MeasurceAllDataRhy> allRhy) {
        this.allRhy = allRhy;
    }
}
