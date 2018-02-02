package com.jk.measure.service;

import com.jk.measure.model.GlobalLocation;

import java.util.List;

public interface GlobalLocationService {

    List<GlobalLocation> selectState();

    GlobalLocation selectGlobal(Integer id);

    List<GlobalLocation> selectList();

    void updateGlobal(List<GlobalLocation> list);
}
