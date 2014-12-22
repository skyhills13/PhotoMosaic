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
    		@RequestParam("title") String title, @RequestParam("comment") String comment, @RequestParam("mosaic") String clientMosaic, @RequestParam("resizedDataURLs") String[] resizedDataURLs, HttpSession session) throws IOException {
		
		/* 2014.12.21 Poppy
		 * resizedDataURLs는 JSON의 List 입니다.
		 * (parameter 받는 곳에서는 JSON 타입에 대해 잘 몰라서 String[] 으로 받았습니다)
		 * POST에 붙여 보낼 이름은 적당히 고쳐쓰시면 될 것 같아요.
		 * (select.js 의 130 라인과 함께 바꾸면 됩니다)
		 */
		for (String json : resizedDataURLs) {
			logger.debug(json.substring(0, 80) + "...");
			// TODO json을 파싱해서 dataURL의 value를 MultipartFile로 변경하는 로직 수행 하면 되지 않을까?
		}
		String url = mosaicService.createMosaicInClient(files, title, comment, clientMosaic, session);
        return url;
    }
	@RequestMapping(value = "/photoServer", method = RequestMethod.POST)
	public @ResponseBody String uploadServerMosaic(@RequestParam("photos") MultipartFile[] files, 
			@RequestParam("title") String title, @RequestParam("comment") String comment, @RequestParam("mosaic") String clientMosaic, HttpSession session) throws IOException {
		logger.debug("server upload method");
		String url = mosaicService.createMosaicInServer(files, title, comment, clientMosaic, session);
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
