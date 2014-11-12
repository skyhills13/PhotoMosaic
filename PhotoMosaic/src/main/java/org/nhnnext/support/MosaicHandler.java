package org.nhnnext.support;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MosaicHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(MosaicHandler.class);
	
	private static final String ATTACHMENT_ROOT_DIR = "/Users/soeunpark/Documents/workspace/sts/PhotoMosaic/PhotoMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR_REMOTE = "";
//	private static final String ATTACHMENT_ROOT_DIR = "/Users/kimjoohwee/git/PhotoMosaic/PhotoMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR =  "/Users/min/dev/FinalProject/Git Repository/PhotoMosaic/webapp/images";
	
	private static final int NUM_OF_PHOTOS = 8;
	private static final int CHUNK_WIDTH = 1000;
	private static final int CHUNK_HEIGHT = 750;
	
	public static void mergePhotos(Mosaic mosaic) throws IOException {

		int rows = 4; 
		int cols = 4;
		int chunks = rows * cols;

		int type;

		// fetching image files
		File[] imgFiles = new File[NUM_OF_PHOTOS];
		BufferedImage[] bufferedImages = new BufferedImage[NUM_OF_PHOTOS];
		Photo[] photos = mosaic.getPhotos();
		
		for (int i = 0; i < NUM_OF_PHOTOS; i++) {
			logger.debug("Photo :{}" , photos[i]);
			logger.debug(ATTACHMENT_ROOT_DIR + File.separator + photos[i].getUniqueId());
			imgFiles[i] = new File(ATTACHMENT_ROOT_DIR + File.separator + photos[i].getUniqueId());
			bufferedImages[i] = ImageIO.read(imgFiles[i]);
		}

		type = bufferedImages[0].getType() == 0 ? BufferedImage.TYPE_INT_ARGB : bufferedImages[0].getType();
		
		
		
		// Initializing the final image
		BufferedImage finalImg = new BufferedImage(CHUNK_WIDTH * cols, CHUNK_HEIGHT * rows, type);

		int num = 0;
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				finalImg.createGraphics().drawImage(bufferedImages[num], CHUNK_WIDTH * j, CHUNK_HEIGHT * i, null);
				num++;
			}
		}
		logger.debug("Image concatenated.....");
		String mergedPhotoName = ATTACHMENT_ROOT_DIR+ File.separator + mosaic.getFileName();
		File mergedImg = new File(mergedPhotoName);
		ImageIO.write(finalImg, "png", mergedImg);
	}
	

	
	/*
	 * temporal template 
	 * 2x1   0   1x1   1x2
	 * 1x3  1x2   0     0
	 * 0    1x2  2x1    0
	 * 0     0   2x1    0
	 */
	
//	private BufferedImage cropImage(BufferedImage src, Rectangle rect) {
//		BufferedImage dest = src.getSubimage(0, 0, rect.width, rect.height);
//		return dest;
//	}
	
//	private Photo[] randomlyPickPhoto(Photo[] photos){
//		return pickedPhotos;
//	}
	
}
