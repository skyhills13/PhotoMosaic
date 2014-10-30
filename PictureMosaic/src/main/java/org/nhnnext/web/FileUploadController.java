package org.nhnnext.web;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileUploadController {

	private static final Logger logger = LoggerFactory
			.getLogger(FileUploadController.class);
	private static final String ATTACHMENT_ROOT_DIR = "/Users/soeunpark/Documents/workspace/sts/PictureMosaic/PictureMosaic/webapp/images";
	private static final String ATTACHMENT_ROOT_DIR_REMOTE = "";

	@RequestMapping("/select")
	public String select() {
		logger.debug("into select page");
		return "select";
	}

	@RequestMapping("/test")
	public String test() {
		logger.debug("into select page");
		return "uploadMultiple";
	}
	

	@RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST)
    public @ResponseBody String uploadMultipleFileHandler(@RequestParam("file") MultipartFile[] files) {
        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            UUID pictureUniqueKey = UUID.randomUUID();
            if (file.isEmpty()) {
            	return "You failed to upload " + file.getOriginalFilename() + " because the file was empty.";
            }
            logger.debug(pictureUniqueKey.toString());
            String uniqueName = pictureUniqueKey.toString();
            String originalName = file.getOriginalFilename();
            try {
                byte[] bytes = file.getBytes();
 
                // Create the directory to store file
                File dir = new File(ATTACHMENT_ROOT_DIR);
                if (!dir.exists()) {
                	dir.mkdirs();
                }
 
                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath() + File.separator + originalName);
                BufferedOutputStream stream = new BufferedOutputStream( new FileOutputStream(serverFile) );
                stream.write(bytes);
                stream.close();
 
                logger.info("Server File Location=" + serverFile.getAbsolutePath());
                message = message + "You successfully uploaded file=" + originalName + "<br />";
            } catch (Exception e) {
                return "You failed to upload " + originalName + " => " + e.getMessage();
            }
        }
        return message;
    }

	@RequestMapping(value = "/remove", method = RequestMethod.GET)
	public String delete(String name) {
		File imagesDir = new File(ATTACHMENT_ROOT_DIR);
		File targetFile = new File(imagesDir.getAbsolutePath() + File.separator
				+ name);

		// TODO exception handling
		targetFile.delete();
		return name;
	}
}
