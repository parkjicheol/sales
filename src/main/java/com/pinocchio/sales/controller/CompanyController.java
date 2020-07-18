package com.pinocchio.sales.controller;

import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.CompanyVo;
import com.pinocchio.sales.service.CompanyService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Locale;

@Controller
public class CompanyController extends AbstractBaseController<CompanyController> {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/company/list")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, CompanyVo companyVo) {

        List<CompanyVo> companyList = companyService.getCompanyList(new CompanyVo());
        model.addAttribute("companyList", companyList);

        return "company/companyList";
    }

    @GetMapping("/company/detail")
    public String detail(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, CompanyVo companyVo) {

        CompanyVo companyDetail = companyService.getCompanyDetail(companyVo);
        model.addAttribute("companyDetail", companyDetail);

        return "company/companyDetail";
    }

    @GetMapping("/company/register")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, CompanyVo companyVo) {

        if (companyVo.getSeq() != null) {
            CompanyVo companyDetail = companyService.getCompanyDetail(companyVo);
            model.addAttribute("companyDetail", companyDetail);
        } else {
            model.addAttribute("companyDetail", companyVo);
        }

        return "company/companyRegister";
    }

}
