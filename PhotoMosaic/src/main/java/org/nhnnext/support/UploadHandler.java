package org.nhnnext.support;

import java.io.File;

import org.nhnnext.domains.table.Mosaic;
import org.nhnnext.domains.table.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class UploadHandler {
	private static final Logger logger = LoggerFactory.getLogger(UploadHandler.class);

	public static String upload(Mosaic mosaic, MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			logger.debug("no picture");
			return null;
		}
		transferToAttachmentDir(mosaic, multipartFile);
		return multipartFile.getOriginalFilename();
	}

	private static File transferToAttachmentDir(Mosaic mosaic, MultipartFile multipartFile) {
		File destFile = getDestinationFile(mosaic, multipartFile.getOriginalFilename());
		try {
			multipartFile.transferTo(destFile);
		} catch (Exception ex) {
			throw new IllegalArgumentException(destFile + Constants.MOVE_FAIL_MESSAGE);
		}
		return destFile;
	}

	public static File getDestinationFile(Mosaic mosaic, String fileName) {
		createDir(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId());
		return new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + fileName);
	}
	
	public static void renameAsUnique(Mosaic mosaic, Photo photo){
		File oldFile = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + photo.getOriginalFileName());
		File newFile = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + photo.getUniqueId());
		oldFile.renameTo(newFile);
	}
	
	public static void createDir(String dirPath){
		File dir = new File(dirPath);
		if(!dir.exists()){
			dir.mkdirs();
		}
	}
	
	public boolean delete(Mosaic mosaic, String fileName) {
		File targetFile = getDestinationFile(mosaic, fileName);
		try {
			return targetFile.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	
	public static String getFileExtension(MultipartFile file) {
		int extensionIndex = file.getOriginalFilename().indexOf(".");
		String originalExtention = file.getOriginalFilename().substring(extensionIndex+1);
		
		return originalExtention;
	}
}
