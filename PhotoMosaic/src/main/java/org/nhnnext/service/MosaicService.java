package org.nhnnext.service;

import java.io.File;
import java.io.IOException;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.domains.User;
import org.nhnnext.generator.MosaicImageGenerator;
import org.nhnnext.support.Constants;
import org.nhnnext.support.MosaicHandler;
import org.nhnnext.support.Orientation;
import org.nhnnext.support.PhotoHandler;
import org.nhnnext.support.StringHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MosaicService {
	private static final Logger logger = LoggerFactory.getLogger(MosaicService.class);

	@Autowired
	MosaicDao mosaicDao;
	
	@Autowired
	PhotoDao photoDao;

	@Autowired
	UploadService uploadService;

	@Autowired
	UserService userService;
	
	public String createMosaicInClient(MultipartFile[] files, String title, String comment, String clientMosaic) {
		return createMosaic(files, title, comment, clientMosaic, false);
	}
	
	public String createMosaicInServer(MultipartFile[] files, String title, String comment, String clientMosaic) {
		return createMosaic(files, title, comment, clientMosaic, true);
	}
	
	private String createMosaic(MultipartFile[] files, String title, String comment, String clientMosaic, boolean server) {
		Mosaic mosaic = createMosaicObject(title, comment);
		Photo[] photoArr = uploadService.uploadMultipartFiles(files, mosaic);
		mosaic.setPhotos(photoArr);
		
		String mosaicPath = Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() +File.separator + mosaic.getFileName();
		
		if( server ) {
//			for( Photo photo : mosaic.getPhotos()){
//				photo.setOrientation(PhotoHandler.judgePhotoOrientation(photo));
//			}
			Orientation mosaicOrientation = MosaicHandler.judgeMosaicOrientation(mosaic);
			mosaic.setOrientation(mosaicOrientation);
			/**
			 * Test
			 */
			MosaicImageGenerator mosaicImageGenerator = new MosaicImageGenerator(mosaic);
			try {
				mosaicImageGenerator.makeMosaicImage();
			} catch (IOException e1) {
				logger.error("exception in createMosaic of server : " + e1.getMessage());
			}
		
		} else {
			uploadService.uploadUrl(clientMosaic, mosaicPath);
		}
        /*merge photos*/
//      MosaicHandler.mergePhotos(mosaic);
        mosaicDao.updateCreatedTime(mosaic);
        mosaic.setCreatedDate(mosaicDao.getCreatedTime(mosaic.getId()));
        
//      PhotoHandler.resizePhoto(mosaic.getPhotos()[0]);
        return mosaic.getUrl();	
	}
	//tx를 걸면, rollback할 시, autoincrement는 rollback이 안될수도 있어. 그래서 조심해야되. 1357만 남을수 있으니까. 
	//그러니까 아이디가 10이라고 갯수가 10개가 아닐 수도 있어. 
	//pk는 하나인게 좋아. 자연키(비지니스적 의미가 있기 때문에 변할 수 있어), 대리키. 중에 대리키를 pk로 하는 것이 더 편해. 
	//왜냐면, pk는 몇가지 규칙이 있어. 그중 하나는 변하면 안되는게 있는데, 자연키는 비지니스 의미가 있기 때문에, 변할 수가 있어. 그래서 대리키가 pk로 더 좋아. 
	private Mosaic createMosaicObject(String title, String comment) {
		User currentUser = userService.getCurrentUser();
		/*
		 * TODO exception handling for the case submit w/o photo right now,
		 * mosaic table is updated without photo table update. do it to check
		 * the situation before handling
		 */
		/* insert mosaic information into the database */
		String mosaicUrl = StringHandler.makeUrl();
		Mosaic mosaic = new Mosaic(mosaicUrl + ".png", title, mosaicUrl,
				comment);
		mosaicDao.upload(mosaic);
		int mosaicId = mosaicDao.findByUrl(mosaicUrl).getId();
		mosaic.setId(mosaicId);
		if (currentUser != null) {
			int currentUserId = currentUser.getId();
			mosaic.setUserId(currentUserId);
			mosaicDao.updateUserId(mosaic);
		}
		return mosaic;
	}
}
