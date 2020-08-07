package com.pinocchio.sales.controller;

import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.dto.FabricVo;
import com.pinocchio.sales.service.FabricService;

import lombok.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Locale;

@Controller
@RequestMapping("/servlet")
public class FabricController extends AbstractBaseController<FabricController> {

    private final FabricService fabricService;

    public FabricController(FabricService fabricService) {
        this.fabricService = fabricService;
    }

    @GetMapping("/fabric/list")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, FabricVo fabricVo) {

        List<FabricVo> fabricList = fabricService.getFabricList(new FabricVo());
        model.addAttribute("fabricList", fabricList);

        return "fabric/fabricList";
    }

    @GetMapping("/fabric/detail")
    public String detail(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, FabricVo fabricVo) {

        FabricVo fabricDetail = fabricService.getFabricDetail(fabricVo);
        model.addAttribute("fabricDetail", fabricDetail);

        return "fabric/fabricDetail";
    }

    @GetMapping("/fabric/register")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, FabricVo fabricVo) {

        if (fabricVo.getSeq() != null) {
            FabricVo fabricDetail = fabricService.getFabricDetail(fabricVo);
            model.addAttribute("fabricDetail", fabricDetail);
        } else {
            model.addAttribute("fabricDetail", fabricVo);
        }

        return "fabric/fabricRegister";
    }

}
