package com.pinocchio.sales.config.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.OutputStream;

@Slf4j
@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String isAsync = request.getParameter("async");
        String targetUrl = request.getParameter("targetUrl");

        HttpSession httpSession = request.getSession();
        httpSession.setAttribute("SPRING_SECURITY_LAST_EXCEPTION", exception);
        response.setStatus(HttpServletResponse.SC_OK);

        if ("true".equals(isAsync)) {
            OutputStream outputStream = response.getOutputStream();
            String result = "{\"result\":\"faulure\", \"message\":\"" + exception.getMessage() + "\"}";
            outputStream.write(result.getBytes());
        } else {
            response.sendRedirect("/login?error=true&targetUrl=" + targetUrl);
        }
    }
}
