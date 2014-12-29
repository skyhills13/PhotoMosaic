package org.nhnnext.utility.dataurl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.nhnnext.domains.support.DataURL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sun.misc.BASE64Decoder;

public class DataURLConverter {
	private static final Logger logger = LoggerFactory.getLogger(DataURLConverter.class);

	public static byte[] toByteArray(String dataUrl) {
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
	public static List<byte[]> toListOfByteArray(List<DataURL> dataURLs){
		List<byte[]> bytesOfImages = new ArrayList<byte[]>();
		for (DataURL dataURL : dataURLs) {
			bytesOfImages.add(DataURLConverter.toByteArray(dataURL.getDataURL()));
		}
		return bytesOfImages;
	}
}
