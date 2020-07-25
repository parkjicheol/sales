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

    @GetMapping("/sales/report")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model) {

        LocalDate currentDate = LocalDate.now();
        model.addAttribute("year", currentDate.getYear());
        model.addAttribute("month", currentDate.getMonthValue());

        return getReportList(model, currentDate);
    }

    @GetMapping("/sales/report/{year}/{month}")
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

        salesVo.setSaleFlag((byte) 0);
        SalesVo collectTotalVo = reportService.getSalesTotalList(salesVo);

        model.addAttribute("collectTotal", collectTotalVo);

        salesVo.setSaleFlag((byte) 1);
        SalesVo returnTotalVo = reportService.getSalesTotalList(salesVo);

        model.addAttribute("returnTotal", returnTotalVo);

        CollectVo collectVo = new CollectVo();
        collectVo.setStartDate(startString);
        collectVo.setFinishDate(finishString);

        List<CollectVo> collectList = reportService.getCollectList(collectVo);
        model.addAttribute("collectList", collectList);

        int collectTotalPrice = reportService.getCollectTotalPrice(collectVo);

//        Double sumCollectPrice = collectList
//                .stream()
//                .mapToDouble(CollectVo::getPrice)
//                .sum();

        model.addAttribute("collectTotalPrice", collectTotalPrice);

        return "report/salesList";
    }

}
