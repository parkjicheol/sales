package com.pinocchio.sales.config.intercepter;

import com.pinocchio.sales.common.util.StringUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
public class MeasuringInterceptor implements HandlerInterceptor {

    /*
     * (non-Javadoc)
     *
     * @see
     * org.springframework.web.servlet.handler.HandlerInterceptorAdapter#preHandle(
     * javax.servlet.http.HttpServletRequest,
     * javax.servlet.http.HttpServletResponse, java.lang.Object)
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        long currentTime = System.currentTimeMillis();
        request.setAttribute("beginTime", currentTime);
        return true;
    }

    /*
     * (non-Javadoc)
     *
     * @see org.springframework.web.servlet.handler.HandlerInterceptorAdapter#
     * afterCompletion(javax.servlet.http.HttpServletRequest,
     * javax.servlet.http.HttpServletResponse, java.lang.Object,
     * java.lang.Exception) view를 리턴하기 전에 실행 됨
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        if (log.isDebugEnabled()) {
            // 현재 시간
            long currentTime = System.currentTimeMillis();
            // 요청이 시작된 시간
            long beginTime = Long.valueOf(String.valueOf(request.getAttribute("beginTime")));
            // 총 처리시간
            long processedTime = currentTime - beginTime;

            log.debug("================================================================================");
            log.debug("Request URL : " + request.getRequestURI());
            log.debug("PathInfo : " + request.getPathInfo());
            log.debug("Parameter : " + request.getAttribute("requestBody"));
            log.debug("Processed Time : " + processedTime);
            log.debug("HeapSize : " + StringUtil.getFileSize(Runtime.getRuntime().totalMemory()));
            log.debug("FreeSize : " + StringUtil.getFileSize(Runtime.getRuntime().freeMemory()));
            log.debug("================================================================================");
        }
    }

}
