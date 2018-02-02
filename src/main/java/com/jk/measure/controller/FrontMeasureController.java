package com.jk.measure.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Joiner;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.jk.measure.model.*;
import com.jk.measure.utils.*;
import com.jk.measure.utils.LunarConstant.*;
import com.jk.measure.service.AreaService;
import com.jk.measure.vo.MeasureViewData;
import com.jk.measure.vo.MeasureViewDataInfo;
import com.jk.measure.vo.MeasureViewInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.script.ScriptException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;
import java.util.stream.Collectors;

@Controller
public class FrontMeasureController {

    @Autowired
    private AreaService areaService;

    @Autowired
    private TkDz tkDz;

    @RequestMapping(value = "/measure", method = RequestMethod.GET)
    public String toPage(Model model){
        List<Area> list = areaService.getAreaByCountry();
        model.addAttribute("areas", list);
        return "index";
    }

    @RequestMapping(value = "measure", method = RequestMethod.POST)
    public String toSubmit(@ModelAttribute Measure measure, Model model) throws FileNotFoundException, ScriptException, NoSuchMethodException {
        model.addAttribute("measure", measure);
        return "jielv";
    }

    @RequestMapping(value = "getlon", method = RequestMethod.POST)
    @ResponseBody
    public List<Area> getLon(String name){
        List<Area> list;
        if("中国".equals(name)){
            list = areaService.getAreaByChina(name);
        }else{
            list = areaService.getAreaByOther(name);
        }
        return list;
    }

    @RequestMapping(value = "getcitylon", method = RequestMethod.POST)
    @ResponseBody
    public List<Area> getCityLon(String name){
        return areaService.getAreaCity(name);
    }

    private MeasureViewDataInfo getWxYyInfo(MeasureData measureData, String time, String tianGan){
        MeasureViewDataInfo dataInfo = new MeasureViewDataInfo();
        dataInfo.setYear(getWxYy(tianGan, measureData.getYear().getTimeListInfo().get(time)));
        dataInfo.setSeason(getWxYy(tianGan, measureData.getSeason().getTimeListInfo().get(time)));
        dataInfo.setMonth(getWxYy(tianGan, measureData.getMonth().getTimeListInfo().get(time)));
        dataInfo.setDay(getWxYy(tianGan, measureData.getDay().getTimeListInfo().get(time)));
        dataInfo.setZhen(getWxYy(tianGan, measureData.getZhen().getTimeListInfo().get(time)));
        dataInfo.setTime(getWxYy(tianGan, measureData.getTime().getTimeListInfo().get(time)));
        return dataInfo;
    }

    private MeasureViewDataInfo getWxYyFirstInfo(MeasureFirstDataInfo firstDataInfo){
        MeasureViewDataInfo dataInfo = new MeasureViewDataInfo();
        dataInfo.setYear(getWxYy(firstDataInfo.getDay(), firstDataInfo.getYear()));
        dataInfo.setSeason(getWxYy(firstDataInfo.getDay(), firstDataInfo.getSeason()));
        dataInfo.setMonth(getWxYy(firstDataInfo.getDay(), firstDataInfo.getMonth()));
        dataInfo.setDay(getWxYy(firstDataInfo.getDay(), firstDataInfo.getDay()));
        dataInfo.setZhen(getWxYy(firstDataInfo.getDay(), firstDataInfo.getZhen()));
        dataInfo.setTime(getWxYy(firstDataInfo.getDay(), firstDataInfo.getTime()));
        return dataInfo;
    }

    /**
     * 获取三合三会
     * @param zhi
     * @param gan
     * @param zhiList
     * @return
     */
    private String getSanHeSanHui(String zhi, String gan, Set<String> zhiList){
        Map<String, List<String>> wxZhi = Maps.newHashMap();
        String wxGan = null;
        Map<String, List<List<String>>> shsh = JSONObject.parseObject(MeasureUtil.SANHE_SANHUI, Map.class);
        Map<String, List<String>> tgwx = JSONObject.parseObject(MeasureUtil.TIAN_GAN_WU_X, Map.class);
        for (String key : shsh.keySet()) {
            List<List> list = JSONArray.parseArray(shsh.get(key).toString(), List.class);
            for (List list1 : list) {
                if(list1.contains(zhi) && zhiList.containsAll(list1)){
                    wxZhi.put(key, list1);
                }
            }
        }
        for (String key : tgwx.keySet()) {
            if(tgwx.get(key).contains(gan)){
                wxGan = key;
            }
        }
        List<String> shshStr = Lists.newArrayList();
        for (String key : wxZhi.keySet()) {
            if (key.equals(wxGan)){
                shshStr.add(Joiner.on("").join(wxZhi.get(key)) + key + "比局");
            }else{
                Map<String, List<String>> map = JSONObject.parseObject(MeasureUtil.WU_X_SHENG_KE, Map.class);
                for (String s : map.keySet()) {
                    List<String> list = map.get(s);
                    for (int i = 0; i < list.size(); i++) {
                        int next = i == (list.size() - 1) ? 0 : (i + 1);
                        int prev = i == 0 ? (list.size() - 1) : (i - 1);
                        if(list.get(i).equals(wxGan) && list.get(next).equals(key) && s.equals("s")){
                            shshStr.add(Joiner.on("").join(wxZhi.get(key)) + key + "食局");
                        }
                        if(list.get(i).equals(wxGan) && list.get(next).equals(key) && s.equals("k")){
                            shshStr.add(Joiner.on("").join(wxZhi.get(key)) + key + "财局");
                        }
                        if(list.get(i).equals(wxGan) && list.get(prev).equals(key) && s.equals("s")){
                            shshStr.add(Joiner.on("").join(wxZhi.get(key)) + key + "印局");
                        }
                        if(list.get(i).equals(wxGan) && list.get(prev).equals(key) && s.equals("k")){
                            shshStr.add(Joiner.on("").join(wxZhi.get(key)) + key + "官局");
                        }
                    }
                }
            }
        }
        return Joiner.on("").join(shshStr);
    }

