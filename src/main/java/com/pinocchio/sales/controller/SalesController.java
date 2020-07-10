package com.pinocchio.sales.controller;

import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.FabricVo;
import com.pinocchio.sales.dto.SalesVo;
import com.pinocchio.sales.service.FabricService;
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
public class SalesController extends AbstractBaseController<SalesController> {

    private final SalesService salesService;
    private final FabricService fabricService;

    public SalesController(SalesService salesService, FabricService fabricService) {
        this.salesService = salesService;
        this.fabricService = fabricService;
    }

    @GetMapping("/sales/list")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SalesVo salesVo) {

        List<SalesVo> salesList = salesService.getSalesList(new SalesVo());
        model.addAttribute("salesList", salesList);

        return "sales/salesList";
    }

    @GetMapping("/sales/detail")
    public String detail(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SalesVo salesVo) {

        SalesVo salesDetail = salesService.getSalesDetail(salesVo);
        model.addAttribute("salesDetail", salesDetail);

        return "sales/salesDetail";
    }

    @GetMapping("/sales/register")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, SalesVo salesVo) {

        if (salesVo.getSeq() != null) {
            SalesVo salesDetail = salesService.getSalesDetail(salesVo);
            model.addAttribute("salesDetail", salesDetail);
        } else {
            model.addAttribute("salesDetail", salesVo);
        }

        List<FabricVo> fabricList = fabricService.getFabricList(new FabricVo());
        model.addAttribute("fabricList", fabricList);

        return "sales/salesRegister";
    }

}
