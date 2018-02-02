package com.jk.measure.model;

import java.util.List;

public class GlobalLocation {
    private Integer id;

    private Integer pid;

    private Integer level;

    private String path;

    private String code;

    private String areaNumber;

    private String areaPhoneNumber;

    private String abbreviation;

    private String iso;

    private String chineseName;

    private String englishName;

    private String pinyin;

    private List<GlobalLocation> globals;

    private String lng;

    private String lat;

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public List<GlobalLocation> getGlobals() {
        return globals;
    }

    public void setGlobals(List<GlobalLocation> globals) {
        this.globals = globals;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path == null ? null : path.trim();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getAreaNumber() {
        return areaNumber;
    }

    public void setAreaNumber(String areaNumber) {
        this.areaNumber = areaNumber == null ? null : areaNumber.trim();
    }

    public String getAreaPhoneNumber() {
        return areaPhoneNumber;
    }

    public void setAreaPhoneNumber(String areaPhoneNumber) {
        this.areaPhoneNumber = areaPhoneNumber == null ? null : areaPhoneNumber.trim();
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation == null ? null : abbreviation.trim();
    }

    public String getIso() {
        return iso;
    }

    public void setIso(String iso) {
        this.iso = iso == null ? null : iso.trim();
    }

    public String getChineseName() {
        return chineseName;
    }

    public void setChineseName(String chineseName) {
        this.chineseName = chineseName == null ? null : chineseName.trim();
    }

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName == null ? null : englishName.trim();
    }

    public String getPinyin() {
        return pinyin;
    }

    public void setPinyin(String pinyin) {
        this.pinyin = pinyin == null ? null : pinyin.trim();
    }
}