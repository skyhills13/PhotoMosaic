package org.nhnnext.library;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sun.misc.BASE64Decoder;

public class DataConverter {
	private static final Logger logger = LoggerFactory.getLogger(DataConverter.class);

	public static byte[] convertDataUrlToImg(String dataUrl) {
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
}
