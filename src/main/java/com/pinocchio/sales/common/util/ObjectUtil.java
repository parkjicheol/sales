package com.pinocchio.sales.common.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ObjectUtil {

    /**
     * <PRE>
     * 1. MethodName	:	mapToInt
     * 2. Comment		:	Map to Int
     * 3. 작성자		:	Lenovo
     * 4. 작성일		:	2018. 8. 20.	오전 10:15:47
     * </PRE>
     *
     *	@param map
     *	@param key
     *	@return
     */
    public static int mapToInt(final Map<String, Object> map, final String key) {
        return objToInt(map.get(key), 0);
    }

    /**
     * <PRE>
     * 1. MethodName	:	mapToInt
     * 2. Comment		:	Map to Int
     * 3. 작성자		:	jcpark
     * 4. 작성일		:	2018. 8. 20.	오전 10:15:27
     * </PRE>
     *
     *	@param map
     *	@param key
     *	@param number
     *	@return
     */
    public static int mapToInt(final Map<String, Object> map, final String key, final int number) {
        return objToInt(map.get(key), number);
    }

    /**
     * <PRE>
     * 1. MethodName	:	objToInt
     * 2. Comment		:	Object to Int
     * 3. 작성자		:	jcpark
     * 4. 작성일		:	2018. 8. 20.	오전 10:14:57
     * </PRE>
     *
     *	@param obj
     *	@return
     */
    public static int objToInt(final Object obj) {
        return objToInt(obj, 0);
    }

    /**
     * <PRE>
     * 1. MethodName	:	objToInt
     * 2. Comment		:	Object to Int
     * 3. 작성자		:	jcpark
     * 4. 작성일		:	2018. 8. 20.	오전 10:14:41
     * </PRE>
     *
     *	@param obj
     *	@param number
     *	@return
     */
    public static int objToInt(final Object obj, final int number) {
        int nRet = number;
        if (obj == null)
            return nRet;

        if (obj instanceof Integer) {
            nRet = (Integer) obj;
        }

        return nRet;
    }

    /**
     * <PRE>
     * 1. MethodName	:	isEmpty
     * 2. Comment		:	Check Empty
     * 3. 작성자		:	jcpark
     * 4. 작성일		:	2018. 8. 20.	오전 10:13:53
     * </PRE>
     *
     *	@param obj
     *	@return
     */
    public static boolean isEmpty(final Object obj) {
        if (obj instanceof List) {
            return ((List<?>) obj).size() == 0;
        } else if (obj instanceof int[]) {
            return ((int[]) obj).length == 0;
        } else if (obj instanceof String[]) {
            return ((String[]) obj).length == 0;
        } else {
            return obj == null;
        }

    }

    /**
     * <PRE>
     * 1. MethodName	:	isNotEmpty
     * 2. Comment		:	Check Is Not Empty
     * 3. 작성자		:	jcpark
     * 4. 작성일		:	2018. 8. 20.	오전 10:14:20
     * </PRE>
     *
     *	@param obj
     *	@return
     */
    public static boolean isNotEmpty(final Object obj) {
        return !isEmpty(obj);
    }

    /**
     * <PRE>
     * 1. MethodName	:	voToMap
     * 2. Comment		:	VO to Map
     * 3. 작성자		:	jcpark
     * 4. 작성일		:	2018. 8. 20.	오전 10:13:14
     * </PRE>
     *
     *	@param abc
     *	@return
     *	@throws NoSuchFieldException
     *	@throws NoSuchMethodException
     *	@throws InvocationTargetException
     *	@throws IllegalAccessException
     */
    public static Map<String, Object> voToMap(Object abc) throws NoSuchFieldException, NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Map<String, Object> map = new HashMap<>();

        Field[] fields = abc.getClass().getDeclaredFields();

        for (Field field : fields) {
            String filedName = field.getName();

            if (("serialVersionUID").equals(filedName)) {
                continue;
            }

            String methodName = filedName.replaceFirst(filedName.substring(0, 1), filedName.substring(0, 1).toUpperCase());
            map.put(filedName, abc.getClass().getDeclaredMethod("get" + methodName).invoke(abc));
        }

        return map;
    }

    /**
     * <PRE>
     * 1. MethodName	:	byteToHex
     * 2. Comment		:	Byte to Hex
     * 3. 작성자		:	jcpark
     * 4. 작성일		:	2018. 8. 20.	오전 10:12:44
     * </PRE>
     *
     *	@param hash
     *	@return
     */
    public static String byteToHex(final byte[] hash) {

        Formatter formatter = new Formatter();

        for (byte b : hash) {
            formatter.format("%02x", b);
        }

        String result = formatter.toString();
        formatter.close();

        return result;
    }
}
