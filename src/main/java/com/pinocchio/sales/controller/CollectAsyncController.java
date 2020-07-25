package com.pinocchio.sales.controller;

import com.google.gson.Gson;
import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.CollectVo;
import com.pinocchio.sales.dto.FabricVo;
import com.pinocchio.sales.service.CollectService;
import com.pinocchio.sales.service.FabricService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
public class CollectAsyncController extends AbstractBaseController<CollectAsyncController> {

    private final CollectService collectService;

    public CollectAsyncController(CollectService collectService) {
        this.collectService = collectService;
    }

    @PostMapping("/collect/ajaxList")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, CollectVo collectVO) {

        List<CollectVo> collectList =  collectService.getCollectList(collectVO);
        int collectListCount = collectService.getCollectListCount(collectVO);

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("data", collectList);
        map.put("recordsFiltered", collectListCount);
        map.put("recordsTotal", collectListCount);

        return gson.toJson(map);
    }

    @PostMapping("/collect/ajaxRegister")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, CollectVo collectVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        collectVo.setRegisterId("admin");
        collectService.setCollectData(collectVo);

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/collect/ajaxModify")
    public String modify(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, CollectVo collectVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        collectVo.setRegisterId("admin");
        collectService.updateCollectData(collectVo);

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/collect/ajaxRemove")
    public String remove(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, @RequestParam String collectSeqs) {

        Gson gson = new Gson();
        Map<String, Object> seq = new HashMap<String, Object>();

        seq.put("seq", collectSeqs.split(","));
        collectService.deleteCollectData(seq);
        seq.put("successCount", 1);

        return gson.toJson(seq);
    }

}
