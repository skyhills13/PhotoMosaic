package org.nhnnext.web;

import java.awt.Dimension;
import java.io.IOException;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Constants;
import org.nhnnext.support.MosaicHandler;
import org.nhnnext.support.PhotoHandler;
import org.nhnnext.support.StringHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
	
	@Autowired
	private MosaicDao mosaicDao;
	
	@RequestMapping("/result")
	public String result(){
		logger.debug("into result page");
		return "result";
	}

	@RequestMapping(value = "/photo", method = RequestMethod.POST)
    public @ResponseBody String uploadMosaic(@RequestParam("photos") MultipartFile[] files, 
    		@RequestParam("title") String title, @RequestParam("comment") String comment) throws IOException {
		
		/*
		 * TODO exception handling for the case submit w/o photo
		* right now, mosaic table is updated without photo table update.
		* do it to check the situation before handling
		*/
		
		/*insert mosaic information into the database*/
		String mosaicUrl = StringHandler.makeUrl();
        Mosaic mosaic = new Mosaic(mosaicUrl+".png", title, mosaicUrl, comment);
        mosaicDao.upload(mosaic);
        int mosaicId = mosaicDao.findByUrl(mosaicUrl).getId();
        mosaic.setId(mosaicId);

        mosaic.setPhotos(uploadFiles(files, mosaic));

        /*merge photos*/
        MosaicHandler.mergePhotos(mosaic);
        mosaicDao.updateCreatedTime(mosaic);
        mosaic.setCreatedDate(mosaicDao.getCreatedTime(mosaic.getId()));
        
        PhotoHandler.resizePhoto(mosaic.getPhotos()[0]);
        return mosaic.getUrl();
    }
	
	public Photo[] uploadFiles(MultipartFile[] files, Mosaic mosaic) throws IOException{
		Photo[] photos = new Photo[files.length];
		for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            
            if (file.isEmpty()) {
            	logger.debug(Constants.UPLOAD_FAIL_MESSAGE + file.getOriginalFilename());
            	return null;
            }
            /*file upload to the server*/
            PhotoHandler.upload(file);
            
            /*get the information of the photo*/
            Dimension photoDimension = PhotoHandler.getImageDimension(file.getOriginalFilename());
            logger.debug("dimension : " + photoDimension.getWidth() + " & " + photoDimension.getHeight());
            
            /*insert file information into the database*/
            int extensionIndex = file.getOriginalFilename().indexOf(".");
            String originalExtention = file.getOriginalFilename().substring(extensionIndex+1);

            String newUniqueId = mosaic.getUrl() + "-" + StringHandler.makeRandomId() +"."+originalExtention;
            photos[i] = new Photo(newUniqueId, file.getOriginalFilename(), (int)photoDimension.getWidth(), (int)photoDimension.getHeight(), mosaic.getId());
            PhotoHandler.renameAsUnique(photos[i]);

            Dimension scaledDimension = PhotoHandler.getScaledDimension(photos[i]);
            photos[i].setScaledWidth(scaledDimension.width);
            photos[i].setScaledHeight(scaledDimension.height);
            //TODO add date to UUID for the case of exception
            photoDao.upload(photos[i]);
            logger.debug(Constants.UPLOAD_SUCCESS_MESSAGE + file.getOriginalFilename());
        }
		return photos;
	}

	//not using now 
	@RequestMapping(value = "/photo", method = RequestMethod.DELETE)
	public boolean delete(String name) {
		if(!PhotoHandler.delete(name)){
			logger.debug("cannot delete");
			return false;
		}
		return true;
	}
}
