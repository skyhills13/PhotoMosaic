package org.nhnnext.support;

import java.awt.Dimension;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.ImageInputStream;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PhotoHandler {
	private static final Logger logger = LoggerFactory.getLogger(PhotoHandler.class);
	
	private static final int PORTRAIT_INDIVIDUAL_WIDTH = 800;
	private static final int LANDSCAPE_INDIVIDUAL_HEIGHT = 500;
	
	public static void resizePhoto(Mosaic mosaic, Photo photo) throws IOException {
		File file = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + photo.getUniqueId());
		//TODO change throw exception to try catch 
		BufferedImage originalImage = ImageIO.read(file);
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		
		BufferedImage resizedImage = new BufferedImage(photo.getScaledWidth(), photo.getScaledHeight(), type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, photo.getScaledWidth(), photo.getScaledHeight(), null);
		g.dispose();
		
		ImageIO.write(resizedImage, "jpg", new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + "resizecheckcheck.jpg"));
	}
	
	public static Dimension getImageDimension(Mosaic mosaic, String fileName)
			throws IOException {
		File imgFile = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + fileName);
		int pos = imgFile.getName().lastIndexOf(".");
		if (pos == -1) {
			throw new IOException(Constants.WRONG_FILE + imgFile.getAbsolutePath());
		}
		String suffix = imgFile.getName().substring(pos + 1);
		Iterator<ImageReader> iterator = ImageIO.getImageReadersBySuffix(suffix);
		if (iterator.hasNext()) {
			ImageReader reader = iterator.next();
			try {
				ImageInputStream stream = new FileImageInputStream(imgFile);
				reader.setInput(stream);
				int width = reader.getWidth(reader.getMinIndex());
				int height = reader.getHeight(reader.getMinIndex());
				return new Dimension(width, height);
			} catch (IOException e) {
				logger.warn("Error reading: " + imgFile.getAbsolutePath(), e);
			} finally {
				reader.dispose();
			}
		}
		throw new IOException(Constants.NOT_IMAGE + imgFile.getAbsolutePath());
	}
	
	public static Orientation judgePhotoOrientation(Photo photo) {
		if( photo.getOriginalHeight() > photo.getOriginalWidth()) {
			return Orientation.PORTRAIT;
		} else if ( photo.getOriginalWidth() > photo.getOriginalHeight()) {
			return Orientation.LANDSCAPE;
		} else {
			return Orientation.SQUARE;
		}
	}
	
	public static BufferedImage cropPhoto(Photo photo, Rectangle rect) throws IOException{
		BufferedImage originalPhoto = ImageIO.read(new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + photo.getUniqueId()));
		BufferedImage croppedImage = originalPhoto.getSubimage(0, 0, rect.width, rect.height);
		return croppedImage; 
	}
	
	//다른 케이스에도 scale 다운할 수 있도록 parameter로 받기
	public static Dimension getScaledDimension(Photo photo) {
		Dimension boundary = new Dimension(PORTRAIT_INDIVIDUAL_WIDTH, LANDSCAPE_INDIVIDUAL_HEIGHT);
		int originalWidth = photo.getOriginalWidth();
		int originalHeight = photo.getOriginalHeight();
		int boundWidth = boundary.width;
		int boundHeight = boundary.height;
		int newWidth = originalWidth;
		int newHeight = originalHeight;
		
		if( photo.getOrientation() == Orientation.PORTRAIT) {
			if (originalWidth > boundWidth) {
				newWidth = boundWidth;
				newHeight = (newWidth * originalHeight) / originalWidth;
			}
		}
		if ( photo.getOrientation() == Orientation.LANDSCAPE) {
			if(newHeight > boundHeight) {
				newHeight = boundHeight;
				newWidth = (newHeight * originalWidth) / originalHeight;
			}
		}
		return new Dimension(newWidth, newHeight);
	}
	public static void sizedownPhoto(Photo photo) {
		int originalWidth = photo.getOriginalWidth();
		int originalHeight = photo.getOriginalHeight();
		photo.setScaledWidth(originalWidth/2);
		photo.setScaledHeight(originalHeight/2);
	}
}
