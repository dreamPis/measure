package com.jk.measure.mapper;

import com.jk.measure.model.Area;

import java.util.List;

public interface AreaMapper {

    List<Area> getAreaByChina(String name);

    List<Area> getAreaByOther(String name);

    List<Area> getAreaCity(String name);

    List<Area> getAreaByCountry();
}