package com.pinocchio.sales.controller;

import com.google.gson.Gson;
import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.SalesVo;
import com.pinocchio.sales.service.SalesService;
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

@RestController
public class SalesAsyncController extends AbstractBaseController<SalesAsyncController> {

    private final SalesService salesService;

    public SalesAsyncController(SalesService salesService) {
        this.salesService = salesService;
    }

    @PostMapping("/sales/ajaxList")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, SalesVo salesVo) {

        List<SalesVo> salesList =  salesService.getSalesList(salesVo);
        int salesListCount = salesService.getSalesListCount(salesVo);

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("data", salesList);
        map.put("recordsFiltered", salesListCount);
        map.put("recordsTotal", salesListCount);

        return gson.toJson(map);
    }

    @PostMapping("/sales/ajaxRegister")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SalesVo salesVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/sales/ajaxModify")
    public String modify(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SalesVo salesVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/sales/ajaxRemove")
    public String remove(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, @RequestParam String salesSeqs) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("successCount", 1);

        return gson.toJson(map);
    }

}
