var rhythmList = null;
var rhythmOne = {};
function refList(){
    var startVal = Number($("select[name=startYear]").val());
    var endVal = Number($("select[name=endYear]").val());
    var list = [];
    for(var i = 0; i < rhythmList.length; i++){
        if(rhythmList[i].year >= startVal && rhythmList[i].year <= endVal){
            list.push(rhythmList[i]);
        }
    }

    var contentInfo = "";
    for(var m = 0; m < list.length; m++){
        var YZ = list[m].ganZhi.substr(1, 1);
        var ganSunF = rhythmOne.str4.substr(0, 1);
        var zhiSunF = [rhythmOne.str1.substr(1, 1), rhythmOne.jizStr.substr(1, 1), rhythmOne.str3.substr(1, 1), rhythmOne.str4.substr(1, 1), rhythmOne.zhenStr.substr(1, 1), rhythmOne.str5.substr(1, 1), list[m].sun.year.zhu.substr(1, 1), list[m].sun.season.zhu.substr(1, 1), list[m].sun.month.zhu.substr(1, 1), list[m].sun.day.zhu.substr(1, 1), list[m].sun.zhen.zhu.substr(1, 1), list[m].sun.time.zhu.substr(1, 1), list[m].ganZhi.substr(1, 1)];
        var SZ_S = list[m].sun.time.zhu.substr(1, 1);
        var sunInfo = getYinByZhiForYear(ganSunF, zhiSunF, YZ, SZ_S);

        var ganMoonF = rhythmOne.str7.substr(0, 1);
        var zhiMoonF = [rhythmOne.str1.substr(1, 1), rhythmOne.jizStr.substr(1, 1), rhythmOne.str3.substr(1, 1), rhythmOne.str7.substr(1, 1), rhythmOne.str9.substr(1, 1), rhythmOne.str8.substr(1, 1), list[m].moon.year.zhu.substr(1, 1), list[m].moon.season.zhu.substr(1, 1), list[m].moon.month.zhu.substr(1, 1), list[m].moon.day.zhu.substr(1, 1), list[m].moon.zhen.zhu.substr(1, 1), list[m].moon.time.zhu.substr(1, 1), list[m].ganZhi.substr(1, 1)];
        var SZ_M = list[m].moon.time.zhu.substr(1, 1);
        var moonInfo = getYinByZhiForYear(ganMoonF, zhiMoonF, YZ, SZ_M);
        contentInfo += "<div>"+list[m].year+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+list[m].ganZhi+"年 "+list[m].age+"岁</div><div>太阳</div>" +
            "<div><table style=\"width: 100%\"><thead><tr><td style=\"width: 10%\">柱</td>" +
            "<td style=\"width: 10%\">干支</td><td style=\"width: 10%\">节律干支</td>" +
            "<td style=\"width: 70%\">时间</td></tr></thead><tbody><tr><td>年柱</td>" +
            "<td>"+rhythmOne.str1+"</td><td>"+list[m].sun.year.zhu+"</td>" +
            "<td>"+list[m].sun.year.startYear+"---"+list[m].sun.year.time+"</td></tr>" +
            "<tr><td>季柱</td><td>"+rhythmOne.jizStr+"</td><td>"+list[m].sun.season.zhu+"</td>" +
            "<td>"+list[m].sun.season.startYear+"---"+list[m].sun.season.time+"</td></tr><tr>" +
            "<td>月柱</td><td>"+rhythmOne.str3+"</td><td>"+list[m].sun.month.zhu+"</td>" +
            "<td>"+list[m].sun.month.startYear+"---"+list[m].sun.month.time+"</td></tr>" +
            "<tr><td>日柱</td><td>"+rhythmOne.str4+"</td><td>"+list[m].sun.day.zhu+"</td>" +
            "<td>"+list[m].sun.day.startYear+"---"+list[m].sun.day.time+"</td></tr><tr>" +
            "<td>阵柱</td><td>"+rhythmOne.zhenStr+"</td><td>"+list[m].sun.zhen.zhu+"</td>" +
            "<td>"+list[m].sun.zhen.startYear+"---"+list[m].sun.zhen.time+"</td></tr>" +
            "<tr><td>时柱</td><td>"+rhythmOne.str5+"</td><td>"+list[m].sun.time.zhu+"</td>" +
            "<td>"+list[m].sun.time.startYear+"---"+list[m].sun.time.time+"</td></tr></tbody>" +
            "</table></div>";

        contentInfo += "<div style='width: 800px;'><table style='width: 100%'><thead><tr>";
        for(var o = 0; o < list[m].sun.timeList.length; o++){
            contentInfo += "<td style='width: 12%'>"+list[m].sun.timeList[o]+"</td>"
        }
        contentInfo += "</tr></thead><tbody>";
        contentInfo += "<tr>";
        for(var p = 0; p < list[m].sun.timeList.length; p++){
            contentInfo += "<td>"+list[m].sun.year.timeListInfo[list[m].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].sun.timeList.length; p++){
            contentInfo += "<td>"+list[m].sun.season.timeListInfo[list[m].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].sun.timeList.length; p++){
            contentInfo += "<td>"+list[m].sun.month.timeListInfo[list[m].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].sun.timeList.length; p++){
            contentInfo += "<td>"+list[m].sun.day.timeListInfo[list[m].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].sun.timeList.length; p++){
            contentInfo += "<td>"+list[m].sun.zhen.timeListInfo[list[m].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].sun.timeList.length; p++){
            contentInfo += "<td>"+list[m].sun.time.timeListInfo[list[m].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "</tbody></table></div>";

        contentInfo += "<div>月亮</div><div><table style=\"width: 100%\"><thead><tr>" +
            "<td style=\"width: 10%\">柱</td><td style=\"width: 10%\">干支</td>" +
            "<td style=\"width: 10%\">节律干支</td><td style=\"width: 70%\">时间</td></tr></thead>" +
            "<tbody><tr><td>年柱</td><td>"+rhythmOne.str1+"</td><td>"+list[m].moon.year.zhu+"</td>" +
            "<td>"+list[m].moon.year.startYear+"---"+list[m].moon.year.time+"</td></tr><tr>" +
            "<td>季柱</td><td>"+rhythmOne.jizStr+"</td><td>"+list[m].moon.season.zhu+"</td>" +
            "<td>"+list[m].moon.season.startYear+"---"+list[m].moon.season.time+"</td></tr>" +
            "<tr><td>月柱</td><td>"+rhythmOne.str3+"</td><td>"+list[m].moon.month.zhu+"</td>" +
            "<td>"+list[m].moon.month.startYear+"---"+list[m].moon.month.time+"</td></tr><tr>" +
            "<td>日柱</td><td>"+rhythmOne.str7+"</td><td>"+list[m].moon.day.zhu+"</td>" +
            "<td>"+list[m].moon.day.startYear+"---"+list[m].moon.day.time+"</td></tr>" +
            "<tr><td>阵柱</td><td>"+rhythmOne.str9+"</td><td>"+list[m].moon.zhen.zhu+"</td>" +
            "<td>"+list[m].moon.zhen.startYear+"---"+list[m].moon.zhen.time+"</td></tr>" +
            "<tr><td>时柱</td><td>"+rhythmOne.str8+"</td><td>"+list[m].moon.time.zhu+"</td>" +
            "<td>"+list[m].moon.time.startYear+"---"+list[m].moon.time.time+"</td></tr>" +
            "</tbody></table></div>";

        contentInfo += "<div style='width: 800px;'><table style='width: 100%'><thead><tr>";
        for(o = 0; o < list[m].moon.timeList.length; o++){
            contentInfo += "<td style='width: 12%'>"+list[m].moon.timeList[o]+"</td>"
        }
        contentInfo += "</tr></thead><tbody>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].moon.timeList.length; p++){
            contentInfo += "<td>"+list[m].moon.year.timeListInfo[list[m].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].moon.timeList.length; p++){
            contentInfo += "<td>"+list[m].moon.season.timeListInfo[list[m].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].moon.timeList.length; p++){
            contentInfo += "<td>"+list[m].moon.month.timeListInfo[list[m].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].moon.timeList.length; p++){
            contentInfo += "<td>"+list[m].moon.day.timeListInfo[list[m].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].moon.timeList.length; p++){
            contentInfo += "<td>"+list[m].moon.zhen.timeListInfo[list[m].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < list[m].moon.timeList.length; p++){
            contentInfo += "<td>"+list[m].moon.time.timeListInfo[list[m].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "</tbody></table></div>";

        contentInfo += "<div style='width: 800px;'>" + "太阳：" + sunInfo.join(",") +
            "</div>" +
            "<div style='width: 800px;'>" + "月亮：" + moonInfo.join(",") +
            "</div>" +
            "<div>-------------------------------------------------------------------</div>";
    }
    $("#content").empty().append(contentInfo);
}
function startChange(e){
    var endVal = Number($("select[name=endYear]").val());
    var val = Number($(e).val());
    if(val > endVal){
        $("select[name=startYear]").val(val);
    }
}
function endChange(e){
    var startVal = Number($("select[name=startYear]").val());
    var val = Number($(e).val());
    if(val < startVal){
        $("select[name=startYear]").val(val);
    }
}
$(function(){
    var year= dataYear;
    var month=dataMonth;
    var day= dataDay;
    var time= dataTime;
    var lon = datalon;
    var ob = bazi(year, month, day, time, lon);
    if(time.split(":").length < 3){
        time = time + ":00";
    }
    var sex=Number(dataSex);
    var sexFor = $("#sexFor");
    if(sex === 0){
        sexFor.text("乾造");
    }else{
        sexFor.text("坤造");
    }

    var dateVal = $("#date");
    dateVal.text("阳历："+year+"-"+month+"-"+day+" "+time+" | 地方时:" + ob.bz_zty);

    var dateY = $("#dateY");
    var dateYVal = calendar.solar2lunar(year, month, day);
    dateY.text("阴历："+dateYVal.gzYear+"年 "+dateYVal.IMonthCn+" "+dateYVal.IDayCn);

    var startHtml = "";var endHtml = "";
    for(var m = 0; m <= 160; m++){
        startHtml += '<option value="'+(Number(year) + m)+'">'+(Number(year) + m)+'</option>';
    }
    $("select[name=startYear]").append(startHtml);
    for(var n = 0; n <= 160; n++){
        if(n !== 160){
            endHtml += '<option value="'+(Number(year) + n)+'">'+(Number(year) + n)+'</option>';
        }else{
            endHtml += '<option selected="selected" value="'+(Number(year) + n)+'">'+(Number(year) + n)+'</option>';
        }
    }
    $("select[name=endYear]").append(endHtml);

    var str1 = ob.bz_jn;
    var str2 = ob.bz_jy.substr(1, 1);
    var str3 = ob.bz_jy;
    var str4 = ob.bz_jr;
    var str5 = ob.bz_js;
    var str6 = str5.substr(1, 1);
    var jizStr = getJizhen(str1, str2, forTuneList);
    var zhenStr = getJizhen(str4, str6, zhenList);

    var startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    $("#startTime").val(startTime.Format("yyyy-MM-dd HH:mm:ss"));
    //月亮
    var str7 = getRiZhen(startTime);
    var str8 = getShiZhen(str6, str7.substr(0, 1));
    var str9 = getJizhen(str7, str6, zhenList);

    var temp = true;
    if(getYS(str1) === 0 && sex === 0){
        temp = true;
    }
    if(getYS(str1) === 1 && sex === 1){
        temp = true;
    }
    if(getYS(str1) === 1 && sex === 0){
        temp = false;
    }
    if(getYS(str1) === 0 && sex === 1){
        temp = false;
    }
    startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var yearDate = getYearRhythm(startTime, temp);
    var yearRhyDate = coverDateToYear(startTime, yearDate);
    startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var seasonDate = getSeasonRhythm(startTime, temp);
    var seasonRhyDate = coverDateToSeason(startTime, seasonDate);
    startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var monthDate = getMonthRhythm(startTime, temp);
    var monthRhyDate = coverDateToMonth(startTime, monthDate);

    //太阳
    var tempSun = true;
    if(getYS(str4) === 0 && sex === 0){
        tempSun = true;
    }
    if(getYS(str4) === 1 && sex === 1){
        tempSun = true;
    }
    if(getYS(str4) === 1 && sex === 0){
        tempSun = false;
    }
    if(getYS(str4) === 0 && sex === 1){
        tempSun = false;
    }
    startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var dayDateSun = getDayRhythm(startTime, ob, tempSun);
    var dayRhyDateSun = coverDateToDay(startTime, dayDateSun);

    startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var zhenDateSun = getZhenRhythm(startTime, ob, str6, tempSun);
    var zhenRhyDateSun = coverDateToZhen(startTime, zhenDateSun);

    startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var shiDateSun = getShiRhythm(startTime, ob, str6, tempSun);
    var shiRhyDateSun = coverDateToShi(startTime, shiDateSun);

    //月亮
    var tempMoon = true;
    if(getYS(str7) === 0 && sex === 0){
        tempMoon = true;
    }
    if(getYS(str7) === 1 && sex === 1){
        tempMoon = true;
    }
    if(getYS(str7) === 1 && sex === 0){
        tempMoon = false;
    }
    if(getYS(str7) === 0 && sex === 1){
        tempMoon = false;
    }
    startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var dayDateMoon = getDayRhythm(startTime, ob, tempMoon);
    var dayRhyDateMoon = coverDateToDay(startTime, dayDateMoon);

    startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var zhenDateMoon = getZhenRhythm(startTime, ob, str6, tempMoon);
    var zhenRhyDateMoon = coverDateToZhen(startTime, zhenDateMoon);

    startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var shiDateMoon = getShiRhythm(startTime, ob, str6, tempMoon);
    var shiRhyDateMoon = coverDateToShi(startTime, shiDateMoon);

    var htmlSun = "<tr><td>年柱</td><td>"+str1+"</td><td>"+yearDate.month+"月"+yearDate.day+"天"+yearDate.hours+":"+yearDate.minutes+":"+yearDate.seconds+"   于"+yearRhyDate+"更换</td><td>每隔30年</td></tr>";
    htmlSun += "<tr><td>季柱</td><td>"+jizStr+"</td><td>"+seasonDate.month+"月"+seasonDate.day+"天"+seasonDate.hours+":"+seasonDate.minutes+":"+seasonDate.seconds+"   于"+seasonRhyDate+"更换</td><td>每隔20年</td></tr>";
    htmlSun += "<tr><td>月柱</td><td>"+str3+"</td><td>"+monthDate.month+"月"+monthDate.day+"天"+monthDate.hours+":"+monthDate.minutes+":"+monthDate.seconds+"   于"+monthRhyDate+"更换</td><td>每隔10年</td></tr>";
    htmlSun += "<tr><td>日柱</td><td>"+str4+"</td><td>"+dayDateSun.month+"月"+dayDateSun.day+"天"+dayDateSun.hours+":"+dayDateSun.minutes+":"+dayDateSun.seconds+"   于"+dayRhyDateSun+"更换</td><td>每隔3年</td></tr>";
    htmlSun += "<tr><td>阵柱</td><td>"+zhenStr+"</td><td>"+zhenDateSun.month+"月"+zhenDateSun.day+"天"+zhenDateSun.hours+":"+zhenDateSun.minutes+":"+zhenDateSun.seconds+"   于"+zhenRhyDateSun+"更换</td><td>每隔2年</td></tr>";
    htmlSun += "<tr><td>时柱</td><td>"+str5+"</td><td>"+shiDateSun.month+"月"+shiDateSun.day+"天"+shiDateSun.hours+":"+shiDateSun.minutes+":"+shiDateSun.seconds+"   于"+shiRhyDateSun+"更换</td><td>每隔1年</td></tr>";


    var htmlMoon = "<tr><td>年柱</td><td>"+str1+"</td><td>"+yearDate.month+"月"+yearDate.day+"天"+yearDate.hours+":"+yearDate.minutes+":"+yearDate.seconds+"   于"+yearRhyDate+"更换</td><td>每隔30年</td></tr>";
    htmlMoon += "<tr><td>季柱</td><td>"+jizStr+"</td><td>"+seasonDate.month+"月"+seasonDate.day+"天"+seasonDate.hours+":"+seasonDate.minutes+":"+seasonDate.seconds+"   于"+seasonRhyDate+"更换</td><td>每隔20年</td></tr>";
    htmlMoon += "<tr><td>月柱</td><td>"+str3+"</td><td>"+monthDate.month+"月"+monthDate.day+"天"+monthDate.hours+":"+monthDate.minutes+":"+monthDate.seconds+"   于"+monthRhyDate+"更换</td><td>每隔10年</td></tr>";
    htmlMoon += "<tr><td>日柱</td><td>"+str7+"</td><td>"+dayDateMoon.month+"月"+dayDateMoon.day+"天"+dayDateMoon.hours+":"+dayDateMoon.minutes+":"+dayDateMoon.seconds+"   于"+dayRhyDateMoon+"更换</td><td>每隔3年</td></tr>";
    htmlMoon += "<tr><td>阵柱</td><td>"+str9+"</td><td>"+zhenDateMoon.month+"月"+zhenDateMoon.day+"天"+zhenDateMoon.hours+":"+zhenDateMoon.minutes+":"+zhenDateMoon.seconds+"   于"+zhenRhyDateMoon+"更换</td><td>每隔2年</td></tr>";
    htmlMoon += "<tr><td>时柱</td><td>"+str8+"</td><td>"+shiDateMoon.month+"月"+shiDateMoon.day+"天"+shiDateMoon.hours+":"+shiDateMoon.minutes+":"+shiDateMoon.seconds+"   于"+shiRhyDateMoon+"更换</td><td>每隔1年</td></tr>";

    var wxInfo;
    var ganSun = str4.substr(0, 1);
    var zhiSun = [str1.substr(1, 1), jizStr.substr(1, 1), str3.substr(1, 1), str4.substr(1, 1), zhenStr.substr(1, 1), str5.substr(1, 1)];
    wxInfo = getYinByZhi(ganSun, zhiSun);
    htmlSun += "<tr><td colspan='4' style='color: deepskyblue;'>太阳："+wxInfo.join(",")+"</td></tr>";
    var ganMoon = str7.substr(0, 1);
    var zhiMoon = [str1.substr(1, 1), jizStr.substr(1, 1), str3.substr(1, 1), str7.substr(1, 1), str9.substr(1, 1), str8.substr(1, 1)];
    wxInfo = getYinByZhi(ganMoon, zhiMoon);
    htmlMoon += "<tr><td colspan='4' style='color: deepskyblue;'>月亮："+wxInfo.join(",")+"</td></tr>";

    $("#sun").after(htmlSun);
    $("#moon").after(htmlMoon);

    rhythmOne.str1 = str1;
    rhythmOne.jizStr = jizStr;
    rhythmOne.str3 = str3;
    rhythmOne.str4 = str4;
    rhythmOne.zhenStr = zhenStr;
    rhythmOne.str5 = str5;
    rhythmOne.str7 = str7;
    rhythmOne.str9 = str9;
    rhythmOne.str8 = str8;
    var info = {
        sun: {
            year: {
                zhu: str1,
                time: yearRhyDate,
                startYear: Number(year)
            },
            season: {
                zhu: jizStr,
                time: seasonRhyDate,
                startYear: Number(year)
            },
            month: {
                zhu: str3,
                time: monthRhyDate,
                startYear: Number(year)
            },
            day: {
                zhu: str4,
                time: dayRhyDateSun,
                startYear: Number(year)
            },
            zhen: {
                zhu: zhenStr,
                time: zhenRhyDateSun,
                startYear: Number(year)
            },
            time: {
                zhu: str5,
                time: shiRhyDateSun,
                startYear: Number(year)
            }
        },
        moon: {
            year: {
                zhu: str1,
                time: yearRhyDate,
                startYear: Number(year)
            },
            season: {
                zhu: jizStr,
                time: seasonRhyDate,
                startYear: Number(year)
            },
            month: {
                zhu: str3,
                time: monthRhyDate,
                startYear: Number(year)
            },
            day: {
                zhu: str7,
                time: dayRhyDateMoon,
                startYear: Number(year)
            },
            zhen: {
                zhu: str9,
                time: zhenRhyDateMoon,
                startYear: Number(year)
            },
            time: {
                zhu: str8,
                time: shiRhyDateMoon,
                startYear: Number(year)
            }
        }
    };
    if(month <= 2){
        var culYearMonth = getJieQi(year, 2);
        var yearMonthTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
        var jieQiTime = toDate(culYearMonth.y, culYearMonth.m, culYearMonth.d, culYearMonth.jqsj.split(":")[0], culYearMonth.jqsj.split(":")[1], culYearMonth.jqsj.split(":")[2]);
        if(jieQiTime > yearMonthTime){
            var ganZhiCul = getJiazi(str1, true);
            rhythmList = getRhythmList(year, ganZhiCul, info, sex);
        }else{
            rhythmList = getRhythmList(year, str1, info, sex);
        }
    }else{
        rhythmList = getRhythmList(year, str1, info, sex);
    }
    var contentInfo = "";
    for(var i = 0; i < rhythmList.length; i++){
        var YZ = rhythmList[i].ganZhi.substr(1, 1);
        var ganSunF = str4.substr(0, 1);
        var zhiSunF = [str1.substr(1, 1), jizStr.substr(1, 1), str3.substr(1, 1), str4.substr(1, 1), zhenStr.substr(1, 1), str5.substr(1, 1), rhythmList[i].sun.year.zhu.substr(1, 1), rhythmList[i].sun.season.zhu.substr(1, 1), rhythmList[i].sun.month.zhu.substr(1, 1), rhythmList[i].sun.day.zhu.substr(1, 1), rhythmList[i].sun.zhen.zhu.substr(1, 1), rhythmList[i].sun.time.zhu.substr(1, 1), rhythmList[i].ganZhi.substr(1, 1)];
        var SZ_S = rhythmList[i].sun.time.zhu.substr(1, 1);
        var sunInfo = getYinByZhiForYear(ganSunF, zhiSunF, YZ, SZ_S);

        var ganMoonF = str7.substr(0, 1);
        var zhiMoonF = [str1.substr(1, 1), jizStr.substr(1, 1), str3.substr(1, 1), str7.substr(1, 1), str9.substr(1, 1), str8.substr(1, 1), rhythmList[i].moon.year.zhu.substr(1, 1), rhythmList[i].moon.season.zhu.substr(1, 1), rhythmList[i].moon.month.zhu.substr(1, 1), rhythmList[i].moon.day.zhu.substr(1, 1), rhythmList[i].moon.zhen.zhu.substr(1, 1), rhythmList[i].moon.time.zhu.substr(1, 1), rhythmList[i].ganZhi.substr(1, 1)];
        var SZ_M = rhythmList[i].moon.time.zhu.substr(1, 1);
        var moonInfo = getYinByZhiForYear(ganMoonF, zhiMoonF, YZ, SZ_M);

        contentInfo += "<div>"+rhythmList[i].year+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+rhythmList[i].ganZhi+"年 "+rhythmList[i].age+"岁</div>" +
            "<div>太阳</div><div><table style=\"width: 100%\"><thead><tr><td style=\"width: 10%\">柱</td>" +
            "<td style=\"width: 10%\">干支</td><td style=\"width: 10%\">节律干支</td><td style=\"width: 70%\">时间</td></tr>" +
            "</thead><tbody><tr><td>年柱</td><td>"+str1+"</td><td>"+rhythmList[i].sun.year.zhu+"</td>" +
            "<td>"+rhythmList[i].sun.year.startYear+"---"+rhythmList[i].sun.year.time+"</td></tr><tr><td>季柱</td>" +
            "<td>"+jizStr+"</td><td>"+rhythmList[i].sun.season.zhu+"</td>" +
            "<td>"+rhythmList[i].sun.season.startYear+"---"+rhythmList[i].sun.season.time+"</td>" +
            "</tr><tr><td>月柱</td><td>"+str3+"</td><td>"+rhythmList[i].sun.month.zhu+"</td>" +
            "<td>"+rhythmList[i].sun.month.startYear+"---"+rhythmList[i].sun.month.time+"</td>" +
            "</tr><tr><td>日柱</td><td>"+str4+"</td><td>"+rhythmList[i].sun.day.zhu+"</td>" +
            "<td>"+rhythmList[i].sun.day.startYear+"---"+rhythmList[i].sun.day.time+"</td>" +
            "</tr><tr><td>阵柱</td><td>"+zhenStr+"</td><td>"+rhythmList[i].sun.zhen.zhu+"</td>" +
            "<td>"+rhythmList[i].sun.zhen.startYear+"---"+rhythmList[i].sun.zhen.time+"</td>" +
            "</tr><tr><td>时柱</td><td>"+str5+"</td><td>"+rhythmList[i].sun.time.zhu+"</td>" +
            "<td>"+rhythmList[i].sun.time.startYear+"---"+rhythmList[i].sun.time.time+"</td>" +
            "</tr></tbody></table></div>";

        contentInfo += "<div style='width: 800px; color: deepskyblue;'>太阳：" + sunInfo.join(",") +"</div>"

        contentInfo += "<div style='width: 800px;'><table style='width: 100%'><thead class='thead-tab'><tr>";
        for(var o = 0; o < rhythmList[i].sun.timeList.length; o++){
            contentInfo += "<td style='width: 12%'>"+rhythmList[i].sun.timeList[o]+"</td>"
        }
        contentInfo += "</tr></thead><tbody style='display: none;'>";
        contentInfo += "<tr>";
        for(var p = 0; p < rhythmList[i].sun.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].sun.year.timeListInfo[rhythmList[i].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].sun.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].sun.season.timeListInfo[rhythmList[i].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].sun.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].sun.month.timeListInfo[rhythmList[i].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].sun.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].sun.day.timeListInfo[rhythmList[i].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].sun.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].sun.zhen.timeListInfo[rhythmList[i].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].sun.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].sun.time.timeListInfo[rhythmList[i].sun.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "</tbody></table></div>";

        contentInfo += "<div>月亮</div><div><table style=\"width: 100%\"><thead><tr><td style=\"width: 10%\">柱</td>" +
            "<td style=\"width: 10%\">干支</td><td style=\"width: 10%\">节律干支</td> <td style=\"width: 70%\">时间</td>" +
            "</tr></thead><tbody><tr><td>年柱</td><td>"+str1+"</td><td>"+rhythmList[i].moon.year.zhu+"</td>" +
            "<td>"+rhythmList[i].moon.year.startYear+"---"+rhythmList[i].moon.year.time+"</td>" +
            "</tr><tr><td>季柱</td><td>"+jizStr+"</td><td>"+rhythmList[i].moon.season.zhu+"</td>" +
            "<td>"+rhythmList[i].moon.season.startYear+"---"+rhythmList[i].moon.season.time+"</td>" +
            "</tr><tr><td>月柱</td><td>"+str3+"</td><td>"+rhythmList[i].moon.month.zhu+"</td>" +
            "<td>"+rhythmList[i].moon.month.startYear+"---"+rhythmList[i].moon.month.time+"</td>" +
            "</tr><tr><td>日柱</td><td>"+str7+"</td><td>"+rhythmList[i].moon.day.zhu+"</td>" +
            "<td>"+rhythmList[i].moon.day.startYear+"---"+rhythmList[i].moon.day.time+"</td>" +
            "</tr><tr><td>阵柱</td><td>"+str9+"</td><td>"+rhythmList[i].moon.zhen.zhu+"</td>" +
            "<td>"+rhythmList[i].moon.zhen.startYear+"---"+rhythmList[i].moon.zhen.time+"</td>" +
            "</tr><tr><td>时柱</td><td>"+str8+"</td><td>"+rhythmList[i].moon.time.zhu+"</td>" +
            "<td>"+rhythmList[i].moon.time.startYear+"---"+rhythmList[i].moon.time.time+"</td>" +
            "</tr></tbody></table></div>";

        contentInfo += "<div style='width: 800px; color: deepskyblue;'>月亮：" + moonInfo.join(",") +"</div>";

        contentInfo += "<div style='width: 800px;'><table style='width: 100%'><thead class='thead-tab'><tr>";
        for(o = 0; o < rhythmList[i].moon.timeList.length; o++){
            contentInfo += "<td style='width: 12%'>"+rhythmList[i].moon.timeList[o]+"</td>"
        }
        contentInfo += "</tr></thead><tbody style='display: none;'>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].moon.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].moon.year.timeListInfo[rhythmList[i].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].moon.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].moon.season.timeListInfo[rhythmList[i].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].moon.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].moon.month.timeListInfo[rhythmList[i].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].moon.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].moon.day.timeListInfo[rhythmList[i].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].moon.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].moon.zhen.timeListInfo[rhythmList[i].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "<tr>";
        for(p = 0; p < rhythmList[i].moon.timeList.length; p++){
            contentInfo += "<td>"+rhythmList[i].moon.time.timeListInfo[rhythmList[i].moon.timeList[p]]+"</td>"
        }
        contentInfo += "</tr>";
        contentInfo += "</tbody></table></div>";

        contentInfo += "<div>-------------------------------------------------------------------</div>";

    }
    $("#content").append(contentInfo).on("click", ".thead-tab", function(){
        var tbody = $(this).next();
        if($(tbody).is(":hidden")){
            $(tbody).show();
        }else{
            $(tbody).hide();
        }
    });

    $("#search").on("click", function(){
        var yearEnd = $("input[name=searchYear]").val();
        var info = {
            sun: {
                year: rhythmOne.str1,
                season: rhythmOne.jizStr,
                month: rhythmOne.str3,
                day: rhythmOne.str4,
                zhen: rhythmOne.zhenStr,
                time: rhythmOne.str5
            },
            moon: {
                year: rhythmOne.str1,
                season: rhythmOne.jizStr,
                month: rhythmOne.str3,
                day: rhythmOne.str7,
                zhen: rhythmOne.str9,
                time: rhythmOne.str8
            }
        };
        searchYear(yearEnd, rhythmList, info, sex, year);
    })
});