package org.nhnnext.support;

import java.awt.Dimension;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.ImageInputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class PhotoHandler {
	private static final Logger logger = LoggerFactory.getLogger(PhotoHandler.class);
	private static final String ATTACHMENT_ROOT_DIR = "/Users/soeunpark/Documents/workspace/sts/PhotoMosaic/PhotoMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR_REMOTE = "";
//	private static final String ATTACHMENT_ROOT_DIR = "/Users/kimjoohwee/develop/PictureMosaic/PhotoMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR =  "/Users/min/dev/FinalProject/Git Repository/PhotoMosaic/webapp/images";

	public static String upload(MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			logger.debug("no picture");
			return null;
		}
		transferToAttachmentDir(multipartFile);
		return multipartFile.getOriginalFilename();
	}

	private static File transferToAttachmentDir(MultipartFile multipartFile) {
		File destFile = getDestinationFile(multipartFile.getOriginalFilename());
		try {
			multipartFile.transferTo(destFile);
		} catch (Exception ex) {
			throw new IllegalArgumentException(destFile + "로 첨부파일 옮기다 오류 발생");
		}
		return destFile;
	}

	public static File getDestinationFile(String fileName) {
		return new File(ATTACHMENT_ROOT_DIR + File.separator + fileName);
	}
	
	public static boolean delete(String fileName) {
		File targetFile = getDestinationFile(fileName);
		try {
			return targetFile.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	//TODO should consider the case of the non-existence of dir (previous version of FileUploadController) 
	
	public static Dimension getImageDimension(String fileName)
			throws IOException {
		File imgFile = new File(ATTACHMENT_ROOT_DIR + File.separator + fileName);
		int pos = imgFile.getName().lastIndexOf(".");
		if (pos == -1) {
			throw new IOException(Constants.WRONG_FILE + imgFile.getAbsolutePath());
		}
		String suffix = imgFile.getName().substring(pos + 1);
		Iterator<ImageReader> iterator = ImageIO.getImageReadersBySuffix(suffix);
		if (iterator.hasNext()) {
			ImageReader reader = iterator.next();
			try {
				ImageInputStream stream = new FileImageInputStream(imgFile);
				reader.setInput(stream);
				int width = reader.getWidth(reader.getMinIndex());
				int height = reader.getHeight(reader.getMinIndex());
				return new Dimension(width, height);
			} catch (IOException e) {
				logger.warn("Error reading: " + imgFile.getAbsolutePath(), e);
			} finally {
				reader.dispose();
			}
		}
		throw new IOException(Constants.NOT_IMAGE + imgFile.getAbsolutePath());
	}
}
