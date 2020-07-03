package com.pinocchio.sales.config.security;

import lombok.extern.slf4j.Slf4j;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException exception) throws IOException, ServletException {
        if (exception instanceof InvalidCsrfTokenException) {
            DefaultRedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
            redirectStrategy.sendRedirect(request, response, "/login");
            return;
        }

        request.getRequestDispatcher("/error/accessDenied").forward(request, response);
    }

}
