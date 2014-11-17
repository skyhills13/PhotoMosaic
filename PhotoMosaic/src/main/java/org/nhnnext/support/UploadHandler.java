package org.nhnnext.support;

import java.io.File;

import org.nhnnext.domains.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class UploadHandler {
	private static final Logger logger = LoggerFactory.getLogger(UploadHandler.class);

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
			throw new IllegalArgumentException(destFile + Constants.MOVE_FAIL_MESSAGE);
		}
		return destFile;
	}

	public static File getDestinationFile(String fileName) {
		return new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + fileName);
	}
	
	public static void renameAsUnique(Photo photo){
		File oldFile = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + photo.getOriginalFileName());
		File newFile = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + photo.getUniqueId());
		oldFile.renameTo(newFile);
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

}
