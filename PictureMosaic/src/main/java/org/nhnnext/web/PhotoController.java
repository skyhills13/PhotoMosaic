package org.nhnnext.web;

import java.util.UUID;

import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.PhotoHandler;
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
	
	@Autowired
	private PhotoDao photoDao;
	
	@RequestMapping("/result")
	public String result(){
		logger.debug("into result page");
		return "result";
	}

	@RequestMapping(value = "/photo", method = RequestMethod.POST)
    public String uploadMultipleFileHandler(@RequestParam("pictures") MultipartFile[] files) {
        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            
            if (file.isEmpty()) {
            	return "You failed to upload " + file.getOriginalFilename() + " because the file was empty.";
            }

            PhotoHandler.upload(file);
            Photo photo = new Photo(file.getOriginalFilename());
            //TODO add date to UUID for the case of exception
            photo.setUniqueId((UUID.randomUUID().toString()));
            photoDao.upload(photo);
            message = message + "You successfully uploaded file=" + file.getOriginalFilename();
            logger.debug(message);
        }
            return "result";
    }

	@RequestMapping(value = "/photo", method = RequestMethod.DELETE)
	public boolean delete(String name) {
		if(!PhotoHandler.delete(name)){
			logger.debug("cannot delete");
			return false;
		}
		return true;
	}
}
