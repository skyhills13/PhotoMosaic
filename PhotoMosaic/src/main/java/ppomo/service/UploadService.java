package ppomo.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ppomo.dao.PhotoDao;
import ppomo.domain.support.DataURL;
import ppomo.domain.table.Mosaic;
import ppomo.domain.table.Photo;
import ppomo.support.Constants;
import ppomo.support.PhotoHandler;
import ppomo.support.file.FileDataHandler;
import ppomo.support.file.FileTransferer;

@Service
public class UploadService {
	
	@Autowired
	PhotoDao photoDao;
	
	@Autowired
	PhotoService photoService;
	
	private static final Logger logger = LoggerFactory.getLogger(UploadService.class);
	
	public Photo[] uploadDataUrlList(List<DataURL> dataUrlList, Mosaic mosaic){
		Photo[] photos = new Photo[dataUrlList.size()];
		
		String photoBasePath = Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId();
		photoService.savePhotos(dataUrlList, photoBasePath);
		
		logger.debug("*****************one mosaic start************************");
		for (int i = 0; i < dataUrlList.size(); i++) {
			DataURL dataURL = dataUrlList.get(i);
			logger.debug("dataURL in uploadDataUrlList : {}", dataURL.toString());
			
			try {
				photos[i] = PhotoHandler.getNewPhotoInstanceWithData(mosaic, dataURL);
			} catch (Exception e) {
				logger.debug("exception in uploadFiles of Mosaic Service : " + e.getMessage());
			}
			FileDataHandler.renameAsUnique(mosaic, photos[i]);

			photoDao.upload(photos[i]);
			logger.debug(Constants.UPLOAD_SUCCESS_MESSAGE
					+ dataURL.getFileName());
		}
		logger.debug("*****************one mosaic end************************");
		
		return photos;
	}
	
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
				photos[i] = PhotoHandler.getNewPhotoInstanceWithData(mosaic, file);
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
	
	public void uploadMosaicUrl(DataURL dataURL, String mosaicPath) {
		FileTransferer.uploadImageFile(dataURL.toByteArray(), mosaicPath);
	}
}