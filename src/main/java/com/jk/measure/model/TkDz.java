package com.jk.measure.model;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "measure")
@PropertySource(value = "classpath:measure.properties", ignoreResourceNotFound = true, encoding = "utf-8")
public class TkDz {

    private String tGyang;
    private String tGyin;
    private String dzYang;
    private String dzYin;
    private String dc;
    private String db;
    private String tk;
    private String tb;

    public String gettGyang() {
        return tGyang;
    }

    public void settGyang(String tGyang) {
        this.tGyang = tGyang;
    }

    public String gettGyin() {
        return tGyin;
    }

    public void settGyin(String tGyin) {
        this.tGyin = tGyin;
    }

    public String getDzYang() {
        return dzYang;
    }

    public void setDzYang(String dzYang) {
        this.dzYang = dzYang;
    }

    public String getDzYin() {
        return dzYin;
    }

    public void setDzYin(String dzYin) {
        this.dzYin = dzYin;
    }

    public String getDc() {
        return dc;
    }

    public void setDc(String dc) {
        this.dc = dc;
    }

    public String getDb() {
        return db;
    }

    public void setDb(String db) {
        this.db = db;
    }

    public String getTk() {
        return tk;
    }

    public void setTk(String tk) {
        this.tk = tk;
    }

    public String getTb() {
        return tb;
    }

    public void setTb(String tb) {
        this.tb = tb;
    }
}
