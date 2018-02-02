package com.jk.measure.utils;

public class CalendarUtils {

    private static final int[] solarMonth = {31,28,31,30,31,30,31,31,30,31,30,31};

    public static final String nStr3[] = {"正","二","三","四","五","六","七","八","九","十","冬","腊"};
    private static final String solarTerm[] = {"小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"};


    public static int solarDays(int y, int m){
        if(m > 12 || m < 1){
            return  -1;
        }
        int month = m - 1;
        if(month == 1){
            return ((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29 : 28;
        }else{
            return solarMonth[month];
        }
    }

    public static LunarDate solar2lunar(int y, int m, int d){
        LunarCalendar calendar = new LunarCalendar(DateTimeUtils.toDate(y, m, d));
        return calendar.getDayLunarDate();
    }

}
