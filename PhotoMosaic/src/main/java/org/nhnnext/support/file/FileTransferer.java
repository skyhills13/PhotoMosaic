package org.nhnnext.support.file;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.nhnnext.domains.table.Mosaic;
import org.nhnnext.support.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class FileTransferer {
	private static final Logger logger = LoggerFactory.getLogger(FileTransferer.class);
	
	public static void uploadImageFile(byte[] bytes, String destinationPath) {
		File of = new File(destinationPath);
		FileOutputStream osf = null;
		try {
			osf = new FileOutputStream(of);
			try {
				osf.write(bytes);
				osf.flush();
			} catch (IOException e) {
				logger.debug("osf write, flush" + e.getMessage());
			} finally {
				try {
					osf.close();
				} catch (IOException e) {
					logger.debug("error" + e.getMessage());
				}
			}
		} catch (FileNotFoundException e) {
			logger.debug("error" + e.getMessage());
		}
	}

	public static String uploadMultipartFile(Mosaic mosaic, MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			FileDataHandler.logger.debug("no picture");
			return null;
		}
		FileTransferer.transferToAttachmentDir(mosaic, multipartFile);
		return multipartFile.getOriginalFilename();
	}

	public static File transferToAttachmentDir(Mosaic mosaic, MultipartFile multipartFile) {
		File destFile = FileTransferer.getDestinationFile(mosaic, multipartFile.getOriginalFilename());
		try {
			multipartFile.transferTo(destFile);
		} catch (Exception ex) {
			throw new IllegalArgumentException(destFile + Constants.MOVE_FAIL_MESSAGE);
		}
		return destFile;
	}

	public static File getDestinationFile(Mosaic mosaic, String fileName) {
		FileTransferer.createDir(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId());
		return new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + fileName);
	}

	public static void createDir(String dirPath){
		File dir = new File(dirPath);
		if(!dir.exists()){
			dir.mkdirs();
		}
	}
	
	public boolean delete(Mosaic mosaic, String fileName) {
		File targetFile = FileTransferer.getDestinationFile(mosaic, fileName);
		try {
			return targetFile.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
}
