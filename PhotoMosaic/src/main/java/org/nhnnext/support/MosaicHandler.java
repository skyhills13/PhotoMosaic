package org.nhnnext.support;

import java.awt.Graphics2D;
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
	
//	private static final String ATTACHMENT_ROOT_DIR = "/Users/soeunpark/Documents/workspace/sts/PhotoMosaic/PhotoMosaic/webapp/images";
	private static final String ATTACHMENT_ROOT_DIR_REMOTE = "";
	private static final String ATTACHMENT_ROOT_DIR = "/Users/kimjoohwee/git/PhotoMosaic/PhotoMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR =  "/Users/min/dev/FinalProject/Git Repository/PhotoMosaic/webapp/images";

	private static final int CHUNK_WIDTH = 500;
	private static final int CHUNK_HEIGHT = 400;
	
	public static void mergePhotos(Mosaic mosaic) throws IOException {

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
			logger.debug(ATTACHMENT_ROOT_DIR + File.separator + photos[i].getOriginalFileName());
			imgFiles[i] = new File(ATTACHMENT_ROOT_DIR + File.separator + photos[i].getOriginalFileName());
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
		String mergedPhotoName = ATTACHMENT_ROOT_DIR+ File.separator + mosaic.getTitle() + ".png";
		File mergedImg = new File(mergedPhotoName);
		ImageIO.write(finalImg, "png", mergedImg);
	}
	
	public static void resizePhoto(Photo photo) throws IOException {
		File file = new File(ATTACHMENT_ROOT_DIR + File.separator + photo.getOriginalFileName());
		//TODO change throw exception to try catch 
		BufferedImage originalImage = ImageIO.read(file);
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		
		BufferedImage resizedImage = new BufferedImage(CHUNK_WIDTH, CHUNK_HEIGHT, type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, CHUNK_WIDTH, CHUNK_HEIGHT, null);
		g.dispose();
		
		ImageIO.write(resizedImage, "png", new File(ATTACHMENT_ROOT_DIR + File.separator + "resizecheckcheck.png"));
	}
	
	
	
	
//	private BufferedImage cropImage(BufferedImage src, Rectangle rect) {
//		BufferedImage dest = src.getSubimage(0, 0, rect.width, rect.height);
//		return dest;
//	}
	
}
