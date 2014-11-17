package org.nhnnext.web;

import java.awt.Dimension;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
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

	//File을 다루는 메서드나 클래스가 많네. Exception을 발생시키면서 오류처리가 잘 되는지 잘봐야겠어.
	//메인 라이팅역할을 하는 아래 메서드는 좀더 간결한 로직만 담고 있고, 세부자세한 로직은 더 많은 메서드를 만들어서 분리해도 될 듯.
	@RequestMapping(value = "/photo", method = RequestMethod.POST)
    public @ResponseBody String uploadMosaic(@RequestParam("photos") MultipartFile[] files, 
    		@RequestParam("title") String title, @RequestParam("comment") String comment, @RequestParam("mosaic") String clientMosaic) throws IOException {
		
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
		
		
		String imageDataBytes = clientMosaic.substring(clientMosaic.indexOf(",")+1);
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] bytes = decoder.decodeBuffer(imageDataBytes);
		
		File of = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getUrl() + ".png");  
		FileOutputStream osf = new FileOutputStream(of);  
		osf.write(bytes);  
		osf.flush();  

        /*merge photos*/
//        MosaicHandler.mergePhotos(mosaic);
        mosaicDao.updateCreatedTime(mosaic);
        mosaic.setCreatedDate(mosaicDao.getCreatedTime(mosaic.getId()));
        
//        PhotoHandler.resizePhoto(mosaic.getPhotos()[0]);
        return mosaic.getUrl();
    }
	
	//uploadFiles를 몇 개의 메서드로 더 분리하는 건 어떨까? 
	public Photo[] uploadFiles(MultipartFile[] files, Mosaic mosaic) throws IOException{
		Photo[] photos = new Photo[files.length];
		for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            
            if (file.isEmpty()) {
            	logger.debug(Constants.UPLOAD_FAIL_MESSAGE + file.getOriginalFilename());
            	return null;
            }
            /*file upload to the server*/
            UploadHandler.upload(file);
            
            /*get the information of the photo*/
            Dimension photoDimension = PhotoHandler.getImageDimension(file.getOriginalFilename());
            logger.debug("dimension : " + photoDimension.getWidth() + " & " + photoDimension.getHeight());
            
            /*insert file information into the database*/
            int extensionIndex = file.getOriginalFilename().indexOf(".");
            String originalExtention = file.getOriginalFilename().substring(extensionIndex+1);

            String newUniqueId = mosaic.getUrl() + "-" + StringHandler.makeRandomId() +"."+originalExtention;
            photos[i] = new Photo(newUniqueId, file.getOriginalFilename(), (int)photoDimension.getWidth(), (int)photoDimension.getHeight(), mosaic.getId());
            UploadHandler.renameAsUnique(photos[i]);

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
		if(!UploadHandler.delete(name)){
			logger.debug("cannot delete");
			return false;
		}
		return true;
	}
}
