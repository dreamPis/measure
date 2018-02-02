package com.jk.measure.vo;

import java.util.List;

public class MeasureViewInfo {

    private List<MeasureViewData> sun;
    private List<MeasureViewData> moon;


    public List<MeasureViewData> getSun() {
        return sun;
    }

    public void setSun(List<MeasureViewData> sun) {
        this.sun = sun;
    }

    public List<MeasureViewData> getMoon() {
        return moon;
    }

    public void setMoon(List<MeasureViewData> moon) {
        this.moon = moon;
    }

}
