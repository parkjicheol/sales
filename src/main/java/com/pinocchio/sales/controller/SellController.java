package com.pinocchio.sales.controller;

import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.CompanyVo;
import com.pinocchio.sales.dto.SellVo;
import com.pinocchio.sales.service.CompanyService;
import com.pinocchio.sales.service.SellService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Locale;

@Controller
public class SellController extends AbstractBaseController<SellController> {

    private final SellService sellService;
    private final CompanyService companyService;

    public SellController(SellService sellService, CompanyService companyService) {
        this.sellService = sellService;
        this.companyService = companyService;
    }

    @GetMapping("/sell/list")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SellVo salesVo) {

        List<SellVo> salesList = sellService.getSellList(new SellVo());
        model.addAttribute("salesList", salesList);

        return "sell/sellList";
    }

    @GetMapping("/sell/detail")
    public String detail(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SellVo salesVo) {

        SellVo salesDetail = sellService.getSellDetail(salesVo);
        model.addAttribute("salesDetail", salesDetail);

        return "sell/sellDetail";
    }

    @GetMapping("/sell/register")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SellVo salesVo) {

        List<CompanyVo> companyList = companyService.getCompanyList(new CompanyVo());
        model.addAttribute("companyList", companyList);

        if (salesVo.getSeq() != null) {
            SellVo salesDetail = sellService.getSellDetail(salesVo);
            model.addAttribute("salesDetail", salesDetail);
        } else {
            model.addAttribute("salesDetail", salesVo);
        }

        return "sell/sellRegister";
    }

}