    /**
     * 获取立春时间
     * @param year
     * @return
     */
    private String getLic(int year){
        LunarCalendar lunar = new LunarCalendar();
        List<String> list = Arrays.asList(lunar.qiCalc(year));
        list = list.parallelStream().filter(o -> o.contains("立春")).collect(Collectors.toList());
        String info = list.get(0);
        return info.split(" ")[0];
    }

    /**
     * 判断阴阳五行获取局关系
     * @param gan 要比较的主天干
     * @param zhenZhu 比较的阵柱节律
     * @return
     */
    private String getWxYy(String gan, String zhenZhu){
        WxYy tianGan = new WxYy();
        WxYy zhenTG = new WxYy();
        WxYy zhenDZ = new WxYy();
        Map<String, List<String>> tianGanWXMap = JSONObject.parseObject(MeasureUtil.TIAN_GAN_WU_X, Map.class);
        Map<String, List<String>> diZhiWXMap = JSONObject.parseObject(MeasureUtil.DI_ZHI_WU_X, Map.class);
        String tian = gan.substring(0, 1);
        String zhenGan = zhenZhu.substring(0, 1);
        String zhenZhi = zhenZhu.substring(1, 2);
        for (String key : tianGanWXMap.keySet()) {
            List<String> list = tianGanWXMap.get(key);
            if(list.contains(tian)){
                tianGan.setWx(key);
            }
        }
        for (String key : tianGanWXMap.keySet()) {
            List<String> list = tianGanWXMap.get(key);
            if(list.contains(zhenGan)){
                zhenTG.setWx(key);
            }
        }
        for (String key : diZhiWXMap.keySet()) {
            List<String> list = diZhiWXMap.get(key);
            if(list.contains(zhenZhi)){
                zhenDZ.setWx(key);
            }
        }
        Map<String, List<String>> tianGanYYMap = Maps.newHashMap();
        tianGanYYMap.put("阴", Arrays.asList(tkDz.gettGyin().split(",")));
        tianGanYYMap.put("阳", Arrays.asList(tkDz.gettGyang().split(",")));
        Map<String, List<String>> diZhiYYMap = Maps.newHashMap();
        diZhiYYMap.put("阴", Arrays.asList(tkDz.getDzYin().split(",")));
        diZhiYYMap.put("阳", Arrays.asList(tkDz.getDzYang().split(",")));
        for (String key : tianGanYYMap.keySet()) {
            List<String> list = tianGanYYMap.get(key);
            if(list.contains(tian)){
                tianGan.setYy(key);
            }
        }
        for (String key : tianGanYYMap.keySet()) {
            List<String> list = tianGanYYMap.get(key);
            if(list.contains(zhenGan)){
                zhenTG.setYy(key);
            }
        }
        for (String key : diZhiYYMap.keySet()) {
            List<String> list = diZhiYYMap.get(key);
            if(list.contains(zhenZhi)){
                zhenDZ.setYy(key);
            }
        }
        String first = getSk(tianGan, zhenTG);
        String tail = getSk(tianGan, zhenDZ);
        return first + zhenZhu + tail;
    }

