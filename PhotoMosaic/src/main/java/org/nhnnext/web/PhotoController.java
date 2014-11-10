package org.nhnnext.web;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Constants;
import org.nhnnext.support.PhotoHandler;
import org.nhnnext.support.StringHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	
	@Autowired
	private MosaicDao mosaicDao;
	
	@RequestMapping("/result")
	public String result(){
		logger.debug("into result page");
		return "result";
	}

	@RequestMapping(value = "/photo", method = RequestMethod.POST)
    public String uploadMultipleFileHandler(@RequestParam("photos") MultipartFile[] files, @RequestParam("title") String title, @RequestParam("contents") String contents) {

        Mosaic mosaic = new Mosaic();
        mosaic.setTitle(title);
        mosaic.setContents(contents);

        String newUrl = StringHandler.makeUrl();
        mosaic.setUrl(newUrl);
        mosaicDao.upload(mosaic);

        int mosaicId = mosaicDao.findByUrl(newUrl).getId();
        //TODO check for the right usage
        mosaic.setId(mosaicId);
        
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            
            if (file.isEmpty()) {
            	logger.debug(Constants.UPLOAD_FAIL_MESSAGE + file.getOriginalFilename());
            	return null;
            }

            PhotoHandler.upload(file);
            String newUniqueId = StringHandler.makeRandomId();
            Photo photo = new Photo(newUniqueId, file.getOriginalFilename(), mosaicId);
            //TODO add date to UUID for the case of exception
            photoDao.upload(photo);
            logger.debug(Constants.UPLOAD_SUCCESS_MESSAGE + file.getOriginalFilename());
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
