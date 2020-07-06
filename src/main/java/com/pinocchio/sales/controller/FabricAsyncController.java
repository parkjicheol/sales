package com.pinocchio.sales.controller;

import com.google.gson.Gson;
import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.FabricVo;
import com.pinocchio.sales.service.FabricService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
public class FabricAsyncController extends AbstractBaseController<FabricAsyncController> {

    private final FabricService fabricService;

    public FabricAsyncController(FabricService fabricService) {
        this.fabricService = fabricService;
    }

    @PostMapping("/fabric/ajaxList")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, FabricVo fabricVo) {

        List<FabricVo> fabricList =  fabricService.getFabricList(fabricVo);
        int fabricListCount = fabricService.getFabricListCount(fabricVo);

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("data", fabricList);
        map.put("recordsFiltered", fabricListCount);
        map.put("recordsTotal", fabricListCount);

        return gson.toJson(map);
    }

    @PostMapping("/fabric/ajaxRegister")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, FabricVo fabricVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/fabric/ajaxModify")
    public String modify(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, FabricVo fabricVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/fabric/ajaxRemove")
    public String remove(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, @RequestParam String fabricSeqs) {

        Gson gson = new Gson();
        Map<String, Object> seq = new HashMap<String, Object>();

        seq.put("seq", fabricSeqs.split(","));
        fabricService.deleteFabricData(seq);
        seq.put("successCount", 1);

        return gson.toJson(seq);
    }

}
