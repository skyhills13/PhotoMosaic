package org.nhnnext.support;

import java.util.Random;
import java.util.UUID;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.PhotoDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StringHandler {
	private static final Logger logger = LoggerFactory.getLogger(StringHandler.class);
	
	public static String makeRandomId(){
		String newUniqueId = UUID.randomUUID().toString();
//		PhotoDao photoDao = new PhotoDao();
//		if(photoDao.findByUniqueId(newUniqueId) != null) {
//			makeRandomId();
//		};
		logger.debug("newUniqueId : " + newUniqueId);
		return newUniqueId;
	}
	
	public static String makeUrl(){
		int urlLength = 7;
		Random random = new Random();
		String includedCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String newUrl = "";
		
		char[] text = new char[urlLength];
		for (int i = 0; i < urlLength; i++){
			text[i] = includedCharacters.charAt(random.nextInt(includedCharacters.length()));
		}
		newUrl = new String(text);
//		MosaicDao mosaicDao = new MosaicDao();
//		if(mosaicDao.findByUrl(newUrl) != null) {
//			makeUrl();
//		}
		logger.debug("newUrl :" + newUrl);
		return newUrl;
	}
}
