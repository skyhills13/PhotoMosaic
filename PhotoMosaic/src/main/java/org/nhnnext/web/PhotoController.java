package org.nhnnext.web;

import java.util.UUID;

import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.PhotoHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	
//	@RequestMapping(value="/tempSelect")
//	public String test1(Model model){
//		model.addAttribute("mosaic", new Mosaic());
//		logger.debug("Model:{}", model);
//		return "tempSelect";
//	}
	
	@RequestMapping(value="/test", method=RequestMethod.POST)
	public String test2(Model model) {
		return "result";
	}

	@RequestMapping(value = "/photo", method = RequestMethod.POST)
    public String uploadMultipleFileHandler(@RequestParam("photos") MultipartFile[] files) {
        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            
            if (file.isEmpty()) {
            	return "You failed to upload " + file.getOriginalFilename() + " because the file was empty.";
            }

            PhotoHandler.upload(file);
            Mosaic mosaic = new Mosaic();
            Photo photo = new Photo(file.getOriginalFilename());
            //TODO add date to UUID for the case of exception
            photo.setUniqueId((UUID.randomUUID().toString()));
            photoDao.upload(photo);
            message = message + file.getOriginalFilename() + ", ";
        }
        
        logger.debug("You successfully uploaded files=" + message);
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