    /**
     * 获取阴阳生克关系
     * @param wxYyTG
     * @param wxYyDz
     * @return
     */
    private String getSk(WxYy wxYyTG, WxYy wxYyDz){
        String res = null;
        if(wxYyTG.getWx().equals(wxYyDz.getWx())){
            if(wxYyTG.getYy().equals(wxYyDz.getYy())){
                res = "比";
            }else{
                res = "劫";
            }
        }else{
            Map<String, List<String>> map = JSONObject.parseObject(MeasureUtil.WU_X_SHENG_KE, Map.class);
            for (String key : map.keySet()) {
                List<String> list = map.get(key);
                for(int i = 0; i < list.size(); i++){
                    int next = i == (list.size() - 1)?0:(i + 1);
                    int prev = i == 0?(list.size() - 1):(i - 1);
                    if(list.get(i).equals(wxYyTG.getWx()) && list.get(next).equals(wxYyDz.getWx())
                            && wxYyTG.getYy().equals(wxYyDz.getYy()) && key.equals("s")){
                        res = "食";
                    }
                    if(list.get(i).equals(wxYyTG.getWx()) && list.get(next).equals(wxYyDz.getWx())
                            && wxYyTG.getYy().equals(wxYyDz.getYy()) && key.equals("k")){
                        res = "才";
                    }
                    if(list.get(i).equals(wxYyTG.getWx()) && list.get(prev).equals(wxYyDz.getWx())
                            && wxYyTG.getYy().equals(wxYyDz.getYy()) && key.equals("s")){
                        res = "枭";
                    }
                    if(list.get(i).equals(wxYyTG.getWx()) && list.get(prev).equals(wxYyDz.getWx())
                            && wxYyTG.getYy().equals(wxYyDz.getYy()) && key.equals("k")){
                        res = "杀";
                    }

                    if(list.get(i).equals(wxYyTG.getWx()) && list.get(next).equals(wxYyDz.getWx())
                            && !wxYyTG.getYy().equals(wxYyDz.getYy()) && key.equals("s")){
                        res = "伤";
                    }
                    if(list.get(i).equals(wxYyTG.getWx()) && list.get(next).equals(wxYyDz.getWx())
                            && !wxYyTG.getYy().equals(wxYyDz.getYy()) && key.equals("k")){
                        res = "财";
                    }
                    if(list.get(i).equals(wxYyTG.getWx()) && list.get(prev).equals(wxYyDz.getWx())
                            && !wxYyTG.getYy().equals(wxYyDz.getYy()) && key.equals("s")){
                        res = "印";
                    }
                    if(list.get(i).equals(wxYyTG.getWx()) && list.get(prev).equals(wxYyDz.getWx())
                            && !wxYyTG.getYy().equals(wxYyDz.getYy()) && key.equals("k")){
                        res = "官";
                    }
                }
            }
        }
        return res;
    }

    /**
     * 获取天克地冲
     * @param zhuGz 主干支
     * @param zhuInfo 副干支
     * @param isJv 是否是节律柱
     * @param isTime 主干支是否是时节律
     * @return
     */
    private String getTKDC(String zhuGz, String zhuInfo, boolean isJv, boolean isTime){
        String str1 = "";
        String str2 = "";
        List<String> diChong = Arrays.asList(MeasureUtil.DI_CHONG);
        WxYy tianGan = new WxYy();
        WxYy diGan = new WxYy();
        String zhuG = zhuGz.substring(0, 1);
        String zhuZ = zhuGz.substring(1, 2);
        String infoG = zhuInfo.substring(0, 1);
        String infoZ = zhuInfo.substring(1, 2);
        if(zhuZ.equals(infoZ)){
            str2 = "地比";
        }else{
            for (String s : diChong) {
                if (s.contains(zhuZ) && s.contains(infoZ)){
                    str2 = "地冲";
                }
            }
        }
        if(!"".equals(str2)){
            Map<String, List<String>> tianGanWXMap = JSONObject.parseObject(MeasureUtil.TIAN_GAN_WU_X, Map.class);
            for (String key : tianGanWXMap.keySet()) {
                List<String> list = tianGanWXMap.get(key);
                if(list.contains(zhuG)){
                    tianGan.setWx(key);
                    break;
                }
            }
            for (String key : tianGanWXMap.keySet()) {
                List<String> list = tianGanWXMap.get(key);
                if(list.contains(infoG)){
                    diGan.setWx(key);
                    break;
                }
            }
            Map<String, List<String>> tianGanYYMap = Maps.newHashMap();
            tianGanYYMap.put("阴", Arrays.asList(tkDz.gettGyin().split(",")));
            tianGanYYMap.put("阳", Arrays.asList(tkDz.gettGyang().split(",")));
            Map<String, List<String>> diZhiYYMap = Maps.newHashMap();
            diZhiYYMap.put("阴", Arrays.asList(tkDz.getDzYin().split(",")));
            diZhiYYMap.put("阳", Arrays.asList(tkDz.getDzYang().split(",")));
            for (String key : tianGanYYMap.keySet()) {
                List<String> list = tianGanYYMap.get(key);
                if(list.contains(zhuG)){
                    tianGan.setYy(key);
                }
            }
            for (String key : tianGanYYMap.keySet()) {
                List<String> list = tianGanYYMap.get(key);
                if(list.contains(infoG)){
                    diGan.setYy(key);
                }
            }
            if(tianGan.getYy().equals(diGan.getYy())){
                if(tianGan.getWx().equals(diGan.getWx())){
                    str1 = "天比";
                }else{
                    Map<String, List<String>> map = JSONObject.parseObject(MeasureUtil.WU_X_SHENG_KE, Map.class);

                    List<String> list = map.get("k");
                    for(int i = 0; i < list.size(); i++){
                        int next = i == (list.size() - 1)?0:(i + 1);
                        int prev = i == 0?(list.size() - 1):(i - 1);
                        if(list.get(i).equals(tianGan.getWx()) && list.get(next).equals(diGan.getWx())){
                            str1 = "天克";
                            break;
                        }
                        if(list.get(i).equals(tianGan.getWx()) && list.get(prev).equals(diGan.getWx())){
                            str1 = "天克";
                            break;
                        }
                    }
                }
            }
        }
        if(str1.equals("天比") && str2.equals("地比") && !isJv){
            return "同干";
        } else if(str1.equals("天比") && str2.equals("地比") && isTime){
            return "运临";
        } else if(!str1.equals("")){
            return str1 + str2;
        }else{
            return "";
        }
    }

