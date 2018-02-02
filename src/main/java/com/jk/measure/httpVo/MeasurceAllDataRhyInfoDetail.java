package com.jk.measure.httpVo;

import java.util.Map;

public class MeasurceAllDataRhyInfoDetail {

    private Map<String, Object> timeListInfo;
    private String zhu;
    private Integer startYear;
    private String time;

    public Map<String, Object> getTimeListInfo() {
        return timeListInfo;
    }

    public void setTimeListInfo(Map<String, Object> timeListInfo) {
        this.timeListInfo = timeListInfo;
    }

    public String getZhu() {
        return zhu;
    }

    public void setZhu(String zhu) {
        this.zhu = zhu;
    }

    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
