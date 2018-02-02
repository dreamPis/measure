package com.jk.measure.service.impl;

import com.jk.measure.mapper.AreaMapper;
import com.jk.measure.model.Area;
import com.jk.measure.service.AreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "areaService")
public class AreaServiceImpl implements AreaService{

    @Autowired
    private AreaMapper areaMapper;

    @Override
    public List<Area> getAreaByChina(String name) {
        return areaMapper.getAreaByChina(name);
    }

    @Override
    public List<Area> getAreaByOther(String name) {
        return areaMapper.getAreaByOther(name);
    }

    @Override
    public List<Area> getAreaCity(String name) {
        return areaMapper.getAreaCity(name);
    }

    @Override
    public List<Area> getAreaByCountry() {
        return areaMapper.getAreaByCountry();
    }
}