    /**
     * 获取天克地冲
     * @param yyStr 阴阳生克关系
     * @param zhuGZ 主干支
     * @param gzInfo 干支实体
     * @param jvInfo 节律实体
     * @param temp 是否是时节律
     * @return
     * @throws IllegalAccessException
     */
    private String getTianKeDiCh(String yyStr,String zhuGZ, MeasureViewDataInfo gzInfo, MeasureViewDataInfo jvInfo, boolean temp) throws IllegalAccessException {
        String yearGz = getTKDC(zhuGZ, gzInfo.getYear().substring(1, 3), false, temp);
        String seasonGz = getTKDC(zhuGZ, gzInfo.getSeason().substring(1, 3), false, temp);
        String monthGz = getTKDC(zhuGZ, gzInfo.getMonth().substring(1, 3), false, temp);
        String dayGz = getTKDC(zhuGZ, gzInfo.getDay().substring(1, 3), false, temp);
        String zhenGz = getTKDC(zhuGZ, gzInfo.getZhen().substring(1, 3), false, temp);
        String timeGz = getTKDC(zhuGZ, gzInfo.getTime().substring(1, 3), false, temp);

        String yearJv = getTKDC(zhuGZ, jvInfo.getYear().substring(1, 3), true, temp);
        String seasonJv = getTKDC(zhuGZ, jvInfo.getSeason().substring(1, 3), true, temp);
        String monthJv = getTKDC(zhuGZ, jvInfo.getMonth().substring(1, 3), true, temp);
        String dayJv = getTKDC(zhuGZ, jvInfo.getDay().substring(1, 3), true, temp);
        String zhenJv = getTKDC(zhuGZ, jvInfo.getZhen().substring(1, 3), true, temp);
        String timeJv = getTKDC(zhuGZ, jvInfo.getTime().substring(1, 3), true, temp);

        if(yearGz.equals("") && seasonGz.equals("") && monthGz.equals("") && dayGz.equals("") && zhenGz.equals("") && timeGz.equals("")
                && yearJv.equals("") && seasonJv.equals("") && monthJv.equals("") && dayJv.equals("") && zhenJv.equals("") && timeGz.equals("")){
            return "";
        }else{
            return (!temp?"流年":"时律") + zhuGZ + "[" + yyStr + "]"
                    + (!yearGz.equals("")?"与年柱" + gzInfo.getYear().substring(1, 3)
                    + "[" + gzInfo.getYear().substring(0, 1) + gzInfo.getYear().substring(3, 4) + "]" + yearGz:"") + " "
                    + (!seasonGz.equals("")?"与季柱" + gzInfo.getSeason().substring(1, 3)
                    + "[" + gzInfo.getSeason().substring(0, 1) + gzInfo.getSeason().substring(3, 4) + "]" + seasonGz:"") + " "
                    + (!monthGz.equals("")?"与月柱" + gzInfo.getMonth().substring(1, 3)
                    + "[" + gzInfo.getMonth().substring(0, 1) + gzInfo.getMonth().substring(3, 4) + "]" + monthGz:"") + " "
                    + (!dayGz.equals("")?"与日柱" + gzInfo.getDay().substring(1, 3)
                    + "[" + gzInfo.getDay().substring(0, 1) + gzInfo.getDay().substring(3, 4) + "]" + dayGz:"") + " "
                    + (!zhenGz.equals("")?"与阵柱" + gzInfo.getZhen().substring(1, 3)
                    + "[" + gzInfo.getZhen().substring(0, 1) + gzInfo.getZhen().substring(3, 4) + "]" + zhenGz:"") + " "
                    + (!timeGz.equals("")?"与时柱" + gzInfo.getTime().substring(1, 3)
                    + "[" + gzInfo.getTime().substring(0, 1) + gzInfo.getTime().substring(3, 4) + "]" + timeGz:"") + " "
                    + (!yearJv.equals("")?"与年节律" + gzInfo.getYear().substring(1, 3)
                    + "[" + jvInfo.getYear().substring(0, 1) + jvInfo.getYear().substring(3, 4) + "]" + yearJv:"") + " "
                    + (!seasonJv.equals("")?"与季节律" + jvInfo.getSeason().substring(1, 3)
                    + "[" + jvInfo.getSeason().substring(0, 1) + jvInfo.getSeason().substring(3, 4) + "]" + seasonJv:"") + " "
                    + (!monthJv.equals("")?"与月节律" + jvInfo.getMonth().substring(1, 3)
                    + "[" + jvInfo.getMonth().substring(0, 1) + jvInfo.getMonth().substring(3, 4) + "]" + monthJv:"") + " "
                    + (!dayJv.equals("")?"与日节律" + jvInfo.getDay().substring(1, 3)
                    + "[" + jvInfo.getDay().substring(0, 1) + jvInfo.getDay().substring(3, 4) + "]" + dayJv:"") + " "
                    + (!zhenJv.equals("")?"与阵节律" + jvInfo.getZhen().substring(1, 3)
                    + "[" + jvInfo.getZhen().substring(0, 1) + jvInfo.getZhen().substring(3, 4) + "]" + zhenJv:"") + " "
                    + (!timeJv.equals("") && !temp?"与时节律" + jvInfo.getTime().substring(1, 3)
                    + "[" + jvInfo.getTime().substring(0, 1) + jvInfo.getTime().substring(3, 4) + "]" + timeJv:"");
        }
    }

