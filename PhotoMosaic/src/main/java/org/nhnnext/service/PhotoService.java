package org.nhnnext.service;

import java.util.ArrayList;
import java.util.List;

import org.nhnnext.domains.support.DataURL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;

@Service
public class PhotoService {
	
	private static final Logger logger = LoggerFactory.getLogger(PhotoService.class);
	
	public void savePhotos(String[] resizedDataURLs, String photoBasePath) {
		List<DataURL> dataURLs = getDataURLList(resizedDataURLs);
		List<byte[]> listOfByteArray = new ArrayList<byte[]>();
		
		for (DataURL dataURL : dataURLs) {
			listOfByteArray.add(dataURL.toByteArray());
		}
		
		for (byte[] singleImage : listOfByteArray) {
	//		FileTransferer.uploadImageFile(singleImage, photoBasePath + File.separator + dataURL.getFileName());
		}
	}

	private List<DataURL> getDataURLList(String[] resizedDataURLs) {
		Gson gson = new Gson();
		List<DataURL> dataURLs = new ArrayList<DataURL>();
		for (String resizedDataUrl : resizedDataURLs) {
			logger.debug(resizedDataUrl.substring(0, 80) + "...");
			dataURLs.add(gson.fromJson(resizedDataUrl, DataURL.class));
		}
		return dataURLs;
	}
}