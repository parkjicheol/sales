package com.pinocchio.sales;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class SalesApplication {

    public static void main(String[] args) {
        SpringApplication.run(SalesApplication.class, args);

//        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//        CharSequence cs = "1234";
//        System.out.println("=========" + bCryptPasswordEncoder.encode("1234"));
    }

}
