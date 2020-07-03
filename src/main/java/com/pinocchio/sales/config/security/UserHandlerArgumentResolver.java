package com.pinocchio.sales.config.security;

import com.pinocchio.sales.dto.UserVo;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class UserHandlerArgumentResolver implements HandlerMethodArgumentResolver {

    /* (non-Javadoc)
     * @see org.springframework.web.method.support.HandlerMethodArgumentResolver#supportsParameter(org.springframework.core.MethodParameter)
     * UserVO 클래스의 멤버변수 등과 적합한지 여부를 판단
     */
    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return UserVo.class.isAssignableFrom(parameter.getParameterType());
    }

    /* (non-Javadoc)
     * @see org.springframework.web.method.support.HandlerMethodArgumentResolver#resolveArgument(org.springframework.core.MethodParameter, org.springframework.web.method.support.ModelAndViewContainer, org.springframework.web.context.request.NativeWebRequest, org.springframework.web.bind.support.WebDataBinderFactory)
     * 파라미터 정보를 통대로 실제 인증된 객체를 리턴
     */
    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof UserVo) {
            return authentication.getPrincipal();
        }

        return null;
    }

}
