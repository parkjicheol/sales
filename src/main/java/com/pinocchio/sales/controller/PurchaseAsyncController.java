package com.pinocchio.sales.controller;

import com.google.gson.Gson;
import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.PurchaseVo;
import com.pinocchio.sales.service.PurchaseService;
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
public class PurchaseAsyncController extends AbstractBaseController<PurchaseAsyncController> {

    private final PurchaseService purchaseService;

    public PurchaseAsyncController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @PostMapping("/purchase/ajaxList")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, PurchaseVo purchaseVo) {

        List<PurchaseVo> purchaseList =  purchaseService.getPurchaseList(purchaseVo);
        int purchaseListCount = purchaseService.getPurchaseListCount(purchaseVo);

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("data", purchaseList);
        map.put("recordsFiltered", purchaseListCount);
        map.put("recordsTotal", purchaseListCount);

        return gson.toJson(map);
    }

    @PostMapping("/purchase/ajaxRegister")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, PurchaseVo purchaseVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        purchaseVo.setRegisterId("admin");
        purchaseService.setPurchaseData(purchaseVo);

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/purchase/ajaxModify")
    public String modify(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, PurchaseVo purchaseVo) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        purchaseVo.setRegisterId("admin");
        purchaseService.updatePurchaseData(purchaseVo);

        map.put("successCount", 1);

        return gson.toJson(map);
    }

    @PostMapping("/purchase/ajaxRemove")
    public String remove(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, @RequestParam String purchaseSeqs) {

        Gson gson = new Gson();
        HashMap<String, Object> seq = new HashMap<String, Object>();

        seq.put("seq", purchaseSeqs.split(","));
        purchaseService.deletePurchaseData(seq);

        seq.put("successCount", 1);

        return gson.toJson(seq);
    }

}
