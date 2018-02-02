function toDate(year, month, day, hours, minute, second){
    var data = calendar.solarDays(year, month);
    if(day > data){
        day = 1;
        month = month + 1;
    }
    var time = year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    return new Date(time);
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function inArray(elem, arr, i) {
    var deletedIds = [];
    var indexOf = deletedIds.indexOf;
    var len;
    if (arr) {
        if (indexOf) {
            return indexOf.call(arr, elem, i);
        }
        len = arr.length;
        i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
        for (; i < len; i++) {
            if (i in arr && arr[i] === elem) {
                return i;
            }
        }
    }
    return -1;
}

/**
 * 年节律时间转换
 * @param startTime 开始时间
 * @param times 节律时间差
 */
function coverDateToYear(startTime, times){
    var time = startTime;
    var data = {year: null, month: null, day: null, hours: null, minutes: null, seconds: null};
    var month = times.month;
    var day = times.day;
    var hours = times.hours;
    var minutes = times.minutes;
    var seconds = times.seconds;
    data.year = 2 * month;
    data.month = 6 * month + 1 * day;
    data.hours = 30 * hours;
    data.minutes = 30 * minutes;
    data.seconds = 30 * seconds;
    if(data.seconds > 60){
        data.minutes = data.minutes + Math.floor(data.seconds/60);
        data.seconds = data.seconds%60;
    }
    if(data.minutes > 60){
        data.hours = data.hours + Math.floor(data.minutes/60);
        data.minutes = data.minutes%60;
    }
    if(data.hours > 24){
        data.day = Math.floor(data.hours/24);
        data.hours = data.hours%24;
    }
    if(data.day > 30){
        data.month = data.month + Math.floor(data.day/30);
        data.day = data.day%30;
    }
    if(data.month > 12){
        data.year = Math.floor(data.month/12);
        data.month = data.month%12;
    }
    time.setFullYear(time.getFullYear() + data.year);
    time.setMonth(time.getMonth() + data.month);
    time.setHours(time.getHours() + data.hours);
    time.setMinutes(time.getMinutes() + data.minutes);
    time.setSeconds(time.getSeconds() + data.seconds);
    return time.Format("yyyy-MM-dd HH:mm:ss");
}

/**
 * 季节律时间转换
 * @param startTime
 * @param times
 */
function coverDateToSeason(startTime, times){
    var time = startTime;
    var data = {year: null, month: null, day: null, hours: null, minutes: null, seconds: null};
    var month = times.month;
    var day = times.day;
    var hours = times.hours;
    var minutes = times.minutes;
    var seconds = times.seconds;
    data.year = 6 * month;
    data.month = 2 * day + 8 * month;
    data.day = 20 * day;
    data.hours = 80 * hours;
    data.minutes = 80 * minutes;
    data.seconds = 80 * seconds;

    if(data.seconds > 60){
        data.minutes = data.minutes + Math.floor(data.seconds/60);
        data.seconds = data.seconds%60;
    }
    if(data.minutes > 60){
        data.hours = data.hours + Math.floor(data.minutes/60);
        data.minutes = data.minutes%60;
    }
    if(data.hours > 24){
        data.day = data.day + Math.floor(data.hours/24);
        data.hours = data.hours%24;
    }
    if(data.day > 30){
        data.month = data.month + Math.floor(data.day/30);
        data.day = data.day%30;
    }
    if(data.month > 12){
        data.year = data.year + Math.floor(data.month/12);
        data.month = data.month%12;
    }

    time.setFullYear(time.getFullYear() + data.year);
    time.setMonth(time.getMonth() + data.month);
    time.setDate(time.getDate() + data.day);
    time.setHours(time.getHours() + data.hours);
    time.setMinutes(time.getMinutes() + data.minutes);
    time.setSeconds(time.getSeconds() + data.seconds);
    return time.Format("yyyy-MM-dd HH:mm:ss");
}

/**
 * 月节律时间转换
 * @param startTime
 * @param times
 */
function coverDateToMonth(startTime, times){
    var time = startTime;
    var data = {year: null, month: null, day: null, hours: null, minutes: null, seconds: null};
    var month = times.month;
    var day = times.day;
    var hours = times.hours;
    var minutes = times.minutes;
    var seconds = times.seconds;
    data.year = 10 * month;
    data.month = 4 * day;
    data.day = 5 * hours;
    data.hours = 2 * minutes;
    data.minutes = 2 * seconds;
    if(data.minutes > 60){
        data.hours = data.hours + Math.floor(data.minutes/60);
        data.minutes = data.minutes%60;
    }
    if(data.hours > 24){
        data.day = data.day + Math.floor(data.hours/24);
        data.hours = data.hours%24;
    }
    if(data.day > 30){
        data.month = data.month + Math.floor(data.day/30);
        data.day = data.day%30;
    }
    if(data.month > 12){
        data.year = data.year + Math.floor(data.month/12);
        data.month = data.month%12;
    }
    time.setFullYear(time.getFullYear() + data.year);
    time.setMonth(time.getMonth() + data.month);
    time.setDate(time.getDate() + data.day);
    time.setHours(time.getHours() + data.hours);
    time.setMinutes(time.getMinutes() + data.minutes);
    return time.Format("yyyy-MM-dd HH:mm:ss");
}

/**
 * 日节律时间转换
 * @param startTime
 * @param times
 */
function coverDateToDay(startTime, times){
    var time = startTime;
    var data = {year: null, month: null, day: null, hours: null, minutes: null, seconds: null};
    var hours = times.hours;
    var minutes = times.minutes;
    var seconds = times.seconds;
    data.month = 1 * hours;
    data.day = 15 * hours;
    data.minutes = 18 * seconds;
    data.hours = 18 * minutes;
    if(data.minutes > 60){
        data.hours = data.hours + Math.floor(data.minutes/60);
        data.minutes = data.minutes%60;
    }
    if(data.hours > 24){
        data.day = data.day + Math.floor(data.hours/24);
        data.hours = data.hours%24;
    }
    if(data.day > 30){
        data.month = data.month + Math.floor(data.day/30);
        data.day = data.day%30;
    }

    time.setMonth(time.getMonth() + data.month);
    time.setDate(time.getDate() + data.day);
    time.setHours(time.getHours() + data.hours);
    time.setMinutes(time.getMinutes() + data.minutes);
    return time.Format("yyyy-MM-dd HH:mm:ss");
}

/**
 * 阵节律时间转换
 * @param startTime
 * @param times
 */
function coverDateToZhen(startTime, times){
    var time = startTime;
    var data = {year: null, month: null, day: null, hours: null, minutes: null, seconds: null};
    var hours = times.hours;
    var minutes = times.minutes;
    var seconds = times.seconds;
    data.month = 4 * hours;
    data.day = 2 * minutes;
    data.minutes = 48 * seconds;
    if(data.minutes > 60){
        data.hours = Math.floor(data.minutes/60);
        data.minutes = data.minutes%60;
    }
    if(data.hours > 24){
        data.day = data.day + Math.floor(data.hours/24);
        data.hours = data.hours%24;
    }
    if(data.day > 30){
        data.month = data.month + Math.floor(data.day/30);
        data.day = data.day%30;
    }
    if(data.month > 12){
        data.year = Math.floor(data.month/12);
        data.month = data.month%12;
    }
    time.setYear(time.getFullYear() + data.year);
    time.setMonth(time.getMonth() + data.month);
    time.setDate(time.getDate() + data.day);
    time.setHours(time.getHours() + data.hours);
    time.setMinutes(time.getMinutes() + data.minutes);
    return time.Format("yyyy-MM-dd HH:mm:ss");
}

/**
 * 时节律时间转换
 * @param startTime
 * @param times
 */
function coverDateToShi(startTime, times){
    var time = startTime;
    var data = {year: null, month: null, day: null, hours: null, minutes: null, seconds: null};
    var hours = times.hours;
    var minutes = times.minutes;
    var seconds = times.seconds;
    data.month = 6 * hours;
    data.day = 3 * minutes;
    data.minutes = 72 * seconds;
    if(data.minutes > 60){
        data.hours = Math.floor(data.minutes/60);
        data.minutes = data.minutes%60;
    }
    if(data.hours > 24){
        data.day = data.day + Math.floor(data.hours/24);
        data.hours = data.hours%24;
    }
    if(data.day > 30){
        data.month = data.month + Math.floor(data.day/30);
        data.day = data.day%30;
    }
    if(data.month > 12){
        data.year = Math.floor(data.month/12);
        data.month = data.month%12;
    }
    time.setYear(time.getFullYear() + data.year);
    time.setMonth(time.getMonth() + data.month);
    time.setDate(time.getDate() + data.day);
    time.setHours(time.getHours() + data.hours);
    time.setMinutes(time.getMinutes() + data.minutes);
    return time.Format("yyyy-MM-dd HH:mm:ss");
}

/**
 * 获取干支纪年信息
 * @param year
 * @param month
 * @param day
 * @param time
 * @returns {Object}
 */
function bazi(year, month, day, time, lon){
    var ob = new Object();
    var now=new Date();
    curTZ = now.getTimezoneOffset()/60; //时区 -8为北京时
    var t = timeStr2hour(time);
    var jd = JD.JD(year2Ayear(year), month - 0, day - 0 + t / 24);
    obb.mingLiBaZi(jd + curTZ / 24 - J2000, lon / radd, ob); //八字计算Cp11_J.value表示经度
    return ob;
}

/**
 * 传入干支判断阴阳
 * @param zhenZhu
 * @returns {number} 0表示阳，1表示阴
 */
function getYS(zhenZhu){
    var gan = zhenZhu.substr(0, 1);
    var index = 0;
    for(var i = 0; i < calendar.Gan.length; i++){
        if(gan === calendar.Gan[i]){
            index = i;
            break;
        }
    }
    return index%2;
}

/**
 * 获取某年某月第一个节气信息
 * @param year
 * @param month
 * @returns {*}
 */
function getJieQi(year, month){
    var By  = year2Ayear(year);
    var Bm  = Number(month);
    if(By == -10000) return;

    if(!lun.dn || lun.y!=By || lun.m!=Bm){  //月历未计算
        lun.yueLiHTML(By,Bm,curJD);
    }
    var ob = null;
    for(var i = 0; i < lun.lun.length; i++){
        if(inArray(lun.lun[i].jqmc, calendar.solarTerm) > -1){
            ob = lun.lun[i];
            break;
        }
    }
    return ob;
}

/**
 * 根据两个节气获取相差多少个整月
 * @param val
 * @param jqmc
 * @returns {number}
 */
function getMonth(val, jqmc){
    var list = obb.jqmc;
    var jqmc_num = 0;
    var val_num = 0;
    for(var i = 0; i < list.length; i++){
        if(jqmc === list[i]){
            jqmc_num = i;
        }
        if(val === list[i]){
            val_num = i;
        }
    }
    var jq_num = 0;
    if(jqmc_num < val_num){
        jq_num = 23 - val_num + jqmc_num
    }
    if(jqmc_num >= val_num){
        jq_num = jqmc_num - val_num;
    }
    return Math.ceil(jq_num / 2);
}
/**
 * 获取时间差
 * @param startDate
 * @param endDate
 * @returns {{days: number, hours: number, minutes: number, seconds: number}}
 */
function dateDiff(startDate, endDate){
    var date = endDate - startDate;
    var days    = date / 1000 / 60 / 60 / 24;
    var daysRound   = Math.floor(days);
    var hours    = date/ 1000 / 60 / 60 - (24 * daysRound);
    var hoursRound   = Math.floor(hours);
    var minutes   = date / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound);
    var minutesRound  = Math.floor(minutes);
    var seconds   = date/ 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound);
    var secondsRound  = Math.floor(seconds);
    return {days: daysRound, hours: hoursRound, minutes: minutesRound, seconds: secondsRound};
}

