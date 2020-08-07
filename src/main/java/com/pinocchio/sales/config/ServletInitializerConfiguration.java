package com.pinocchio.sales.config;

import com.pinocchio.sales.SalesApplication;
import com.pinocchio.sales.config.filter.CorsFilter;
//import org.apache.catalina.filters.HttpHeaderSecurityFilter;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ServletInitializerConfiguration extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(SalesApplication.class);
    }

//    @Bean
//    @SuppressWarnings({ "rawtypes", "unchecked" })
//    public FilterRegistrationBean corsFilter() {
//        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
//        filterRegistrationBean.setFilter(new CorsFilter());
//        filterRegistrationBean.addUrlPatterns("/*");
//        return filterRegistrationBean;
//    }

//    @Bean
//    @SuppressWarnings({ "rawtypes", "unchecked" })
//    public FilterRegistrationBean getFilterRegistrationBean() {
//        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
//        HttpHeaderSecurityFilter httpHeaderSecurityFilter = new HttpHeaderSecurityFilter();
//        httpHeaderSecurityFilter.setXssProtectionEnabled(true);
//        filterRegistrationBean.setFilter(httpHeaderSecurityFilter);
//        filterRegistrationBean.setOrder(1);
//        return filterRegistrationBean;
//    }

}
