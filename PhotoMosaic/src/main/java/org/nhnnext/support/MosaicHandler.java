package org.nhnnext.support;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class MosaicHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(MosaicHandler.class);
	
	public void mergePhotos(Mosaic mosaic) throws IOException {

		int rows = 2; // we assume the no. of rows and cols are known and each
						// chunk has equal width and height
		int cols = 2;
		int chunks = rows * cols;

		int chunkWidth, chunkHeight;
		int type;

		// fetching image files
		File[] imgFiles = new File[chunks];
		Photo[] photos = mosaic.getPhotos();
		for (int i = 0; i < chunks; i++) {
			logger.debug("Photo :{}" , photos[i]);
			logger.debug(Constants.ATTACHMENT_ROOT_DIR + File.separator + photos[i].getUniqueId());
			imgFiles[i] = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + photos[i].getUniqueId());
		}

		// creating a bufferd image array from image files
		BufferedImage[] bufferedImages = new BufferedImage[chunks];
		for (int i = 0; i < chunks; i++) {
			bufferedImages[i] = ImageIO.read(imgFiles[i]);
		}
		type = bufferedImages[0].getType();
		
		logger.debug("type in the mergeImages : " + bufferedImages[0].getType());
		//criteria of the chunk size is first images size
		chunkWidth = bufferedImages[0].getWidth();
		logger.debug("chunkWidth :" + chunkWidth);
		chunkHeight = bufferedImages[0].getHeight();
		logger.debug("chunkHeight :" + chunkHeight);

		// Initializing the final image
		BufferedImage finalImg = new BufferedImage(chunkWidth * cols, chunkHeight * rows, type);

		int num = 0;
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				finalImg.createGraphics().drawImage(bufferedImages[num], chunkWidth * j, chunkHeight * i, null);
				num++;
			}
		}
		logger.debug("Image concatenated.....");
		String mergedPhotoName = Constants.ATTACHMENT_ROOT_DIR+ File.separator + mosaic.getFileName();
		File mergedImg = new File(mergedPhotoName);
		ImageIO.write(finalImg, "png", mergedImg);
	}
	
	public static Orientation judgeMosaicOrientation(Mosaic mosaic){
		int landscapeCount = 0;
		Orientation mosaicOrientation = null;
		for( Photo photo : mosaic.getPhotos()) {
			if(photo.getOrientation() == Orientation.LANDSCAPE){
				landscapeCount++;
			}else if(photo.getOrientation() == Orientation.PORTRAIT) {
				landscapeCount--;
			}
		}
		mosaicOrientation = (landscapeCount > 0) ? Orientation.LANDSCAPE : (landscapeCount < 0 ) ? Orientation.PORTRAIT: Orientation.SQUARE;
		return mosaicOrientation;
	}
	
	// 2,3,3 / 3,2,3 / 3,3,2 / 2,2,4 / 2,4,2 / 4,2,2 / 1,3,4/ 1,4,3 / 3,1,4 /3,4,1 /4,1,3/4,3,1
	// [,,0,,,,0,,,][,,,0,,,0,,,][,,,0,,,,0,,][,,0,,,0,,,,][,,0,,,,,0,,][,0,,,,0,,,,][,0,,,,,0,,,][,,,,0,,,,0,][,,,0,,,,,0,][,,,,0,,0,,,][,,,,0,,,,0,] 
	// 1,2,3,2 / 1,3,3,1 / 3,3,2 /
}