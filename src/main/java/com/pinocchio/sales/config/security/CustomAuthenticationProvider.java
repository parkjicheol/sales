package com.pinocchio.sales.config.security;

import com.pinocchio.sales.common.util.EncoderUtil;
import com.pinocchio.sales.service.UserService;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserService userService;

    @Autowired
    public CustomAuthenticationProvider(UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

    @SneakyThrows
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String id = authentication.getPrincipal().toString();
        String password = authentication.getCredentials().toString();
        HttpServletRequest httpServletRequest = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();

        if ("".equals(id) || "".equals(password)) {
            throw new UsernameNotFoundException("user not found");
        }

        UserDetails userDetails = userService.loadUserByUsername(id);

        if (userDetails == null) {
            throw new UsernameNotFoundException("user not found");
        }

        List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
        roles.add(new SimpleGrantedAuthority("ADMIN"));

        password = EncoderUtil.encodeSha256(password);

        if (!password.equals(userDetails.getPassword())) {
            throw new BadCredentialsException("로그인 정보가 일치하지 않습니다.");
        }

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(id, password, roles);
        token.setDetails(userDetails);

        return token;
    }
}
