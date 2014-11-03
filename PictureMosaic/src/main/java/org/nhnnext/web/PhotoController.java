package org.nhnnext.web;

import java.io.File;
import java.util.UUID;

import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.PhotoUploader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class PhotoController {

	private static final Logger logger = LoggerFactory
			.getLogger(PhotoController.class);
	private static final String ATTACHMENT_ROOT_DIR = "/Users/soeunpark/Documents/workspace/sts/PictureMosaic/PictureMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR_REMOTE = "";
//	private static final String ATTACHMENT_ROOT_DIR = "/Users/kimjoohwee/develop/PictureMosaic/PictureMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR =  "/Users/min/dev/FinalProject/PictureMosaic/PictureMosaic/webapp/images";
	
	@Autowired
	private PhotoDao photoDao;
	
	
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
	
	@RequestMapping("/result")
	public String result(){
		logger.debug("into result page");
		return "result";
	}

	@RequestMapping(value = "/photo", method = RequestMethod.POST)
    public @ResponseBody String uploadMultipleFileHandler(@RequestParam("pictures") MultipartFile[] files) {
        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            
            if (file.isEmpty()) {
            	return "You failed to upload " + file.getOriginalFilename() + " because the file was empty.";
            }
            //upload file to server
            PhotoUploader.upload(file);
            
            //upload file information to DB
            Photo photo = new Photo(file.getOriginalFilename());
            
            //TODO add date to UUID for the case of exception
            photo.setUniqueId((UUID.randomUUID().toString()));
            photoDao.upload(photo);
            message = message + "You successfully uploaded file=" + file.getOriginalFilename() + "<br />";
        }
            return message;
    }

	@RequestMapping(value = "/photo", method = RequestMethod.DELETE)
	public String delete(String name) {
		File imagesDir = new File(ATTACHMENT_ROOT_DIR);
		File targetFile = new File(imagesDir.getAbsolutePath() + File.separator
				+ name);

		// TODO exception handling
		targetFile.delete();
		return name;
	}
}
