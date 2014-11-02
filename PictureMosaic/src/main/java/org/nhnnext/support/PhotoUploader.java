package org.nhnnext.support;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class PhotoUploader {
	private static final Logger logger = LoggerFactory.getLogger(PhotoUploader.class);
	private static final String ATTACHMENT_ROOT_DIR = "/Users/soeunpark/Documents/workspace/sts/PictureMosaic/PictureMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR_REMOTE = "";
//	private static final String ATTACHMENT_ROOT_DIR = "/Users/kimjoohwee/develop/PictureMosaic/PictureMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR =  "/Users/min/dev/FinalProject/PictureMosaic/PictureMosaic/webapp/images";

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
	
	//TODO should consider the case of the non-existence of dir (previous version of FileUploadController) 
	
}
