package org.nhnnext.domains.support;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sun.misc.BASE64Decoder;

public class DataURL {
	
	private static final Logger logger = LoggerFactory.getLogger(DataURL.class);
	
	private String fileName;
	private String dataURL;

	public DataURL(String dataURL) {
		this.dataURL = dataURL;
	}
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	public String getDataURL() {
		return this.dataURL;
	}
	public void setDataURL(String dataURL) {
		this.dataURL = dataURL;
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
}