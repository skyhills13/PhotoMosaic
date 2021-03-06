package ppomo.support.file;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import ppomo.domain.table.Mosaic;
import ppomo.domain.table.Photo;
import ppomo.support.Constants;

public class FileDataHandler {
	public static final Logger logger = LoggerFactory.getLogger(FileDataHandler.class);

	public static String getFileExtension(MultipartFile file) {
		int extensionIndex = file.getOriginalFilename().indexOf(".");
		String originalExtention = file.getOriginalFilename().substring(extensionIndex+1);
		return originalExtention;
	}
}