    /**
     * 判断逆顺
     * @param ganZ 干支
     * @param sexEnum 性别
     * @return
     */
    private boolean getNS(String ganZ, SexEnum sexEnum) {
        String gan = ganZ.substring(0, 1);
        int index = 0;
        List<String> list;
        list = Arrays.asList(Obb.Gan);
        for (int i = 0; i < list.size(); i++) {
            if (gan.equals(list.get(i))) {
                index = i;
                break;
            }
        }
        return index % 2 == 0 && sexEnum.getIndex() == 0 || (index % 2 != 0 || sexEnum.getIndex() != 1) && (index % 2 != 1 || sexEnum.getIndex() != 0) && index % 2 == 1 && sexEnum.getIndex() == 1;
    }

    /**
     * 算宫位
     * @param yearGZ 干支年柱
     * @param dayGZ 干支日柱
     * @param startYear 出生年
     * @param endYear 测算年
     * @param sex 性别
     * @return
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     * @throws NoSuchFieldException
     */
    private MeasureViewDataInfo setHouseInfo(String yearGZ, String dayGZ, int startYear, int endYear, int sex) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, NoSuchFieldException {
        int v = endYear - startYear;
        int count = v/10;
        int index;
        String[] param = {"year", "season", "month", "day", "zhen", "time"};
        List<String> list = Arrays.asList(param);
        String[] houseM = {"祖父位", "父位", "哥弟位", "日主位", "儿位", "孙儿位"};
        String[] houseF = {"祖母位", "母位", "姐妹位", "配偶位", "女位", "孙女位"};
        List<String> houseMList = Arrays.asList(houseM);
        List<String> houseFList = Arrays.asList(houseF);
        MeasureViewDataInfo houseInfoM = new MeasureViewDataInfo();
        MeasureViewDataInfo houseInfoF = new MeasureViewDataInfo();
        SexEnum sexEnum;
        Class objectM = houseInfoM.getClass();
        for (int i = 0; i < houseMList.size(); i++) {
            String s = houseMList.get(i);
            if(s.equals("日主位")){
                sexEnum = SexEnum.getSexEnum(sex);
            }else{
                sexEnum = SexEnum.getSexEnum(0);
            }
            if(i < 3){
                if(getNS(yearGZ, sexEnum)){
                    index = i + count%6;
                    if(index > 5){
                        index = index - houseMList.size();
                    }
                    String val = list.get(index);
                    ReflectionUtils.setField(objectM, val, houseInfoM, s);
                }else{
                    index = i - count%6;
                    if(index < 0){
                        index = houseMList.size() - Math.abs(index);
                    }
                    String val = list.get(index);
                    ReflectionUtils.setField(objectM, val, houseInfoM, s);
                }
            }else{
                if(getNS(dayGZ, sexEnum)){
                    index = i + count%6;
                    if(index > 5){
                        index = index - houseMList.size();
                    }
                    String val = list.get(index);
                    ReflectionUtils.setField(objectM, val, houseInfoM, s);
                }else{
                    index = i - count%6;
                    if(index < 0){
                        index = houseMList.size() - Math.abs(index);
                    }
                    String val = list.get(index);
                    ReflectionUtils.setField(objectM, val, houseInfoM, s);
                }
            }
        }

        Class objectF = houseInfoF.getClass();
        for (int i = 0; i < houseFList.size(); i++) {
            String s = houseFList.get(i);
            if(s.equals("配偶位")){
                sexEnum = SexEnum.getSexEnum(sex==0?1:0);
            }else{
                sexEnum = SexEnum.getSexEnum(1);
            }
            if(i < 3){
                if(getNS(yearGZ, sexEnum)){
                    index = i + count%6;
                    if(index > 5){
                        index = index - houseMList.size();
                    }
                    String val = list.get(index);
                    ReflectionUtils.setField(objectF, val, houseInfoF, s);
                }else{
                    index = i - count%6;
                    if(index < 0){
                        index = houseMList.size() - Math.abs(index);
                    }
                    String val = list.get(index);
                    ReflectionUtils.setField(objectF, val, houseInfoF, s);
                }
            }else{
                if(getNS(dayGZ, sexEnum)){
                    index = i + count%6;
                    if(index > 5){
                        index = index - houseMList.size();
                    }
                    String val = list.get(index);
                    ReflectionUtils.setField(objectF, val, houseInfoF, s);
                }else{
                    index = i - count%6;
                    if(index < 0){
                        index = houseMList.size() - Math.abs(index);
                    }
                    String val = list.get(index);
                    ReflectionUtils.setField(objectF, val, houseInfoF, s);
                }
            }
        }
        MeasureViewDataInfo houseInfo = new MeasureViewDataInfo();
        houseInfo.setYear(houseInfoM.getYear() + "," + houseInfoF.getYear());
        houseInfo.setSeason(houseInfoM.getSeason() + "," + houseInfoF.getSeason());
        houseInfo.setMonth(houseInfoM.getMonth() + "," + houseInfoF.getMonth());
        houseInfo.setDay(houseInfoM.getDay() + "," + houseInfoF.getDay());
        houseInfo.setZhen(houseInfoM.getZhen() + "," + houseInfoF.getZhen());
        houseInfo.setTime(houseInfoM.getTime() + "," + houseInfoF.getTime());
        return houseInfo;
    }

