package com.jk.measure.utils;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.IOException;


public class MeasureUtils {

    private volatile static MeasureUtils instance;
    private MeasureUtils(){
        System.out.println("Singleton has loaded");
    }
    public static MeasureUtils getInstance(){
        if(instance==null){
            synchronized (MeasureUtils.class){
                if(instance==null){
                    instance=new MeasureUtils();
                }
            }
        }
        return instance;
    }

    /**
     * 获取节气
     * @param year
     * @param month
     * @return
     * @throws IOException
     */
    public JSONObject getRhtData(int year, int month, int day, String time, String lng, int sex) throws IOException {
        String url = "http://192.168.1.50:8383/js";
        CloseableHttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(url);
        StringEntity entity = new StringEntity("getAllData,"+year+","+month+","+day+","+time+","+lng+","+ sex, "utf-8");
        entity.setContentType("text/plain;charset=UTF-8");
        entity.setContentEncoding("utf-8");
        post.setEntity(entity);
        HttpResponse response = httpClient.execute(post);
        return JSONObject.parseObject(EntityUtils.toString(response.getEntity()));
    }
}
