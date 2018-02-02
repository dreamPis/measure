package com.jk.measure.model;

import java.util.Map;

public class MeasureDataInfo {

    private String zhu;

    private String time;

    private int startYear;

    private Map<String, String> timeListInfo;

    public String getZhu() {
        return zhu;
    }

    public void setZhu(String zhu) {
        this.zhu = zhu;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getStartYear() {
        return startYear;
    }

    public void setStartYear(int startYear) {
        this.startYear = startYear;
    }

    public Map<String, String> getTimeListInfo() {
        return timeListInfo;
    }

    public void setTimeListInfo(Map<String, String> timeListInfo) {
        this.timeListInfo = timeListInfo;
    }
}
