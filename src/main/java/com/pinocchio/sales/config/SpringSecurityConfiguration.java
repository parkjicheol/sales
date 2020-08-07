package com.pinocchio.sales.config;

import com.pinocchio.sales.config.security.CustomAccessDeniedHandler;
import com.pinocchio.sales.config.security.CustomAuthenticationFailureHandler;
import com.pinocchio.sales.config.security.CustomAuthenticationProvider;
import com.pinocchio.sales.config.security.CustomAuthenticationSuccessHandler;
import com.pinocchio.sales.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SpringSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;

    @Autowired
    private CustomAuthenticationFailureHandler customAuthenticationFailureHandler;

    @Autowired
    private CustomAccessDeniedHandler customAccessDeniedHandler;

    @Autowired
    private UserService userService;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/images/**", "/upload/**", "/javascripts/**", "/stylesheets/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/servlet/admin/**").access("hasAuthority('ADMIN') or hasAuthority('USER')")
                .antMatchers("/").hasAuthority("ADMIN")
                .antMatchers("/servlet/").hasAuthority("ADMIN")
                .antMatchers("/servlet/member/**").permitAll()
                .antMatchers("/servlet/question/**").permitAll()
                .antMatchers("/servlet/answer/**").permitAll()
                .and().formLogin().loginPage("/servlet/login")
                .loginProcessingUrl("/servlet/loginProcess")
                .usernameParameter("id")
                .passwordParameter("password")
                .successHandler(customAuthenticationSuccessHandler)
                .failureHandler(customAuthenticationFailureHandler)
                .permitAll()
                .and().exceptionHandling().accessDeniedHandler(customAccessDeniedHandler)
                .and().logout().deleteCookies("remove")
                .invalidateHttpSession(true)
                .logoutRequestMatcher(new AntPathRequestMatcher("/servlet/logout"))
                .logoutSuccessUrl("/")
                .and().csrf().disable();

        http.headers().frameOptions().sameOrigin();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        return new CustomAuthenticationProvider(userService);
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.authenticationProvider(authenticationProvider());
    }


}
