package org.nhnnext.support.file;

import java.io.File;

import org.nhnnext.domains.table.Mosaic;
import org.nhnnext.domains.table.Photo;
import org.nhnnext.support.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class FileDataHandler {
	public static final Logger logger = LoggerFactory.getLogger(FileDataHandler.class);

	public static void renameAsUnique(Mosaic mosaic, Photo photo){
		File oldFile = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + photo.getOriginalFileName());
		File newFile = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + photo.getUniqueId());
		oldFile.renameTo(newFile);
	}
	
	public static String getFileExtension(MultipartFile file) {
		int extensionIndex = file.getOriginalFilename().indexOf(".");
		String originalExtention = file.getOriginalFilename().substring(extensionIndex+1);
		return originalExtention;
	}
}
