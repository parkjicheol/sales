package com.pinocchio.sales.controller;

import com.google.gson.Gson;
import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.SellVo;
import com.pinocchio.sales.service.SellService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/servlet")
public class SellAsyncController extends AbstractBaseController<SellAsyncController> {

    private final SellService sellService;

    public SellAsyncController(SellService sellService) {
        this.sellService = sellService;
    }

    @PostMapping("/sell/ajaxList")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, SellVo sellVo) {

        List<SellVo> sellList =  sellService.getSellList(sellVo);
        int sellListCount = sellService.getSellListCount(sellVo);

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("data", sellList);
        map.put("recordsFiltered", sellListCount);
        map.put("recordsTotal", sellListCount);

        return gson.toJson(map);
    }

    @PostMapping("/sell/ajaxRegister")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SellVo sellVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        sellVo.setRegisterId("admin");
        sellService.setSellData(sellVo);

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/sell/ajaxModify")
    public String modify(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SellVo sellVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        sellVo.setRegisterId("admin");
        sellService.updateSellData(sellVo);

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/sell/ajaxRemove")
    public String remove(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, @RequestParam String sellSeqs) {

        Gson gson = new Gson();
        HashMap<String, Object> seq = new HashMap<String, Object>();

        seq.put("seq", sellSeqs.split(","));
        sellService.deleteSellData(seq);
        seq.put("successCount", 1);

        return gson.toJson(seq);
    }

}
