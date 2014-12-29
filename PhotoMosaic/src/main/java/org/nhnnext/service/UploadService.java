package org.nhnnext.service;

import java.io.IOException;

import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.table.Mosaic;
import org.nhnnext.domains.table.Photo;
import org.nhnnext.library.DataURLConverter;
import org.nhnnext.support.Constants;
import org.nhnnext.support.PhotoHandler;
import org.nhnnext.support.file.FileDataHandler;
import org.nhnnext.support.file.FileTransferer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import sun.misc.BASE64Decoder;

@Service
public class UploadService {
	
	@Autowired
	PhotoDao photoDao;
	
	private static final Logger logger = LoggerFactory.getLogger(UploadService.class);
	
	public Photo[] uploadMultipartFiles(MultipartFile[] files, Mosaic mosaic){
		Photo[] photos = new Photo[files.length];
		logger.debug("*****************one mosaic start************************");
		for (int i = 0; i < files.length; i++) {
			MultipartFile file = files[i];

			if (file.isEmpty()) {
				logger.debug(Constants.UPLOAD_FAIL_MESSAGE
						+ file.getOriginalFilename());
				return null;
			}
			/* file upload to the server */
			FileTransferer.uploadMultipartFile(mosaic, file);
			
			/* get the information of the photo */
			try {
				photos[i] = PhotoHandler.getNewPhotoInstanceWithData(mosaic.getId(), mosaic.getUrl(), file);
			} catch (IOException e) {
				logger.debug("exception in uploadFiles of Mosaic Service : " + e.getMessage());
			}
			FileDataHandler.renameAsUnique(mosaic, photos[i]);

			photoDao.upload(photos[i]);
			logger.debug(Constants.UPLOAD_SUCCESS_MESSAGE
					+ file.getOriginalFilename());
		}
		logger.debug("*****************one mosaic end************************");
		return photos;
	}
	
//	public void uploadPhotosUrl(String[] files, Mosaic mosaic){
//		UploadHandler.createDir(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId());
//		for(int i = 0; i < files.length; ++i ){
//			uploadImageFile(convertDataUrlToImg(files[i]), Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + );
//		}
//	}
	
	public void uploadMosaicUrl(String clientMosaic, String mosaicPath) {
		FileTransferer.uploadImageFile(DataURLConverter.convertDataUrlToImg(clientMosaic), mosaicPath);
	}
}
