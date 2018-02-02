package com.jk.measure.mapper;

import com.jk.measure.model.GlobalLocation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GlobalLocationMapper {

    List<GlobalLocation> selectState();

    GlobalLocation selectGlobal(Integer id);

    @Transactional
    void updateGlobal(List<GlobalLocation> list);

}