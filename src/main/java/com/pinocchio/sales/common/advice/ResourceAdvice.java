package com.pinocchio.sales.common.advice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

@ControllerAdvice
public class ResourceAdvice {

    private ResourceUrlProvider resourceUrlProvider;

    @Autowired
    public ResourceAdvice(ResourceUrlProvider resourceUrlProvider) {
        this.resourceUrlProvider = resourceUrlProvider;
    }

    @ModelAttribute("versionResourceResolver")
    public ResourceUrlProvider versionResourceResolver() {
        return this.resourceUrlProvider;
    }

}
