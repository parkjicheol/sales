package com.pinocchio.sales.controller;

import com.google.gson.Gson;
import com.pinocchio.sales.common.abs.AbstractBaseController;
import com.pinocchio.sales.common.util.StringUtil;
import com.pinocchio.sales.common.util.UploadFileUtils;
import com.pinocchio.sales.dto.CompanyVo;
import com.pinocchio.sales.service.CompanyService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
public class CompanyAsyncController extends AbstractBaseController<CompanyAsyncController> {

    @Value("${upload.path}")
    private String uploadPath;

    @Value("${image.path}")
    private String imagePath;

    private final CompanyService companyService;

    public CompanyAsyncController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/company/ajaxList")
    public String list(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, CompanyVo companyVo) {

        List<CompanyVo> companyList =  companyService.getCompanyList(companyVo);
        int companyListCount = companyService.getCompanyListCount(companyVo);

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        map.put("data", companyList);
        map.put("recordsFiltered", companyListCount);
        map.put("recordsTotal", companyListCount);

        return gson.toJson(map);
    }

    @PostMapping("/company/ajaxRegister")
    public String register(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, CompanyVo companyVo
            , @RequestParam("uploadFile") MultipartFile uploadFile) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        try {

            String filepath = UploadFileUtils.uploadFile(imagePath, uploadPath, uploadFile.getOriginalFilename(), uploadFile.getBytes());

            companyVo.setRegisterId("admin");
            companyVo.setFileName(StringUtil.getConvertHtml(filepath));
            companyService.setCompanyData(companyVo);

            map.put("successCount", 1);

        } catch (Exception e) {
            map.put("successCount", 0);
        }

        return gson.toJson(map);

    }

    @PostMapping("/company/ajaxModify")
    public String modify(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, CompanyVo companyVo
            , @RequestParam("uploadFile") MultipartFile uploadFile) {

        Gson gson = new Gson();
        HashMap<String, Object> map = new HashMap<String, Object>();

        try {

            String filepath = UploadFileUtils.uploadFile(imagePath, uploadPath, uploadFile.getOriginalFilename(), uploadFile.getBytes());

            companyVo.setRegisterId("admin");
            companyVo.setFileName(StringUtil.getConvertHtml(filepath));
            companyService.updateCompanyData(companyVo);

            map.put("successCount", 1);

        } catch (Exception e) {
            map.put("successCount", 0);
        }

        return gson.toJson(map);
    }

    @PostMapping("/company/ajaxRemove")
    public String remove(HttpServletRequest request, HttpServletResponse response, HttpSession session, Locale locale, Model model, @RequestParam String companySeqs) {

        Gson gson = new Gson();
        Map<String, Object> seq = new HashMap<String, Object>();

        seq.put("seq", companySeqs.split(","));
        companyService.deleteCompanyData(seq);
        seq.put("successCount", 1);

        return gson.toJson(seq);
    }

}
