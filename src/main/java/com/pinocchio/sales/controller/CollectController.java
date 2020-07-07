package com.pinocchio.sales.controller;

import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.CollectVo;
import com.pinocchio.sales.dto.FabricVo;
import com.pinocchio.sales.service.CollectService;
import com.pinocchio.sales.service.FabricService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Locale;

@Controller
public class CollectController extends AbstractBaseController<CollectController> {

    private final CollectService collectService;

    public CollectController(CollectService collectService) {
        this.collectService = collectService;
    }

    @GetMapping("/collect/list")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, CollectVo collectVo) {

        List<CollectVo> collectList = collectService.getCollectList(collectVo);
        model.addAttribute("collectList", collectList);

        return "collect/collectList";
    }

    @GetMapping("/collect/detail")
    public String detail(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, CollectVo collectVo) {

        CollectVo collectDetail = collectService.getCollectDetail(collectVo);
        model.addAttribute("collectDetail", collectDetail);

        return "collect/collectDetail";
    }
    /*
    @GetMapping("/fabric/register")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, FabricVo fabricVo) {

        if (fabricVo.getSeq() != null) {
            FabricVo fabricDetail = fabricService.getFabricDetail(fabricVo);
            model.addAttribute("fabricDetail", fabricDetail);
        } else {
            model.addAttribute("fabricDetail", fabricVo);
        }

        return "fabric/fabricRegister";
    }*/

}