    @RequestMapping(value = "searchYear",method = RequestMethod.POST)
    public String searchYear(Integer yearEnd, String data, String info, Integer sex, Integer startYear, Model model){
        List<MeasureInfo> list = JSONObject.parseArray(data, MeasureInfo.class);
        MeasureFirstInfo firstInfo = JSONObject.parseObject(info, MeasureFirstInfo.class);
        MeasureViewInfo viewInfo = new MeasureViewInfo();
        List<MeasureViewData> viewDataSun = Lists.newArrayList();
        List<MeasureViewData> viewDataMoon = Lists.newArrayList();
        String startTime = getLic(yearEnd);
        list.forEach((MeasureInfo o) -> {
            if(yearEnd == o.getYear()){
                MeasureViewDataInfo firstSunInfo = getWxYyFirstInfo(firstInfo.getSun());
                MeasureViewDataInfo firstMoonInfo = getWxYyFirstInfo(firstInfo.getMoon());

                //太阳
                List<String> keyListSun = Lists.newArrayList();
                MeasureData dataSun = o.getSun();
                keyListSun.addAll(dataSun.getYear().getTimeListInfo().keySet());
                keyListSun.sort(Comparator.comparing(String::toString));
                String firstStr = dataSun.getYear().getTimeListInfo().get(startTime) + ","
                        + dataSun.getSeason().getTimeListInfo().get(startTime) + ","
                        + dataSun.getMonth().getTimeListInfo().get(startTime) + ","
                        + dataSun.getDay().getTimeListInfo().get(startTime) + ","
                        + dataSun.getZhen().getTimeListInfo().get(startTime) + ","
                        + dataSun.getTime().getTimeListInfo().get(startTime);
                String firstTime = startTime;

                MeasureViewData data1 = new MeasureViewData();
                data1.setGanZhiInfo(firstSunInfo);
                data1.setJieLvTime(startTime);
                data1.setJieLvInfo(getWxYyInfo(dataSun, startTime, firstInfo.getSun().getDay()));
                data1.setJieLvStr(getWxYy(firstInfo.getSun().getDay(), o.getGanZhi()));
                viewDataSun.add(data1);
                for (String aKeyList1 : keyListSun) {
                    String culStr = dataSun.getYear().getTimeListInfo().get(aKeyList1) + ","
                            + dataSun.getSeason().getTimeListInfo().get(aKeyList1) + ","
                            + dataSun.getMonth().getTimeListInfo().get(aKeyList1) + ","
                            + dataSun.getDay().getTimeListInfo().get(aKeyList1) + ","
                            + dataSun.getZhen().getTimeListInfo().get(aKeyList1) + ","
                            + dataSun.getTime().getTimeListInfo().get(aKeyList1);
                    if (!firstStr.equals(culStr) && aKeyList1.compareTo(startTime) > 0) {
                        firstStr = culStr;
                        firstTime = aKeyList1;
                        MeasureViewData data2 = new MeasureViewData();
                        data2.setGanZhiInfo(firstSunInfo);
                        data2.setJieLvTime(firstTime);
                        data2.setJieLvInfo(getWxYyInfo(dataSun, aKeyList1, firstInfo.getSun().getDay()));
                        data2.setJieLvStr(getWxYy(firstInfo.getSun().getDay(), o.getGanZhi()));
                        viewDataSun.add(data2);
                    }
                }

                //月亮
                List<String> keyListMoon = Lists.newArrayList();
                MeasureData dataMoon = o.getMoon();
                keyListMoon.addAll(dataMoon.getYear().getTimeListInfo().keySet());
                keyListMoon.sort(Comparator.comparing(String::toString));
                firstStr = dataMoon.getYear().getTimeListInfo().get(startTime) + ","
                        + dataMoon.getSeason().getTimeListInfo().get(startTime) + ","
                        + dataMoon.getMonth().getTimeListInfo().get(startTime) + ","
                        + dataMoon.getDay().getTimeListInfo().get(startTime) + ","
                        + dataMoon.getZhen().getTimeListInfo().get(startTime) + ","
                        + dataMoon.getTime().getTimeListInfo().get(startTime);
                firstTime = startTime;

                MeasureViewData data3 = new MeasureViewData();
                data3.setGanZhiInfo(firstMoonInfo);
                data3.setJieLvTime(firstTime);
                data3.setJieLvInfo(getWxYyInfo(dataMoon, startTime, firstInfo.getMoon().getDay()));
                data3.setJieLvStr(getWxYy(firstInfo.getMoon().getDay(), o.getGanZhi()));
                viewDataMoon.add(data3);
                for (String aKeyList : keyListMoon) {
                    String culStr = dataMoon.getYear().getTimeListInfo().get(aKeyList) + ","
                            + dataMoon.getSeason().getTimeListInfo().get(aKeyList) + ","
                            + dataMoon.getMonth().getTimeListInfo().get(aKeyList) + ","
                            + dataMoon.getDay().getTimeListInfo().get(aKeyList) + ","
                            + dataMoon.getZhen().getTimeListInfo().get(aKeyList) + ","
                            + dataMoon.getTime().getTimeListInfo().get(aKeyList);
                    if (!firstStr.equals(culStr) && aKeyList.compareTo(startTime) > 0) {
                        firstStr = culStr;
                        firstTime = aKeyList;
                        MeasureViewData data2 = new MeasureViewData();
                        data2.setGanZhiInfo(firstMoonInfo);
                        data2.setJieLvTime(firstTime);
                        data2.setJieLvInfo(getWxYyInfo(dataMoon, aKeyList, firstInfo.getMoon().getDay()));
                        data2.setJieLvStr(getWxYy(firstInfo.getMoon().getDay(), o.getGanZhi()));
                        viewDataMoon.add(data2);
                    }
                }
            }
        });
        viewInfo.setMoon(viewDataMoon);
        List<MeasureViewData> viewData1 = viewDataSun.stream().peek(o -> {
            Set<String> set = Sets.newHashSet();
            set.add(o.getGanZhiInfo().getYear().substring(2, 3));
            set.add(o.getGanZhiInfo().getSeason().substring(2, 3));
            set.add(o.getGanZhiInfo().getMonth().substring(2, 3));
            set.add(o.getGanZhiInfo().getDay().substring(2, 3));
            set.add(o.getGanZhiInfo().getZhen().substring(2, 3));
            set.add(o.getGanZhiInfo().getTime().substring(2, 3));
            set.add(o.getJieLvInfo().getYear().substring(2, 3));
            set.add(o.getJieLvInfo().getSeason().substring(2, 3));
            set.add(o.getJieLvInfo().getMonth().substring(2, 3));
            set.add(o.getJieLvInfo().getDay().substring(2, 3));
            set.add(o.getJieLvInfo().getZhen().substring(2, 3));
            set.add(o.getJieLvInfo().getTime().substring(2, 3));
            set.add(o.getJieLvStr().substring(2, 3));
            MeasureViewDataInfo dataInfo = new MeasureViewDataInfo();
            String shYear = getSanHeSanHui(o.getJieLvInfo().getYear().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shSeason = getSanHeSanHui(o.getJieLvInfo().getSeason().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shMonth = getSanHeSanHui(o.getJieLvInfo().getMonth().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shDay = getSanHeSanHui(o.getJieLvInfo().getDay().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shZhen = getSanHeSanHui(o.getJieLvInfo().getZhen().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shTime = getSanHeSanHui(o.getJieLvInfo().getTime().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            dataInfo.setYear(shYear + ((shYear.contains(o.getJieLvStr().substring(2, 3)) || shYear.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setSeason(shSeason + ((shSeason.contains(o.getJieLvStr().substring(2, 3)) || shSeason.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setMonth(shMonth + ((shMonth.contains(o.getJieLvStr().substring(2, 3)) || shMonth.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setDay(shDay + ((shDay.contains(o.getJieLvStr().substring(2, 3)) || shDay.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setZhen(shZhen + ((shZhen.contains(o.getJieLvStr().substring(2, 3)) || shZhen.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setTime(shTime + ((shTime.contains(o.getJieLvStr().substring(2, 3)) || shTime.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));

            o.setViewShSh(dataInfo);
            String shsh = getSanHeSanHui(o.getJieLvStr().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            o.setShsh(shsh);
            try {
                o.setHouseInfo(setHouseInfo(firstInfo.getSun().getYear(), firstInfo.getSun().getDay(), startYear, yearEnd, sex));
            } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException | NoSuchFieldException e) {
                e.printStackTrace();
            }
            try {
                //年柱
                String str1 = getTianKeDiCh(o.getJieLvStr().substring(0, 1) + o.getJieLvStr().substring(3, 4),o.getJieLvStr().substring(1, 3), o.getGanZhiInfo(), o.getJieLvInfo(), false);
                //时节律
                String str2 = getTianKeDiCh(o.getJieLvInfo().getTime().substring(0, 1) + o.getJieLvInfo().getTime().substring(3, 4),o.getJieLvInfo().getTime().substring(1, 3), o.getGanZhiInfo(), o.getJieLvInfo(), true);
                o.setTianKeDiChong(o.getJieLvTime() + "\t" + o.getShsh() + "\t" + str1 + "\n" + str2);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }).collect(Collectors.toList());

        List<MeasureViewData> viewData2 = viewDataMoon.stream().peek(o -> {
            Set<String> set = Sets.newHashSet();
            set.add(o.getGanZhiInfo().getYear().substring(2, 3));
            set.add(o.getGanZhiInfo().getSeason().substring(2, 3));
            set.add(o.getGanZhiInfo().getMonth().substring(2, 3));
            set.add(o.getGanZhiInfo().getDay().substring(2, 3));
            set.add(o.getGanZhiInfo().getZhen().substring(2, 3));
            set.add(o.getGanZhiInfo().getTime().substring(2, 3));
            set.add(o.getJieLvInfo().getYear().substring(2, 3));
            set.add(o.getJieLvInfo().getSeason().substring(2, 3));
            set.add(o.getJieLvInfo().getMonth().substring(2, 3));
            set.add(o.getJieLvInfo().getDay().substring(2, 3));
            set.add(o.getJieLvInfo().getZhen().substring(2, 3));
            set.add(o.getJieLvInfo().getTime().substring(2, 3));
            set.add(o.getJieLvStr().substring(2, 3));
            MeasureViewDataInfo dataInfo = new MeasureViewDataInfo();
            String shYear = getSanHeSanHui(o.getJieLvInfo().getYear().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shSeason = getSanHeSanHui(o.getJieLvInfo().getSeason().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shMonth = getSanHeSanHui(o.getJieLvInfo().getMonth().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shDay = getSanHeSanHui(o.getJieLvInfo().getDay().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shZhen = getSanHeSanHui(o.getJieLvInfo().getZhen().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            String shTime = getSanHeSanHui(o.getJieLvInfo().getTime().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            dataInfo.setYear(shYear + ((shYear.contains(o.getJieLvStr().substring(2, 3)) || shYear.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setSeason(shSeason + ((shSeason.contains(o.getJieLvStr().substring(2, 3)) || shSeason.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setMonth(shMonth + ((shMonth.contains(o.getJieLvStr().substring(2, 3)) || shMonth.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setDay(shDay + ((shDay.contains(o.getJieLvStr().substring(2, 3)) || shDay.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setZhen(shZhen + ((shZhen.contains(o.getJieLvStr().substring(2, 3)) || shZhen.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));
            dataInfo.setTime(shTime + ((shTime.contains(o.getJieLvStr().substring(2, 3)) || shTime.contains(o.getJieLvInfo().getTime().substring(2, 3)))?"+":"-"));

            o.setViewShSh(dataInfo);
            String shsh = getSanHeSanHui(o.getJieLvStr().substring(2, 3), o.getGanZhiInfo().getDay().substring(1, 2), set);
            o.setShsh(shsh);
            try {
                o.setHouseInfo(setHouseInfo(firstInfo.getMoon().getYear(), firstInfo.getMoon().getDay(), startYear, yearEnd, sex));
            } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException | NoSuchFieldException e) {
                e.printStackTrace();
            }
            try {
                //年柱
                String str1 = getTianKeDiCh(o.getJieLvStr().substring(0, 1) + o.getJieLvStr().substring(3, 4),o.getJieLvStr().substring(1, 3), o.getGanZhiInfo(), o.getJieLvInfo(), false);
                //时节律
                String str2 = getTianKeDiCh(o.getJieLvInfo().getTime().substring(0, 1) + o.getJieLvInfo().getTime().substring(3, 4),o.getJieLvInfo().getTime().substring(1, 3), o.getGanZhiInfo(), o.getJieLvInfo(), true);
                o.setTianKeDiChong(o.getJieLvTime() + "\t" + o.getShsh() + "\t" + str1 + "\n" + str2);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }

        }).collect(Collectors.toList());

        viewInfo.setSun(viewData1);
        viewInfo.setMoon(viewData2);

        model.addAttribute("viewInfo", viewInfo);
        return "flowYear";
    }

}
