package com.pinocchio.sales.controller;

import com.pinocchio.sales.common.abs.AbstractBaseController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Locale;

@Controller
public class FabricController extends AbstractBaseController<FabricController> {

    @GetMapping("/fabric/list")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model) {

        return "fabric/fabricList";
    }

    @GetMapping("/fabric/detail")
    public String detail(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model) {

        return "fabric/fabricDetail";
    }

    @GetMapping("/fabric/register")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model) {

        return "fabric/fabricRegister";
    }

}