/**
 * 获取年节律
 * @param startTime
 * @param type
 * @returns {{month: null, day: null, hours: null, minutes: null, seconds: null}}
 */
function getYearRhythm(startTime, type){
    var data = {month: null, day: null, hours: null, minutes: null, seconds: null};
    var year = startTime.getFullYear();
    var month = startTime.getMonth() + 1;
    var nextJieQi;var nextJieQiDate;var prevJieQi;var prevJieQiDate;var jqmc;var res;var date;
    var culJieQi = getJieQi(year, month);
    var time = culJieQi.jqsj;
    var culJieQiDate = toDate(culJieQi.y, culJieQi.m, culJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    if(type){
        if(startTime < culJieQiDate){
            jqmc = culJieQi.jqmc;
            res = dateDiff(startTime, culJieQiDate);
        }
        if(startTime >= culJieQiDate){
            if(month === 12){
                nextJieQi = getJieQi(year + 1, 1);
            }else{
                nextJieQi = getJieQi(year, month + 1);
            }
            date = nextJieQi.jqsj;
            nextJieQiDate = toDate(nextJieQi.y, nextJieQi.m, nextJieQi.d, date.split(":")[0], date.split(":")[1], date.split(":")[2]);
            jqmc = nextJieQi.jqmc;
            res = dateDiff(startTime, nextJieQiDate);
        }
        data.month = getMonth(jqmc, "立春");
    }else{
        if(startTime < culJieQiDate){
            if(month === 1){
                prevJieQi = getJieQi(year - 1, 12);
            }else{
                prevJieQi = getJieQi(year, month - 1);
            }
            date = prevJieQi.jqsj;
            prevJieQiDate = toDate(prevJieQi.y, prevJieQi.m, prevJieQi.d, date.split(":")[0], date.split(":")[1], date.split(":")[2]);
            jqmc = prevJieQi.jqmc;
            res = dateDiff(prevJieQiDate, startTime);
        }
        if(startTime >= culJieQiDate){
            jqmc = culJieQi.jqmc;
            res = dateDiff(culJieQiDate, startTime);
        }
        data.month = getMonth("立春", jqmc);
    }
    data.day = res.days;
    data.hours = res.hours;
    data.minutes = res.minutes;
    data.seconds = res.seconds;
    return data;
}

/**
 * 获取季节律
 * @param startTime
 * @param type
 * @returns {{month: null, day: null, hours: null, minutes: null, seconds: null}}
 */
function getSeasonRhythm(startTime, type){
    var data = {month: null, day: null, hours: null, minutes: null, seconds: null};
    var year;var month;var culDate;var time;
    var nextJieQi;var prevJieQi;var nextJieQiDate;var prevJieQiDate;var res;var jqmc;
    year = startTime.getFullYear();
    month = startTime.getMonth() + 1;
    var spring = getJieQi(year, 2);
    var spring_time = spring.jqsj;
    var springDate = toDate(spring.y, spring.m, spring.d, spring_time.split(":")[0], spring_time.split(":")[1], spring_time.split(":")[2]);
    var summer = getJieQi(year, 5);
    var summer_time = summer.jqsj;
    var summerDate = toDate(summer.y, summer.m, summer.d, summer_time.split(":")[0], summer_time.split(":")[1], summer_time.split(":")[2]);
    var autumn = getJieQi(year, 8);
    var autumn_time = autumn.jqsj;
    var autumnDate = toDate(autumn.y, autumn.m, autumn.d, autumn_time.split(":")[0], autumn_time.split(":")[1], autumn_time.split(":")[2]);
    var winter = getJieQi(year, 11);
    var winter_time = winter.jqsj;
    var winterDate = toDate(winter.y, winter.m, winter.d, winter_time.split(":")[0], winter_time.split(":")[1], winter_time.split(":")[2]);
    var culJieQi = getJieQi(year, month);
    var culJieQi_time = culJieQi.jqsj;
    culDate = toDate(culJieQi.y, culJieQi.m, culJieQi.d, culJieQi_time.split(":")[0], culJieQi_time.split(":")[1], culJieQi_time.split(":")[2]);

    if(startTime >= springDate && startTime < summerDate){//春季
        if(type){
            if(startTime >= culDate){
                nextJieQi = getJieQi(year, month + 1);
                time = nextJieQi.jqsj;
                jqmc = nextJieQi.jqmc;
                nextJieQiDate = toDate(nextJieQi.y, nextJieQi.m, nextJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
                res = dateDiff(startTime, nextJieQiDate);
            }else{
                jqmc = culJieQi.jqmc;
                res = dateDiff(startTime, culDate);
            }
            data.month = getMonth(jqmc, "立夏");
        }else{
            if(startTime >= culDate){
                jqmc = culJieQi.jqmc;
                res = dateDiff(culDate, startTime);
            }else{
                prevJieQi = getJieQi(year, month -1);
                time = prevJieQi.jqsj;
                jqmc = prevJieQi.jqmc;
                prevJieQiDate = toDate(prevJieQi.y, prevJieQi.m, prevJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
                res = dateDiff(prevJieQiDate, startTime);
            }
            data.month = getMonth("立春", jqmc);
        }
        data.day = res.days;
        data.hours = res.hours;
        data.minutes = res.minutes;
        data.seconds = res.seconds;
    }
    if(startTime >= summerDate && startTime < autumnDate){//夏季
        if(type){
            if(startTime >= culDate){
                nextJieQi = getJieQi(year, month + 1);
                time = nextJieQi.jqsj;
                jqmc = nextJieQi.jqmc;
                nextJieQiDate = toDate(nextJieQi.y, nextJieQi.m, nextJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
                res = dateDiff(startTime, nextJieQiDate);
            }else{
                jqmc = culJieQi.jqmc;
                res = dateDiff(startTime, culDate);
            }
            data.month = getMonth(jqmc, "立秋");
        }else{
            if(startTime >= culDate){
                jqmc = culJieQi.jqmc;
                res = dateDiff(culDate, startTime);
            }else{
                prevJieQi = getJieQi(year, month -1);
                time = prevJieQi.jqsj;
                jqmc = prevJieQi.jqmc;
                prevJieQiDate = toDate(prevJieQi.y, prevJieQi.m, prevJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
                res = dateDiff(prevJieQiDate, startTime);
            }
            data.month = getMonth("立夏", jqmc);
        }
        data.day = res.days;
        data.hours = res.hours;
        data.minutes = res.minutes;
        data.seconds = res.seconds;
    }
    if(startTime >= autumnDate && startTime < winterDate){//秋季
        if(type){
            if(startTime >= culDate){
                nextJieQi = getJieQi(year, month + 1);
                time = nextJieQi.jqsj;
                jqmc = nextJieQi.jqmc;
                nextJieQiDate = toDate(nextJieQi.y, nextJieQi.m, nextJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
                res = dateDiff(startTime, nextJieQiDate);
            }else{
                jqmc = culJieQi.jqmc;
                res = dateDiff(startTime, culDate);
            }
            data.month = getMonth(jqmc, "立冬");
        }else{
            if(startTime >= culDate){
                jqmc = culJieQi.jqmc;
                res = dateDiff(culDate, startTime);
            }else{
                prevJieQi = getJieQi(year, month -1);
                time = prevJieQi.jqsj;
                jqmc = prevJieQi.jqmc;
                prevJieQiDate = toDate(prevJieQi.y, prevJieQi.m, prevJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
                res = dateDiff(prevJieQiDate, startTime);
            }
            data.month = getMonth("立秋", jqmc);
        }
        data.day = res.days;
        data.hours = res.hours;
        data.minutes = res.minutes;
        data.seconds = res.seconds;
    }
    if(startTime >= winterDate || startTime < springDate){//冬季
        if(type){
            if(startTime >= culDate){
                if(month === 12){
                    nextJieQi = getJieQi(year + 1, 1);
                }else{
                    nextJieQi = getJieQi(year, month + 1);
                }
                time = nextJieQi.jqsj;
                jqmc = nextJieQi.jqmc;
                nextJieQiDate = toDate(nextJieQi.y, nextJieQi.m, nextJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
                res = dateDiff(startTime, nextJieQiDate);
            }else{
                jqmc = culJieQi.jqmc;
                res = dateDiff(startTime, culDate);
            }
            data.month = getMonth(jqmc, "立春");
        }else{
            if(startTime >= culDate){
                jqmc = culJieQi.jqmc;
                res = dateDiff(culDate, startTime);
            }else{
                if(month === 1){
                    prevJieQi = getJieQi(year -1, 12);
                }else{
                    prevJieQi = getJieQi(year, month -1);
                }
                time = prevJieQi.jqsj;
                jqmc = prevJieQi.jqmc;
                prevJieQiDate = toDate(prevJieQi.y, prevJieQi.m, prevJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
                res = dateDiff(prevJieQiDate, startTime);
            }
            data.month = getMonth("立冬", jqmc);
        }
        data.day = res.days;
        data.hours = res.hours;
        data.minutes = res.minutes;
        data.seconds = res.seconds;
    }
    return data;
}

/**
 * 获取月节律
 * @param startTime
 * @param type
 * @returns {{month: null, day: null, hours: null, minutes: null, seconds: null}}
 */
function getMonthRhythm(startTime, type){
    var data = {month: null, day: null, hours: null, minutes: null, seconds: null};
    var year = startTime.getFullYear();
    var month = startTime.getMonth() + 1;
    var culJieQi = getJieQi(year, month);
    var time = culJieQi.jqsj;
    var culJieQiDate = toDate(culJieQi.y, culJieQi.m, culJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var res;var nextJieQi;var nextJieQiDate; var prevJieQi; var prevJieQiDate;
    if(type){
        if(startTime < culJieQiDate){
            res = dateDiff(startTime, culJieQiDate);
        }else{
            if(month === 12){
                nextJieQi = getJieQi(year + 1, 1);
            }else{
                nextJieQi = getJieQi(year, month + 1);
            }
            time = nextJieQi.jqsj;
            nextJieQiDate = toDate(nextJieQi.y, nextJieQi.m, nextJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
            res = dateDiff(startTime, nextJieQiDate);
        }
    }else{
        if(startTime < culJieQiDate){
            if(month === 1){
                prevJieQi = getJieQi(year - 1, 12);
            }else{
                prevJieQi = getJieQi(year, month - 1);
            }
            time = prevJieQi.jqsj;
            prevJieQiDate = toDate(prevJieQi.y, prevJieQi.m, prevJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
            res = dateDiff(prevJieQiDate, startTime);
        }else{
            res = dateDiff(culJieQiDate, startTime);
        }
    }
    data.month = 0;
    data.day = res.days;
    data.hours = res.hours;
    data.minutes = res.minutes;
    data.seconds = res.seconds;
    return data;
}

/**
 * 获取日节律
 * @param startTime
 * @param type
 * @returns {{month: null, day: null, hours: null, minutes: null, seconds: null}}
 */
function getDayRhythm(startTime, ob, type){
    var data = {month: null, day: null, hours: null, minutes: null, seconds: null};
    var localTime = ob.bz_zty;
    var endTime;
    var res;
    var localDate = toDate(startTime.getFullYear(), startTime.getMonth() + 1, startTime.getDate(), localTime.split(":")[0], localTime.split(":")[1], localTime.split(":")[2]);
    if(type){
        endTime = toDate(startTime.getFullYear(), startTime.getMonth() + 1, startTime.getDate(), 23, 0, 0);
        res = dateDiff(localDate, endTime);
    }else{
        endTime = toDate(startTime.getFullYear(), startTime.getMonth() + 1, startTime.getDate(), 23, 0, 0);
        res = dateDiff(endTime, localDate);
    }
    data.month = 0;
    data.day = 0;
    data.hours = res.hours;
    data.minutes = res.minutes;
    data.seconds = res.seconds;
    return data;
}

/**
 * 根据时辰获取所属阵
 * @param shi
 * @returns {number}
 */
function getZhenOfNum(shi){
    var num = 0;
    for(var key in zhenInfo){
        for(var i = 0; i < zhenInfo[key].length; i++){
            if(shi === zhenInfo[key][i]){
                num = key;
                break;
            }
        }
    }
    return num;
}

/**
 * 获取阵起始时间
 * @param shiChen
 * @returns {*}
 */
function getZhenDate(shiChen){
    var time = null;
    for(var key in zhenDateInfo){
        if(key === shiChen){
            time = zhenDateInfo[key];
            break;
        }
    }
    return time;
}

/**
 * 获取阵节律
 * @param startTime
 * @param ob
 * @param shi
 * @param type
 * @returns {{month: null, day: null, hours: null, minutes: null, seconds: null}}
 */
function getZhenRhythm(startTime, ob, shi, type) {
    var data = {month: null, day: null, hours: null, minutes: null, seconds: null};
    var year = startTime.getFullYear();
    var month = startTime.getMonth() + 1;
    var day = startTime.getDate();
    var localTime = ob.bz_zty;
    var zhenNum = Number(getZhenOfNum(shi));
    var shiChen;
    var zhenDate;
    var localDate = toDate(year, month, day, localTime.split(":")[0], localTime.split(":")[1], localTime.split(":")[2]);
    var res;
    if(type){
        if(zhenNum === 4){
            shiChen = zhenInfo[1][0];
            zhenDate = getZhenDate(shiChen);
            zhenDate = toDate(year, month, day + 1, zhenDate.split(":")[0], zhenDate.split(":")[1], zhenDate.split(":")[2]);
        }else{
            shiChen = zhenInfo[zhenNum + 1][0];
            zhenDate = getZhenDate(shiChen);
            zhenDate = toDate(year, month, day, zhenDate.split(":")[0], zhenDate.split(":")[1], zhenDate.split(":")[2]);
        }
        res = dateDiff(localDate, zhenDate);
    }else{
        shiChen = zhenInfo[zhenNum][0];
        zhenDate = getZhenDate(shiChen);
        zhenDate = toDate(year, month, day, zhenDate.split(":")[0], zhenDate.split(":")[1], zhenDate.split(":")[2]);
        res = dateDiff(zhenDate, localDate);
    }
    data.month = 0;
    data.day = 0;
    data.hours = res.hours;
    data.minutes = res.minutes;
    data.seconds = res.seconds;
    return data;
}

/**
 * 获取时辰序号
 * @param shiChen
 * @returns {number}
 */
function getShiDateNum(shiChen){
    var list = calendar.Zhi;
    var index = 0;
    for(var i = 0; i < list.length; i++){
        if(shiChen === list[i]){
            index = i;
            break;
        }
    }
    return index;
}

/**
 * 获取时辰起始时间
 * @param shiChen
 * @returns {*}
 */
function getShiDate(shiChen){
    var time = null;
    for(var key in shiDateInfo){
        if(key === shiChen){
            time = shiDateInfo[key];
            break;
        }
    }
    return time;
}

/**
 * 获取时节律
 * @param startTime
 * @param ob
 * @param shi
 * @param type
 * @returns {{month: null, day: null, hours: null, minutes: null, seconds: null}}
 */
function getShiRhythm(startTime, ob, shi, type) {
    var data = {month: null, day: null, hours: null, minutes: null, seconds: null};
    var year = startTime.getFullYear();
    var month = startTime.getMonth() + 1;
    var day = startTime.getDate();
    var localTime = ob.bz_zty;
    var localDate = toDate(year, month, day, localTime.split(":")[0], localTime.split(":")[1], localTime.split(":")[2]);
    var res;
    var prevDate;
    var nextDate;
    var index = getShiDateNum(shi);
    var nextShic;
    var shichenTime;
    if(type){
        if(index === 11){
            nextShic = calendar.Zhi[0];
            shichenTime = getShiDate(nextShic);
            nextDate = toDate(year, month, day + 1, shichenTime.split(":")[0], shichenTime.split(":")[1], shichenTime.split(":")[2]);
        }else{
            nextShic = calendar.Zhi[index + 1];
            shichenTime = getShiDate(nextShic);
            nextDate = toDate(year, month, day, shichenTime.split(":")[0], shichenTime.split(":")[1], shichenTime.split(":")[2]);
        }
        res = dateDiff(localDate, nextDate);
    }else{
        shichenTime = getShiDate(shi);
        prevDate = toDate(year, month, day, shichenTime.split(":")[0], shichenTime.split(":")[1], shichenTime.split(":")[1]);
        res = dateDiff(prevDate, localDate);
    }
    data.month = 0;
    data.day = 0;
    data.hours = res.hours;
    data.minutes = res.minutes;
    data.seconds = res.seconds;
    return data;
}

/**
 * 遍历获取节阵
 * @param year
 * @param month
 * @param list
 * @returns {string}
 */
function getJizhen(year, month, list){
    var jizStr = "";
    for (var obj in list) {
        if(list[obj].month == month && list[obj].year == year){
            jizStr = list[obj].jizStr;
            break;
        }
    }
    return jizStr;
}

/**
 * 传入中文月获取单双
 * @param str
 * @returns {number}
 */
function getMonthIndex(str){
    var index = 0;
    for(var i = 0; i < calendar.nStr3.length; i++){
        if(str === calendar.nStr3[i]){
            index = i;
            break;
        }
    }
    return (index + 1)%2;
}

/**
 * 传入中文day获取日阵
 * @param type
 * @param dayCn
 * @returns {*}
 */
function getRiZhenByMonth(type, dayCn){
    var list;
    var riZhen;
    if(type){
        list = RiList.double;
    }else{
        list = RiList.single;
    }
    for(var i = 0; i < list.length; i++){
        if(dayCn === list[i].day){
            riZhen = list[i].gz;
            break;
        }
    }
    return riZhen;
}

/**
 * 获取日阵
 * @param startTime
 * @returns {*}
 */
function getRiZhen(startTime){
    var year = startTime.getFullYear();
    var month = startTime.getMonth() + 1;
    var day = startTime.getDate();
    var info = calendar.solar2lunar(year, month, day);
    var s_and_d = getMonthIndex(info.IMonthCn.indexOf("闰") !== -1?info.IMonthCn.substr(1, 1):info.IMonthCn.substr(0, 1));
    if(info.IMonthCn.indexOf("闰") !== -1){
        var culJieQi = getJieQi(year, month);
        var time = culJieQi.jqsj;
        var culJieQiDate = toDate(culJieQi.y, culJieQi.m, culJieQi.d, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
        if(culJieQiDate > startTime){
            if(s_and_d === 0){
                s_and_d = 1;
            }else{
                s_and_d = 0;
            }
        }

    }
    var riZhen;
    if(s_and_d === 0){//双
        riZhen = getRiZhenByMonth(true, info.IDayCn);
    }
    if(s_and_d === 1){//单
        riZhen = getRiZhenByMonth(false, info.IDayCn);
    }
    return riZhen;
}

/**
 * 获取时柱
 * @param shi 时辰
 * @param ri 日柱
 * @returns {*}
 */
function getShiZhen(shi, ri){
    var list;
    var shiZhen;
    for(var i = 0; i < shiZhu.length; i++){
        for(var key in shiZhu[i]){
            if(key === ri){
                list = shiZhu[i][key];
                break;
            }
        }
    }
    for(var j = 0; j < list.length; j++){
        if(shi === list[j].zhi){
            shiZhen = list[j].shiZhen;
            break;
        }
    }
    return shiZhen;
}

function getLiShun(ys, sex){
    var temp = true;
    if(ys === 0 && sex === 0){
        temp = true;
    }
    if(ys === 1 && sex === 1){
        temp = true;
    }
    if(ys === 1 && sex === 0){
        temp = false;
    }
    if(ys === 0 && sex === 1){
        temp = false;
    }
    return temp;
}
function addYear(startTime, year){
    var time = toDate(startTime.split(" ")[0].split("-")[0],startTime.split(" ")[0].split("-")[1],startTime.split(" ")[0].split("-")[2],startTime.split(" ")[1].split(":")[0],startTime.split(" ")[1].split(":")[1],startTime.split(" ")[1].split(":")[2]);
    time.setFullYear(time.getFullYear() + year);
    return time.Format("yyyy-MM-dd HH:mm:ss");
}
/**
 * 获取甲子
 * @param str
 * @param type
 * @returns {*}
 */
function getJiazi(str, type){
    var index = 0;
    var jiazi;
    for(var i = 0; i < JiaZi.length; i++){
        if(JiaZi[i] === str){
            index = i;
            break;
        }
    }
    if(type){
        if(index === JiaZi.length - 1){
            jiazi = JiaZi[0];
        }else{
            jiazi = JiaZi[index + 1];
        }
    }else{
        if(index === 0){
            jiazi = JiaZi[JiaZi.length - 1];
        }else{
            jiazi = JiaZi[index - 1];
        }
    }
    return jiazi;
}

function getMonthDay(year, date){
    var ymd = date.split(" ")[0];
    var month = ymd.split("-")[1];
    var day = ymd.split("-")[2];
    return year + "-" + month + "-" + day;
}
function isInStartDateToAdd(list, year){
    var date = getJieQi(year, 2);
    var culDate = date.y + "-0" + date.m + "-0" + date.d;
    date = getJieQi(year + 1, 2);
    var prevDate = date.y + "-0" + date.m + "-0" + date.d;
    if(inArray(culDate, list) === -1){
        list.push(culDate);
    }
    list.sort();
    list.push(prevDate);
    return list;
}

function getRhythmList(year, jiazi, info, sex){
    year = Number(year);
    var endYear = year + 160;
    var list = [];
    var tempSun = getLiShun(getYS(info.sun.year.zhu), sex);
    var tempMoon = getLiShun(getYS(info.moon.year.zhu), sex);
    var tempDaySun = getLiShun(getYS(info.sun.day.zhu), sex);
    var tempDayMoon = getLiShun(getYS(info.moon.day.zhu), sex);

    for(var i = 0; i <= endYear - year; i++){
        var dateS;var dateM;var m;var n;
        var res = {
            year: null,
            ganZhi: null,
            age: null,
            sun: {
                year: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                season: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                month: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                day: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                zhen: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                time: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                timeList: []
            },
            moon: {
                year: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                season: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                month: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                day: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                zhen: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                time: {
                    zhu: null,
                    time: null,
                    startYear: null,
                    timeListInfo: {}
                },
                timeList: []
            }
        };
        res.year = year + i;
        res.age = i;
        var listSun = [];
        var listMoon = [];
        listSun.push(getMonthDay(res.year, info.sun.year.time));
        listSun.push(getMonthDay(res.year, info.sun.month.time));
        listSun.push(getMonthDay(res.year, info.sun.season.time));
        listSun.push(getMonthDay(res.year, info.sun.day.time));
        listSun.push(getMonthDay(res.year, info.sun.zhen.time));
        listSun.push(getMonthDay(res.year, info.sun.time.time));

        listMoon.push(getMonthDay(res.year, info.moon.year.time));
        listMoon.push(getMonthDay(res.year, info.moon.month.time));
        listMoon.push(getMonthDay(res.year, info.moon.season.time));
        listMoon.push(getMonthDay(res.year, info.moon.day.time));
        listMoon.push(getMonthDay(res.year, info.moon.zhen.time));
        listMoon.push(getMonthDay(res.year, info.moon.time.time));

        if(i === 0){
            res.ganZhi = jiazi;
        }else{
            res.ganZhi = getJiazi(jiazi, true);
            jiazi = res.ganZhi;
        }

        res.sun.timeList = isInStartDateToAdd(listSun, res.year);
        res.moon.timeList = isInStartDateToAdd(listMoon, res.year);

        res.sun.year.zhu = info.sun.year.zhu;
        res.sun.year.time = info.sun.year.time;
        res.sun.year.startYear = info.sun.year.startYear;
        res.moon.year.zhu = info.moon.year.zhu;
        res.moon.year.time = info.moon.year.time;
        res.moon.year.startYear = info.moon.year.startYear;

        for(m = 0; m < res.sun.timeList.length; m++){
            dateS = res.sun.timeList[m];
            res.sun.year.timeListInfo[dateS] = info.sun.year.zhu;
            if(Number(info.sun.year.time.split("-")[0]) === res.year && dateS >= getMonthDay(res.year, info.sun.year.time)){
                res.sun.year.timeListInfo[dateS] = getJiazi(info.sun.year.zhu, tempSun);
                res.sun.year.timeListInfo[Object.keys(res.sun.year.timeListInfo)[Object.keys(res.sun.year.timeListInfo).length - 1]] = getJiazi(info.sun.year.zhu, tempSun);
            }
        }
        for(n = 0; n < res.moon.timeList.length; n++){
            dateM = res.moon.timeList[n];
            res.moon.year.timeListInfo[dateM] = info.moon.year.zhu;
            if(Number(info.moon.year.time.split("-")[0]) === res.year && dateM >= getMonthDay(res.year, info.moon.year.time)){
                res.moon.year.timeListInfo[dateM] = getJiazi(info.moon.year.zhu, tempMoon);
                res.moon.year.timeListInfo[Object.keys(res.moon.year.timeListInfo)[Object.keys(res.moon.year.timeListInfo).length - 1]] = getJiazi(info.moon.year.zhu, tempMoon);
            }
        }
        if(Number(info.sun.year.time.split("-")[0]) === res.year){
            res.sun.year.zhu = getJiazi(info.sun.year.zhu,  tempSun);
            res.sun.year.time = addYear(info.sun.year.time, 30);
            res.sun.year.startYear = info.sun.year.time.split("-")[0];
        }
        if(Number(info.moon.year.time.split("-")[0]) === res.year){
            res.moon.year.zhu = getJiazi(info.moon.year.zhu,  tempMoon);
            res.moon.year.time = addYear(info.moon.year.time, 30);
            res.moon.year.startYear = info.moon.year.time.split("-")[0];
        }


        res.sun.season.zhu = info.sun.season.zhu;
        res.sun.season.time = info.sun.season.time;
        res.sun.season.startYear = info.sun.season.startYear;
        res.moon.season.zhu = info.moon.season.zhu;
        res.moon.season.time = info.moon.season.time;
        res.moon.season.startYear = info.moon.season.startYear;
        for(m = 0; m < res.sun.timeList.length; m++){
            dateS = res.sun.timeList[m];
            res.sun.season.timeListInfo[dateS] = info.sun.season.zhu;
            if(Number(info.sun.season.time.split("-")[0]) === res.year && dateS >= getMonthDay(res.year, info.sun.season.time)){
                res.sun.season.timeListInfo[dateS] = getJiazi(info.sun.season.zhu, tempSun);
                res.sun.season.timeListInfo[Object.keys(res.sun.year.timeListInfo)[Object.keys(res.sun.year.timeListInfo).length - 1]] = getJiazi(info.sun.season.zhu, tempSun);
            }
        }
        for(n = 0; n < res.moon.timeList.length; n++){
            dateM = res.moon.timeList[n];
            res.moon.season.timeListInfo[dateM] = info.moon.season.zhu;
            if(Number(info.moon.season.time.split("-")[0]) === res.year && dateM >= getMonthDay(res.year, info.moon.season.time)){
                res.moon.season.timeListInfo[dateM] = getJiazi(info.moon.season.zhu, tempMoon);
                res.moon.season.timeListInfo[Object.keys(res.moon.year.timeListInfo)[Object.keys(res.moon.year.timeListInfo).length - 1]] = getJiazi(info.moon.season.zhu, tempMoon);
            }
        }
        if(Number(info.sun.season.time.split("-")[0]) === res.year){
            res.sun.season.zhu = getJiazi(info.sun.season.zhu,  tempSun);
            res.sun.season.time = addYear(info.sun.season.time, 20);
            res.sun.season.startYear = info.sun.season.time.split("-")[0];
        }
        if(Number(info.moon.season.time.split("-")[0]) === res.year){
            res.moon.season.zhu = getJiazi(info.moon.season.zhu,  tempMoon);
            res.moon.season.time = addYear(info.moon.season.time, 20);
            res.moon.season.startYear = info.moon.season.time.split("-")[0];
        }


        res.sun.month.zhu = info.sun.month.zhu;
        res.sun.month.time = info.sun.month.time;
        res.sun.month.startYear = info.sun.month.startYear;
        res.moon.month.zhu = info.moon.month.zhu;
        res.moon.month.time = info.moon.month.time;
        res.moon.month.startYear = info.moon.month.startYear;
        for(m = 0; m < res.sun.timeList.length; m++){
            dateS = res.sun.timeList[m];
            res.sun.month.timeListInfo[dateS] = info.sun.month.zhu;
            if(Number(info.sun.month.time.split("-")[0]) === res.year && dateS >= getMonthDay(res.year, info.sun.month.time)){
                res.sun.month.timeListInfo[dateS] = getJiazi(info.sun.month.zhu, tempSun);
                res.sun.month.timeListInfo[Object.keys(res.sun.year.timeListInfo)[Object.keys(res.sun.year.timeListInfo).length - 1]] = getJiazi(info.sun.month.zhu, tempSun);
            }
        }
        for(n = 0; n < res.moon.timeList.length; n++){
            dateM = res.moon.timeList[n];
            res.moon.month.timeListInfo[dateM] = info.moon.month.zhu;
            if(Number(info.moon.month.time.split("-")[0]) === res.year && dateM >= getMonthDay(res.year, info.moon.month.time)){
                res.moon.month.timeListInfo[dateM] = getJiazi(info.moon.month.zhu, tempMoon);
                res.moon.month.timeListInfo[Object.keys(res.moon.year.timeListInfo)[Object.keys(res.moon.year.timeListInfo).length - 1]] = getJiazi(info.moon.month.zhu, tempMoon);
            }
        }
        if(Number(info.sun.month.time.split("-")[0]) === res.year){
            res.sun.month.zhu = getJiazi(info.sun.month.zhu,  tempSun);
            res.sun.month.time = addYear(info.sun.month.time, 10);
            res.sun.month.startYear = info.sun.month.time.split("-")[0];
        }
        if(Number(info.moon.month.time.split("-")[0]) === res.year){
            res.moon.month.zhu = getJiazi(info.moon.month.zhu,  tempMoon);
            res.moon.month.time = addYear(info.moon.month.time, 10);
            res.moon.month.startYear = info.moon.month.time.split("-")[0];
        }


        res.sun.day.zhu = info.sun.day.zhu;
        res.sun.day.time = info.sun.day.time;
        res.sun.day.startYear = info.sun.day.startYear;
        res.moon.day.zhu = info.moon.day.zhu;
        res.moon.day.time = info.moon.day.time;
        res.moon.day.startYear = info.moon.day.startYear;
        for(m = 0; m < res.sun.timeList.length; m++){
            dateS = res.sun.timeList[m];
            res.sun.day.timeListInfo[dateS] = info.sun.day.zhu;
            if(Number(info.sun.day.time.split("-")[0]) === res.year && dateS >= getMonthDay(res.year, info.sun.day.time)){
                res.sun.day.timeListInfo[dateS] = getJiazi(info.sun.day.zhu, tempDaySun);
                res.sun.day.timeListInfo[Object.keys(res.sun.year.timeListInfo)[Object.keys(res.sun.year.timeListInfo).length - 1]] = getJiazi(info.sun.day.zhu, tempDaySun);
            }
        }
        for(n = 0; n < res.moon.timeList.length; n++){
            dateM = res.moon.timeList[n];
            res.moon.day.timeListInfo[dateM] = info.moon.day.zhu;
            if(Number(info.moon.day.time.split("-")[0]) === res.year && dateM >= getMonthDay(res.year, info.moon.day.time)){
                res.moon.day.timeListInfo[dateM] = getJiazi(info.moon.day.zhu, tempDayMoon);
                res.moon.day.timeListInfo[Object.keys(res.moon.year.timeListInfo)[Object.keys(res.moon.year.timeListInfo).length - 1]] = getJiazi(info.moon.day.zhu, tempDayMoon);
            }
        }
        if(Number(info.sun.day.time.split("-")[0]) === res.year){
            res.sun.day.zhu = getJiazi(info.sun.day.zhu,  tempDaySun);
            res.sun.day.time = addYear(info.sun.day.time, 3);
            res.sun.day.startYear = info.sun.day.time.split("-")[0];
        }
        if(Number(info.moon.day.time.split("-")[0]) === res.year){
            res.moon.day.zhu = getJiazi(info.moon.day.zhu,  tempDayMoon);
            res.moon.day.time = addYear(info.moon.day.time, 3);
            res.moon.day.startYear = info.moon.day.time.split("-")[0];
        }


        res.sun.zhen.zhu = info.sun.zhen.zhu;
        res.sun.zhen.time = info.sun.zhen.time;
        res.sun.zhen.startYear = info.sun.zhen.startYear;
        res.moon.zhen.zhu = info.moon.zhen.zhu;
        res.moon.zhen.time = info.moon.zhen.time;
        res.moon.zhen.startYear = info.moon.zhen.startYear;
        for(m = 0; m < res.sun.timeList.length; m++){
            dateS = res.sun.timeList[m];
            res.sun.zhen.timeListInfo[dateS] = info.sun.zhen.zhu;
            if(Number(info.sun.zhen.time.split("-")[0]) === res.year && dateS >= getMonthDay(res.year, info.sun.zhen.time)){
                res.sun.zhen.timeListInfo[dateS] = getJiazi(info.sun.zhen.zhu, tempDaySun);
                res.sun.zhen.timeListInfo[Object.keys(res.sun.year.timeListInfo)[Object.keys(res.sun.year.timeListInfo).length - 1]] = getJiazi(info.sun.zhen.zhu, tempDaySun);
            }
        }
        for(n = 0; n < res.moon.timeList.length; n++){
            dateM = res.moon.timeList[n];
            res.moon.zhen.timeListInfo[dateM] = info.moon.zhen.zhu;
            if(Number(info.moon.zhen.time.split("-")[0]) === res.year && dateM >= getMonthDay(res.year, info.moon.zhen.time)){
                res.moon.zhen.timeListInfo[dateM] = getJiazi(info.moon.zhen.zhu, tempDayMoon);
                res.moon.zhen.timeListInfo[Object.keys(res.moon.year.timeListInfo)[Object.keys(res.moon.year.timeListInfo).length - 1]] = getJiazi(info.moon.zhen.zhu, tempDayMoon);
            }
        }
        if(Number(info.sun.zhen.time.split("-")[0]) === res.year){
            res.sun.zhen.zhu = getJiazi(info.sun.zhen.zhu,  tempDaySun);
            res.sun.zhen.time = addYear(info.sun.zhen.time, 2);
            res.sun.zhen.startYear = info.sun.zhen.time.split("-")[0];
        }
        if(Number(info.moon.zhen.time.split("-")[0]) === res.year){
            res.moon.zhen.zhu = getJiazi(info.moon.zhen.zhu,  tempDayMoon);
            res.moon.zhen.time = addYear(info.moon.zhen.time, 2);
            res.moon.zhen.startYear = info.moon.zhen.time.split("-")[0];
        }


        res.sun.time.zhu = info.sun.time.zhu;
        res.sun.time.time = info.sun.time.time;
        res.sun.time.startYear = info.sun.time.startYear;
        res.moon.time.zhu = info.moon.time.zhu;
        res.moon.time.time = info.moon.time.time;
        res.moon.time.startYear = info.moon.time.startYear;
        for(m = 0; m < res.sun.timeList.length; m++){
            dateS = res.sun.timeList[m];
            res.sun.time.timeListInfo[dateS] = info.sun.time.zhu;
            if(Number(info.sun.time.time.split("-")[0]) === res.year && dateS >= getMonthDay(res.year, info.sun.time.time)){
                res.sun.time.timeListInfo[dateS] = getJiazi(info.sun.time.zhu, tempDaySun);
                res.sun.time.timeListInfo[Object.keys(res.sun.year.timeListInfo)[Object.keys(res.sun.year.timeListInfo).length - 1]] = getJiazi(info.sun.time.zhu, tempDaySun);
            }
        }
        for(n = 0; n < res.moon.timeList.length; n++){
            dateM = res.moon.timeList[n];
            res.moon.time.timeListInfo[dateM] = info.moon.time.zhu;
            if(Number(info.moon.time.time.split("-")[0]) === res.year && dateM >= getMonthDay(res.year, info.moon.time.time)){
                res.moon.time.timeListInfo[dateM] = getJiazi(info.moon.time.zhu, tempDayMoon);
                res.moon.time.timeListInfo[Object.keys(res.moon.year.timeListInfo)[Object.keys(res.moon.year.timeListInfo).length - 1]] = getJiazi(info.moon.time.zhu, tempDayMoon);
            }
        }
        if(Number(info.sun.time.time.split("-")[0]) === res.year){
            res.sun.time.zhu = getJiazi(info.sun.time.zhu,  tempDaySun);
            res.sun.time.time = addYear(info.sun.time.time, 1);
            res.sun.time.startYear = info.sun.time.time.split("-")[0];
        }
        if(Number(info.moon.time.time.split("-")[0]) === res.year){
            res.moon.time.zhu = getJiazi(info.moon.time.zhu,  tempDayMoon);
            res.moon.time.time = addYear(info.moon.time.time, 1);
            res.moon.time.startYear = info.moon.time.time.split("-")[0];
        }

        list.push(res);
        info = res;
    }
    return list;
}

///集合取交集
Array.intersect = function () {
    var result = new Array();
    var obj = {};
    for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
            }
            else {
                obj[str]++;
                if (obj[str] === arguments.length)
                {
                    result.push(str);
                }
            }//end else
        }//end for j
    }//end for i
    return result;
};
function getYinByZhi(gan, zhi){
    var wxGan;
    var new_arr = [];
    for(var o=0;o<zhi.length;o++) {
        var items=zhi[o];
        //判断元素是否存在于new_arr中，如果不存在则插入到new_arr的最后
        if(inArray(items,new_arr)===-1) {
            new_arr.push(items);
        }
    }
    zhi = new_arr;
    for(var keyGan in tianGanWuX){
        for(var i = 0; i < tianGanWuX[keyGan].length; i++){
            if(gan === tianGanWuX[keyGan][i]){
                wxGan = keyGan;
                break;
            }
        }
    }
    var res = [];
    for(var keyZhi in sanHeSanH){
        for(var j = 0; j < sanHeSanH[keyZhi].length; j++){
            var wuXing = {
                wx: null,
                zhi: null
            };
            if(Array.intersect(zhi,sanHeSanH[keyZhi][j]).sort().toString() === sanHeSanH[keyZhi][j].sort().toString()){
                wuXing.wx = keyZhi;
                wuXing.zhi = sanHeSanH2[keyZhi][j];
                res.push(wuXing);
            }
        }
    }
    var info = [];
    for(var n = 0; n < res.length; n++){
        if(res[n].wx === wxGan){
            info.push(res[n].zhi.join("") + res[n].wx + "比局");
        }else{
            for(var keySK in wuXingSK){
                for(var m = 0; m < wuXingSK[keySK].length; m++){
                    if(wuXingSK[keySK][m] === wxGan && keySK === "s" && wuXingSK[keySK][m === 0?4:m-1] === res[n].wx){
                        info.push(res[n].zhi.join("") + res[n].wx + "印局");
                    }
                    if(wuXingSK[keySK][m] === wxGan && keySK === "k" && wuXingSK[keySK][m === 0?4:m-1] === res[n].wx){
                        info.push(res[n].zhi.join("") + res[n].wx + "官局");
                    }
                    if(wuXingSK[keySK][m] === wxGan && keySK === "s" && wuXingSK[keySK][m === 4?0:m+1] === res[n].wx){
                        info.push(res[n].zhi.join("") + res[n].wx + "食局");
                    }
                    if(wuXingSK[keySK][m] === wxGan && keySK === "k" && wuXingSK[keySK][m === 4?0:m+1] === res[n].wx){
                        info.push(res[n].zhi.join("") + res[n].wx + "财局");
                    }
                }
            }
        }
    }
    return info;
}
function getYinByZhiForYear(gan, zhi, YZ, SZ){
    var wxGan;
    var new_arr = [];
    for(var o=0;o<zhi.length;o++) {
        var items=zhi[o];
        //判断元素是否存在于new_arr中，如果不存在则插入到new_arr的最后
        if(inArray(items,new_arr)===-1) {
            new_arr.push(items);
        }
    }
    zhi = new_arr;

    for(var keyGan in tianGanWuX){
        for(var i = 0; i < tianGanWuX[keyGan].length; i++){
            if(gan === tianGanWuX[keyGan][i]){
                wxGan = keyGan;
                break;
            }
        }
    }
    var res = [];
    for(var keyZhi in sanHeSanH){
        for(var j = 0; j < sanHeSanH[keyZhi].length; j++){
            var wuXing = {
                wx: null,
                zhi: null
            };
            if(Array.intersect(zhi,sanHeSanH[keyZhi][j]).sort().toString() === sanHeSanH[keyZhi][j].sort().toString() && (sanHeSanH[keyZhi][j].toString().indexOf(YZ) !== -1 || sanHeSanH[keyZhi][j].toString().indexOf(SZ) !== -1)){
                wuXing.wx = keyZhi;
                wuXing.zhi = sanHeSanH2[keyZhi][j];
                res.push(wuXing);
            }
        }
    }
    var info = [];
    for(var n = 0; n < res.length; n++){
        if(res[n].wx === wxGan){
            info.push(res[n].zhi.join("") + res[n].wx + "比局");
        }else{
            for(var keySK in wuXingSK){
                for(var m = 0; m < wuXingSK[keySK].length; m++){
                    if(wuXingSK[keySK][m] === wxGan && keySK === "s" && wuXingSK[keySK][m === 0?4:m-1] === res[n].wx){
                        info.push(res[n].zhi.join("") + res[n].wx + "印局");
                    }
                    if(wuXingSK[keySK][m] === wxGan && keySK === "k" && wuXingSK[keySK][m === 0?4:m-1] === res[n].wx){
                        info.push(res[n].zhi.join("") + res[n].wx + "官局");
                    }
                    if(wuXingSK[keySK][m] === wxGan && keySK === "s" && wuXingSK[keySK][m === 4?0:m+1] === res[n].wx){
                        info.push(res[n].zhi.join("") + res[n].wx + "食局");
                    }
                    if(wuXingSK[keySK][m] === wxGan && keySK === "k" && wuXingSK[keySK][m === 4?0:m+1] === res[n].wx){
                        info.push(res[n].zhi.join("") + res[n].wx + "财局");
                    }
                }
            }
        }
    }
    return info;
}

function getAllData(year, month, day, time, lon, sex){
    var rhythmList = null;
    var rhythmOne = {};
    var allData = {};
    var ob = bazi(year, month, day, time, lon);
    if(time.split(":").length < 3){
        time = time + ":00";
    }
    sex=Number(sex);
    var sexFor = "";
    if(sex === 0){
        sexFor = "乾造";
    }else{
        sexFor = "坤造";
    }

    var startTime = toDate(year, month, day, time.split(":")[0], time.split(":")[1], time.split(":")[2]);
    var dateYVal = calendar.solar2lunar(year, month, day);
    var str1 = ob.bz_jn;
    var str2 = ob.bz_jy.substr(1, 1);
    var str3 = ob.bz_jy;
    var str4 = ob.bz_jr;
    var str5 = ob.bz_js;
    var str6 = str5.substr(1, 1);
    var jizStr = getJizhen(str1, str2, forTuneList);
    var zhenStr = getJizhen(str4, str6, zhenList);

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

    var ganSun = str4.substr(0, 1);
    var zhiSun = [str1.substr(1, 1), jizStr.substr(1, 1), str3.substr(1, 1), str4.substr(1, 1), zhenStr.substr(1, 1), str5.substr(1, 1)];
    var wxInfoSun = getYinByZhi(ganSun, zhiSun);

    var ganMoon = str7.substr(0, 1);
    var zhiMoon = [str1.substr(1, 1), jizStr.substr(1, 1), str3.substr(1, 1), str7.substr(1, 1), str9.substr(1, 1), str8.substr(1, 1)];
    var wxInfoMoon = getYinByZhi(ganMoon, zhiMoon);

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

        rhythmList[i].sun.wxInfo = sunInfo;
        rhythmList[i].moon.wxInfo = moonInfo;
    }

    allData.yangLiDate = {
        year: year,
        month: month,
        day: day,
        time: time,
        diFangTime: ob.bz_zty
    };
    allData.yinLiDate = {
        year: dateYVal.gzYear,
        month: dateYVal.IMonthCn,
        day: dateYVal.IDayCn
    };
    allData.sexFor = sexFor;
    allData.currentYearZhuData = {
        sun: {
            nianZhu: str1,
            jiZhu: jizStr,
            yueZhu: str3,
            riZhu: str4,
            zhenZhu: zhenStr,
            shiZhu: str5,
            rhyDate: {
                yearDate: yearDate,
                seasonDate: seasonDate,
                monthDate: monthDate,
                dayDate: dayDateSun,
                zhenDate: zhenDateSun,
                shiDate: shiDateSun
            },
            rhy: {
                yearRhyDate: yearRhyDate,
                seasonRhyDate: seasonRhyDate,
                monthRhyDate: monthRhyDate,
                dayRhyDate: dayRhyDateSun,
                zhenRhyDate: zhenRhyDateSun,
                shiRhyDate: shiRhyDateSun
            },
            wxInfo: wxInfoSun
        },
        moon: {
            nianZhu: str1,
            jiZhu: jizStr,
            yueZhu: str3,
            riZhu: str7,
            zhenZhu: str9,
            shiZhu: str8,
            rhyDate: {
                yearDate: yearDate,
                seasonDate: seasonDate,
                monthDate: monthDate,
                dayDate: dayDateMoon,
                zhenDate: zhenDateMoon,
                shiDate: shiDateMoon
            },
            rhy: {
                yearRhyDate: yearRhyDate,
                seasonRhyDate: seasonRhyDate,
                monthRhyDate: monthRhyDate,
                dayRhyDate: dayRhyDateMoon,
                zhenRhyDate: zhenRhyDateMoon,
                shiRhyDate: shiRhyDateMoon
            },
            wxInfo: wxInfoMoon
        }
    };
    allData.allRhy = rhythmList;
    return allData;
}

