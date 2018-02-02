package com.jk.measure.service.impl;

import com.google.common.collect.Lists;
import com.jk.measure.mapper.GlobalLocationMapper;
import com.jk.measure.model.GlobalLocation;
import com.jk.measure.service.GlobalLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service(value = "globalLocationService")
public class GlobalLocationServiceImpl implements GlobalLocationService {

    @Autowired
    private GlobalLocationMapper globalLocationMapper;

    @Override
    public List<GlobalLocation> selectState() {
        List<GlobalLocation> states = globalLocationMapper.selectState();
        return AssembleList(states, 1);
    }

    @Override
    public GlobalLocation selectGlobal(Integer id) {
        return globalLocationMapper.selectGlobal(id);
    }

    @Override
    public List<GlobalLocation> selectList() {
        return globalLocationMapper.selectState();
    }

    @Override
    public void updateGlobal(List<GlobalLocation> list) {
        globalLocationMapper.updateGlobal(list);
    }

    private List<GlobalLocation> AssembleList(List<GlobalLocation> list, int level){
        List<GlobalLocation> state;
        state = list.stream().filter(o -> o.getLevel() == level).collect(Collectors.toList());
        if(level < 3) {
            List<GlobalLocation> list1 = AssembleList(list, level + 1);
            state.forEach(o -> o.setGlobals(list1.stream().filter(o1 -> o.getId().equals(o1.getPid())).collect(Collectors.toList())));
        }
        return state;
    }
}
