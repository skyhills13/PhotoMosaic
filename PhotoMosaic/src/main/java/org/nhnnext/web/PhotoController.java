package org.nhnnext.web;

import java.awt.Dimension;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.PhotoDao;
import org.nhnnext.dao.UserDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.domains.User;
import org.nhnnext.support.Constants;
import org.nhnnext.support.PhotoHandler;
import org.nhnnext.support.StringHandler;
import org.nhnnext.support.UploadHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import sun.misc.BASE64Decoder;

@Controller
public class PhotoController {

	private static final Logger logger = LoggerFactory
			.getLogger(PhotoController.class);
	
	@Autowired
	private PhotoDao photoDao;
	
	@Autowired
	private MosaicDao mosaicDao;

	@Autowired
	private UserDao userDao;
	
	@RequestMapping(value = "/photo", method = RequestMethod.POST)
    public @ResponseBody String uploadMosaic(@RequestParam("photos") MultipartFile[] files, 
    		@RequestParam("title") String title, @RequestParam("comment") String comment, @RequestParam("mosaic") String clientMosaic, HttpSession session) throws IOException {
		
		String userEmail = "";
		User currentUser = null;
		if (session.getAttribute("email") != null) {
			userEmail = session.getAttribute("email").toString();
			currentUser = userDao.findByEmail(userEmail);
		}
		logger.debug("session :" + userEmail);
		logger.debug("session :" + userEmail.isEmpty());
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
		if(currentUser != null) {
			logger.debug("into the if sentence");
			int currentUserId = currentUser.getId();
			mosaic.setUserId(currentUserId);
			mosaicDao.updateUserId(mosaic);
			logger.debug("mosaic id : " + mosaic.getId());
			logger.debug("mosaic user id : " + mosaic.getUserId());
		}
		mosaic.setPhotos(uploadFiles(files, mosaic));
		
		String mosaicPath = Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() +File.separator + mosaic.getFileName();
		
		convertDataUrlToImg(clientMosaic, mosaicPath);
		
        /*merge photos*/
//        MosaicHandler.mergePhotos(mosaic);
        mosaicDao.updateCreatedTime(mosaic);
        mosaic.setCreatedDate(mosaicDao.getCreatedTime(mosaic.getId()));
        
//        PhotoHandler.resizePhoto(mosaic.getPhotos()[0]);
        return mosaic.getUrl();
    }
	
	public Photo[] uploadFiles(MultipartFile[] files, Mosaic mosaic) throws IOException{
		Photo[] photos = new Photo[files.length];
		logger.debug("*****************one mosaic start************************");
		for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            
            if (file.isEmpty()) {
            	logger.debug(Constants.UPLOAD_FAIL_MESSAGE + file.getOriginalFilename());
            	return null;
            }
            /*file upload to the server*/
            UploadHandler.upload(mosaic, file);
            
            /*get the information of the photo*/
            Dimension photoDimension = PhotoHandler.getImageDimension(mosaic, file.getOriginalFilename());
            logger.debug("dimension : " + photoDimension.getWidth() + " & " + photoDimension.getHeight());
            
            /*insert file information into the database*/
            int extensionIndex = file.getOriginalFilename().indexOf(".");
            String originalExtention = file.getOriginalFilename().substring(extensionIndex+1);

            String newUniqueId = mosaic.getUrl() + "-" + StringHandler.makeRandomId() +"."+originalExtention;
            photos[i] = new Photo(newUniqueId, file.getOriginalFilename(), (int)photoDimension.getWidth(), (int)photoDimension.getHeight(), mosaic.getId());
            UploadHandler.renameAsUnique(mosaic, photos[i]);

            Dimension scaledDimension = PhotoHandler.getScaledDimension(photos[i]);
            photos[i].setScaledWidth(scaledDimension.width);
            photos[i].setScaledHeight(scaledDimension.height);
            //TODO add date to UUID for the case of exception
            photoDao.upload(photos[i]);
            logger.debug(Constants.UPLOAD_SUCCESS_MESSAGE + file.getOriginalFilename());
        }
		logger.debug("*****************one mosaic end************************");
		return photos;
	}
	
	public void convertDataUrlToImg(String dataUrl, String mosaicPath) throws IOException{
		String imageDataBytes = dataUrl.substring(dataUrl.indexOf(",")+1);
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] bytes = decoder.decodeBuffer(imageDataBytes);
		
		File of = new File(mosaicPath);  
		FileOutputStream osf = new FileOutputStream(of);  
		osf.write(bytes);  
		osf.flush();  
		// TODO Resource leak: 'osf' is never closed 경고 뜸.
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
