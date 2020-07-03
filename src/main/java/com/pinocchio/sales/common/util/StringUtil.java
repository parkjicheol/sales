package com.pinocchio.sales.common.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class StringUtil {

    public static final String EMPTY = "";

    public static String getFileSize(long size) {
        int s = 0;
        String suffix = "";
        int round = 0;

        while (size / 1024 > 0) {
            round = Math.round((((float) (size % 1024) / 1024) * 10));
            size = size / 1024;
            s++;
        }

        switch (s) {
            case 1:
                suffix = "KB";
                break;
            case 2:
                suffix = "MB";
                break;
            case 3:
                suffix = "GB";
                break;
            case 4:
                suffix = "TB";
                break;
            default:
                suffix = "B";
                break;
        }

        String str = String.valueOf(size);

        if (round > 0) {
            str += "." + String.valueOf(round);
        }
        str += suffix;
        return str;
    }

    public static String getRandomKey(int length) {
        String charArray = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder returnData = new StringBuilder();

        for (int i = 0; i < length; i++) {
            returnData.append(charArray.charAt((int) (Math.random() * 100) % charArray.length()));
        }

        return returnData.toString();
    }

    public static String getDateDirectory() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
        return "/" + df.format(new Date());
    }

    public static String getConvertHtml(String text) {

        String tempString = text;

        tempString = tempString.replaceAll("!\"#[$]%&\\(\\)\\{\\}@`[*]:[+];-.<>,\\^~|'\\[\\]", "");
        tempString = tempString.replaceAll("&lt;", "<");
        tempString = tempString.replaceAll("&gt;", ">");
        tempString = tempString.replaceAll("&amp;", "&");
        tempString = tempString.replaceAll("&nbsp;", " ");
        tempString = tempString.replaceAll("&apos;", "\'");
        tempString = tempString.replaceAll("&quot;", "\"");

        return tempString;

    }

}
