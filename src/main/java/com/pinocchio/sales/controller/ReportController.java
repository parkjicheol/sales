package com.pinocchio.sales.controller;

import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.CollectVo;
import com.pinocchio.sales.dto.SalesVo;
import com.pinocchio.sales.service.ReportService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.atomic.AtomicReference;

@Controller
public class ReportController extends AbstractBaseController<ReportController> {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/report/list")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model) {

        LocalDate currentDate = LocalDate.now();
        model.addAttribute("year", currentDate.getYear());
        model.addAttribute("month", currentDate.getMonthValue());

        return getReportList(model, currentDate);
    }

    @GetMapping("/report/list/{year}/{month}")
    public String search(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model,
                         @PathVariable("year") String year, @PathVariable("month") String month) {

        LocalDate currentDate = LocalDate.of(Integer.parseInt(year), Integer.parseInt(month), 1);
        model.addAttribute("year", year);
        model.addAttribute("month", month);

        return getReportList(model, currentDate);

    }

    private String getReportList(Model model, LocalDate currentDate) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM");
        String startString = currentDate.format(dateTimeFormatter) + "-01";
        currentDate = currentDate.plusMonths(1L);
        String finishString = currentDate.format(dateTimeFormatter) + "-01";

        SalesVo salesVo = new SalesVo();
        salesVo.setStartDate(startString);
        salesVo.setFinishDate(finishString);

        List<SalesVo> salesList = reportService.getSalesList(salesVo);
        model.addAttribute("salesList", salesList);

        Double sumSection = 0D;
        Double sumFabricCount = 0D;
        Double sumDeduction = 0D;
        Double sumPrice = 0D;
        Double sumTax = 0D;

        Double sumSectionReturn = 0D;
        Double sumFabricCountReturn = 0D;
        Double sumDeductionReturn = 0D;
        Double sumReturnPrice = 0D;

        for (SalesVo sales : salesList) {

            if (sales.getSaleFlag() == 0) {
                sumSection += sales.getSection();
                sumFabricCount += sales.getFabricCount();
                sumDeduction += sales.getDeduction();
                sumPrice += sales.getPrice();
                sumTax += sales.getTax();
            } else {
                sumSectionReturn += sales.getSection();
                sumFabricCountReturn += sales.getFabricCount();
                sumDeductionReturn += sales.getDeduction();
                sumReturnPrice += sales.getPrice();
            }

        }

        model.addAttribute("sumSection", sumSection);
        model.addAttribute("sumFabricCount", sumFabricCount);
        model.addAttribute("sumDeduction", sumDeduction);
        model.addAttribute("sumPrice", sumPrice);
        model.addAttribute("sumTax", sumTax);

        model.addAttribute("sumSectionReturn", sumSectionReturn);
        model.addAttribute("sumFabricCountReturn", sumFabricCountReturn);
        model.addAttribute("sumDeductionReturn", sumDeductionReturn);
        model.addAttribute("sumReturnPrice", sumReturnPrice);

        CollectVo collectVo = new CollectVo();
        collectVo.setStartDate(startString);
        collectVo.setFinishDate(finishString);

        List<CollectVo> collectList = reportService.getCollectList(collectVo);
        model.addAttribute("collectList", collectList);

        Double sumCollectPrice = collectList
                .stream()
                .mapToDouble(CollectVo::getPrice)
                .sum();

        model.addAttribute("sumCollectPrice", sumCollectPrice);

        return "report/reportList";
    }

}
