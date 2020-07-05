package com.pinocchio.sales.controller;

import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.SalesVo;
import com.pinocchio.sales.service.SalesService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Locale;

@Controller
public class ReportController extends AbstractBaseController<ReportController> {

    private final SalesService salesService;

    public ReportController(SalesService salesService) {
        this.salesService = salesService;
    }

    @GetMapping("/report/list")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SalesVo salesVo) {

        List<SalesVo> salesList = salesService.getSalesList(new SalesVo());
        model.addAttribute("salesList", salesList);

        return "report/reportList";
    }
}
