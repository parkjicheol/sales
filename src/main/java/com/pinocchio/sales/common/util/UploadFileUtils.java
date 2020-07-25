package com.pinocchio.sales.common.util;

import org.springframework.util.FileCopyUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

public class UploadFileUtils {

    public static String uploadFile(String imagePath, String uploadPath, String originalName, byte[] fileData) throws Exception {

        UUID uuid = UUID.randomUUID();
        String savedName = uuid.toString() + originalName;

        String savedPath = calcPath(uploadPath);
        File target = new File(uploadPath + savedPath, savedName);

        FileCopyUtils.copy(fileData, target);

        String formatName = originalName.substring(originalName.lastIndexOf(".")+1);
        String uploadedFileName = null;

        makeThumbnail(uploadPath, savedPath, savedName);

        return imagePath + savedPath + "/" + savedName;
    }

    private static String calcPath(String uploadPath) {
        Calendar cal = Calendar.getInstance();
        // File.separator : 디렉토리 구분자(\\)
        // 연도, ex) \\2017
        String yearPath = File.separator + cal.get(Calendar.YEAR);
        System.out.println(yearPath);
        // 월, ex) \\2017\\03
        String monthPath = yearPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.MONTH) + 1);
        System.out.println(monthPath);
        // 날짜, ex) \\2017\\03\\01
        String datePath = monthPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.DATE));
        System.out.println(datePath);
        // 디렉토리 생성 메서드 호출
        makeDir(uploadPath, yearPath, monthPath, datePath);
        return datePath;
    }

    private static void makeDir(String uploadPath, String... paths) {

        if (new File(paths[paths.length - 1]).exists()){
            return;
        }
        // 디렉토리가 존재하지 않으면
        for (String path : paths) {
            File dirPath = new File(uploadPath + path);

            if (!dirPath.exists()) {
                dirPath.mkdir();
            }
        }
    }

    // 썸네일 생성
    private static String makeThumbnail(String uploadPath, String path, String fileName) throws Exception {

        BufferedImage sourceImg = ImageIO.read(new File(uploadPath + path, fileName));

        String thumbnailName = uploadPath + path + File.separator + fileName;
        File newFile = new File(thumbnailName);
        String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);

        ImageIO.write(sourceImg, formatName.toUpperCase(), newFile);

        return thumbnailName.substring(uploadPath.length()).replace(File.separatorChar, '/');
    }

}
