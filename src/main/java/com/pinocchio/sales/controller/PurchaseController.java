package com.pinocchio.sales.controller;

import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.CompanyVo;
import com.pinocchio.sales.dto.PurchaseVo;
import com.pinocchio.sales.service.CompanyService;
import com.pinocchio.sales.service.PurchaseService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Locale;

@Controller
public class PurchaseController extends AbstractBaseController<PurchaseController> {

    private final PurchaseService purchaseService;
    private final CompanyService companyService;

    public PurchaseController(PurchaseService purchaseService, CompanyService companyService) {
        this.purchaseService = purchaseService;
        this.companyService = companyService;
    }

    @GetMapping("/purchase/list")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, PurchaseVo salesVo) {

        List<PurchaseVo> salesList = purchaseService.getPurchaseList(new PurchaseVo());
        model.addAttribute("salesList", salesList);

        return "purchase/purchaseList";
    }

    @GetMapping("/purchase/detail")
    public String detail(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, PurchaseVo salesVo) {

        PurchaseVo salesDetail = purchaseService.getPurchaseDetail(salesVo);
        model.addAttribute("salesDetail", salesDetail);

        return "purchase/purchaseDetail";
    }

    @GetMapping("/purchase/register")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, PurchaseVo salesVo) {

        List<CompanyVo> companyList = companyService.getCompanyList(new CompanyVo());
        model.addAttribute("companyList", companyList);

        if (salesVo.getSeq() != null) {
            PurchaseVo salesDetail = purchaseService.getPurchaseDetail(salesVo);
            model.addAttribute("salesDetail", salesDetail);
        } else {
            model.addAttribute("salesDetail", salesVo);
        }

        return "purchase/purchaseRegister";
    }

}
