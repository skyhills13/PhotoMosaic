package org.nhnnext.web;

import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.nhnnext.service.MosaicService;
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
	private MosaicService mosaicService;
	
	@RequestMapping(value = "/photo", method = RequestMethod.POST)
    public @ResponseBody String uploadMosaic(@RequestParam("photos") MultipartFile[] files, 
    		@RequestParam("title") String title, @RequestParam("comment") String comment, @RequestParam("mosaic") String clientMosaic) throws IOException {
		
		String url = mosaicService.createMosaicInClient(files, title, comment, clientMosaic);
        return url;
    }
	@RequestMapping(value = "/photoServer", method = RequestMethod.POST)
	public @ResponseBody String uploadServerMosaic(@RequestParam("photos") MultipartFile[] files, 
			@RequestParam("title") String title, @RequestParam("comment") String comment, @RequestParam("mosaic") String clientMosaic) throws IOException {

		String url = mosaicService.createMosaicInServer(files, title, comment, clientMosaic);
		return url;
	}

//	//not using now 
//	@RequestMapping(value = "/photo", method = RequestMethod.DELETE)
//	public boolean delete(String name) {
//		if(!UploadHandler.delete(name)){
//			logger.debug("cannot delete");
//			return false;
//		}
//		return true;
//	}
}
