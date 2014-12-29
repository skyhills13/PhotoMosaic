package org.nhnnext.domains.support;

import java.io.File;
import java.io.IOException;

import org.nhnnext.support.file.FileTransferer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sun.misc.BASE64Decoder;

import com.google.gson.Gson;

public class DataURL {
	
	private static final Logger logger = LoggerFactory.getLogger(DataURL.class);
	
	private String fileName;
	private String dataURL;

	public static DataURL create(String dataURL) {
		Gson gson = new Gson();
		return gson.fromJson(dataURL, DataURL.class);
	}
	
	public DataURL(String dataURL) {
		this.dataURL = dataURL;
	}
	
	public String getFileName() {
		return fileName;
	}
	
	public String getDataURL() {
		return this.dataURL;
	}

	@Override
	public String toString() {
		return "DataUrl [fileName=" + fileName + ", dataURL=" + dataURL.substring(0,80)+ "..." + "]";
	}
	
	public byte[] toByteArray() {
		String imageDataBytes = dataURL.substring(dataURL.indexOf(",") + 1);
		BASE64Decoder decoder = new BASE64Decoder();
		byte[] bytes = null;
		try {
			bytes = decoder.decodeBuffer(imageDataBytes);
		} catch (IOException e) {
			logger.debug("convertDataUrlToImage error" + e.getMessage());
		}
		return bytes;
		// TODO Resource leak: ‘osf’ is never closed 경고 뜸.
	}

	public void saveFile(String photoBasePath) {
		//TODO 첫번째 라인은 두번째 라인에 포함될수있도록 리팩
		FileTransferer.createDir(photoBasePath);
		FileTransferer.uploadImageFile(toByteArray(), photoBasePath + File.separator + getFileName());
	}

	public String getFileExtension() {
		int extensionIndex = fileName.indexOf(".");
		String originalExtention = fileName.substring(extensionIndex+1);
		return originalExtention;
	}
}