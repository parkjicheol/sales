package com.pinocchio.sales.config.security;

import com.pinocchio.sales.dto.UserVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        UserVo userVo = (UserVo) SecurityContextHolder.getContext().getAuthentication().getDetails();

        if (log.isDebugEnabled()) {
            log.info("Welcome loginSuccess! {}, {}", request.getSession().getId(), userVo.getUsername());
        }

        String targetUrl = (request.getParameter("targetUrl") == null) ? "/" : request.getParameter("targetUrl");

        // Session 로그인 정보 저장
        HttpSession session = request.getSession();
        session.setMaxInactiveInterval(30 * 60);
        session.setAttribute("SESSION_INFO", userVo);

        response.setStatus(HttpServletResponse.SC_OK);
        response.sendRedirect(targetUrl);

//        String domain = request.getServerName();
//        String protocol = request.getScheme();
//        int port = request.getServerPort();
//        String referer = request.getHeader("referer");

    }
}
