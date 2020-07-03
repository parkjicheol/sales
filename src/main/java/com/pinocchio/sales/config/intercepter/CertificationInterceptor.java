package com.pinocchio.sales.config.intercepter;

import com.pinocchio.sales.common.util.ObjectUtil;
import com.pinocchio.sales.dto.UserVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Slf4j
@Component
public class CertificationInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.info("Interceptor > preHandle");

        HttpSession session = request.getSession();
        UserVo userVO = (UserVo) session.getAttribute("SESSION_INFO");

        if (ObjectUtil.isNotEmpty(userVO)) {
            request.setAttribute("user", userVO);
            return true;
        } else {
            return true;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // TODO Auto-generated method stub
        log.info("Interceptor > postHandle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // TODO Auto-generated method stub
        log.info("Interceptor > afterCompletion" );
    }

}
