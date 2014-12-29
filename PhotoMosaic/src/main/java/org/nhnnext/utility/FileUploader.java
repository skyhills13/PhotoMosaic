package org.nhnnext.utility;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FileUploader {
	private static final Logger logger = LoggerFactory
			.getLogger(FileUploader.class);
	
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
}
