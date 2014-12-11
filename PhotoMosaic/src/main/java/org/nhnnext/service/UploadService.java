package org.nhnnext.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Constants;
import org.nhnnext.support.PhotoHandler;
import org.nhnnext.support.UploadHandler;
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
	
	private static final Logger logger = LoggerFactory
			.getLogger(UploadService.class);
	
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
			UploadHandler.upload(mosaic, file);
			
			/* get the information of the photo */
			try {
				photos[i] = PhotoHandler.getNewPhotoInstanceWithData(mosaic.getId(), mosaic.getUrl(), file);
			} catch (IOException e) {
				logger.debug("exception in uploadFiles of Mosaic Service : " + e.getMessage());
			}

			UploadHandler.renameAsUnique(mosaic, photos[i]);

			//PhotoHandler.sizedownPhoto(photos[i]);

			// Dimension scaledDimension =
			// PhotoHandler.getScaledDimension(photos[i]);
			// photos[i].setScaledWidth(scaledDimension.width);
			// photos[i].setScaledHeight(scaledDimension.height);
			// TODO add date to UUID for the case of exception
			photoDao.upload(photos[i]);
			logger.debug(Constants.UPLOAD_SUCCESS_MESSAGE
					+ file.getOriginalFilename());
		}
		logger.debug("*****************one mosaic end************************");
		return photos;
	}
	
	
	public void uploadUrl(String clientMosaic, String mosaicPath) {
		uploadMosaicFile(convertDataUrlToImg(clientMosaic), mosaicPath);
	}
	

	private byte[] convertDataUrlToImg(String dataUrl){
		String imageDataBytes = dataUrl.substring(dataUrl.indexOf(",") + 1);
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] bytes = null;
		try {
			bytes = decoder.decodeBuffer(imageDataBytes);
		} catch (IOException e) {
			logger.debug("convertDataUrlToImage error" + e.getMessage());
		}
		return bytes;
		
		// TODO Resource leak: 'osf' is never closed 경고 뜸.
	}
	
	private void uploadMosaicFile(byte[] bytes, String mosaicPath) {
		File of = new File(mosaicPath);
		FileOutputStream osf = null;
		try {
			osf = new FileOutputStream(of);
			try {
				osf.write(bytes);
				osf.flush();
			} catch (IOException e) {
				logger.debug("osf write, flush" + e.getMessage());
			} finally {
				try {
					osf.close();
				} catch (IOException e) {
					logger.debug("error" + e.getMessage());
				}
			}
		} catch (FileNotFoundException e) {
			logger.debug("error" + e.getMessage());
		}
	}

	

}
