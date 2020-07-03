package com.pinocchio.sales.common.abs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.ParameterizedType;
import java.util.Map;

public abstract class AbstractBaseController<T> {

    @SuppressWarnings("unchecked")
    protected final Logger log = LoggerFactory.getLogger(((Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0]));

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        StringTrimmerEditor stringTrimmerEditor = new StringTrimmerEditor(true);
        webDataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
    }

    @SuppressWarnings("unchecked")
    protected Map<String, Object> getLoginSessionInfo(HttpServletRequest request) {
        return (Map<String, Object>) request.getAttribute("SESSION_INFO");
    }

    protected boolean isLogin(HttpSession session) {
        return session.getAttribute("SESSION_INFO") != null;
    }

}
