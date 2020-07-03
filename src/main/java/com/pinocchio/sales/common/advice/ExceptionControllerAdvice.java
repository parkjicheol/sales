package com.pinocchio.sales.common.advice;

import com.pinocchio.sales.common.enumerate.ExceptionTypeEnum;
import com.pinocchio.sales.dto.ExceptionResponseVo;
import com.pinocchio.sales.exception.DataNotFoundException;
import com.pinocchio.sales.exception.ResourceNotFoundException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;

@ControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler(Exception.class)
    public String exception(Model model, Exception e) {
        ExceptionResponseVo exceptionResponseVo = new ExceptionResponseVo(e.getClass().getSimpleName(), e.getMessage(), e.toString(), e.getStackTrace().toString(), ExceptionTypeEnum.SERVER, new Date());
        model.addAttribute("exceptionResponse", exceptionResponseVo);
        return "/common/error";
    }

    @ExceptionHandler(SQLException.class)
    public String sqlException(Model model, Exception e) {
        ExceptionResponseVo exceptionResponseVo = new ExceptionResponseVo(e.getClass().getSimpleName(), e.getMessage(), e.toString(), e.getStackTrace().toString(), ExceptionTypeEnum.SQL, new Date());
        model.addAttribute("exceptionResponse", exceptionResponseVo);
        return "/common/error";
    }

    @ExceptionHandler(IOException.class)
    public String ioException(Model model, Exception e) {
        ExceptionResponseVo exceptionResponseVo = new ExceptionResponseVo(e.getClass().getSimpleName(), e.getMessage(), e.toString(), e.getStackTrace().toString(), ExceptionTypeEnum.IO, new Date());
        model.addAttribute("exceptionResponse", exceptionResponseVo);
        return "/common/error";
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public String noHandlerException(Model model, Exception e) {
        ExceptionResponseVo exceptionResponseVo = new ExceptionResponseVo(e.getClass().getSimpleName(), e.getMessage(), e.toString(), e.getStackTrace().toString(), ExceptionTypeEnum.NH, new Date());
        model.addAttribute("exceptionResponse", exceptionResponseVo);
        return "/common/error-404";
    }

    @ExceptionHandler(DataNotFoundException.class)
    public String dataNotFoundException(Model model, Exception e) {
        ExceptionResponseVo exceptionResponseVo = new ExceptionResponseVo(e.getClass().getSimpleName(), e.getMessage(), e.toString(), e.getStackTrace().toString(), ExceptionTypeEnum.DATA_NOT_FOUND, new Date());
        model.addAttribute("exceptionResponse", exceptionResponseVo);
        return "/common/error-404";
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public String resourceNotFoundException(Model model, Exception e) {
        ExceptionResponseVo exceptionResponseVo = new ExceptionResponseVo(e.getClass().getSimpleName(), e.getMessage(), e.toString(), e.getStackTrace().toString(), ExceptionTypeEnum.RESOURCE_NOT_FOUND, new Date());
        model.addAttribute("exceptionResponse", exceptionResponseVo);
        return "/common/error-404";
    }


}
