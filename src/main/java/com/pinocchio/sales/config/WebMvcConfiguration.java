package com.pinocchio.sales.config;

import com.pinocchio.sales.config.intercepter.CertificationInterceptor;
import com.pinocchio.sales.config.intercepter.CommonInterceptor;
import com.pinocchio.sales.config.intercepter.MeasuringInterceptor;
import com.pinocchio.sales.config.security.UserHandlerArgumentResolver;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.util.List;

@Configuration
@EnableAutoConfiguration
public class WebMvcConfiguration implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 인증 관련 Interceptor
        registry.addInterceptor(new CertificationInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/common/error**")
                .excludePathPatterns("/error")
                .excludePathPatterns("/static/**")
                .excludePathPatterns("/auth/**/**")
                .excludePathPatterns("/upload/**");

        // 공통 코드 Interceptor
        registry.addInterceptor(new CommonInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/common/error**")
                .excludePathPatterns("/error")
                .excludePathPatterns("/static/**")
                .excludePathPatterns("/auth/**/**")
                .excludePathPatterns("/upload/**");

        // 실행 정보 관련 Interceptor
        registry.addInterceptor(new MeasuringInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/common/error**")
                .excludePathPatterns("/error")
                .excludePathPatterns("/static/**")
                .excludePathPatterns("/auth/**/**")
                .excludePathPatterns("/upload/**");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new UserHandlerArgumentResolver());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:static/", "/static/")
                .setCachePeriod(60 * 60 * 24 * 365)
                .resourceChain(true)
                .addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods(HttpMethod.GET.name(), HttpMethod.POST.name())
                .allowCredentials(false)
                .maxAge(3600);
    }

}
