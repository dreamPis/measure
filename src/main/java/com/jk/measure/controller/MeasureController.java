package com.jk.measure.controller;

import com.alibaba.fastjson.JSONObject;
import com.jk.measure.httpVo.MeasurceAllData;
import com.jk.measure.utils.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;

@RestController
@RequestMapping("/me/measure")
public class MeasureController {

    @RequestMapping(value = "/rhyData", method = RequestMethod.POST)
    public MeasurceAllData rhyData(@RequestParam int year, @RequestParam int month,
                                   @RequestParam int day, @RequestParam String time,
                                   @RequestParam String lng, @RequestParam int sex) throws IOException {
        JSONObject res = MeasureUtils.getInstance().getRhtData(year, month, day, time, lng, sex);
        String str = res.toJSONString();
        return JSONObject.parseObject(str, MeasurceAllData.class);
    }

}
