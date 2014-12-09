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
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

public class PhotoHandler {
	private static final Logger logger = LoggerFactory.getLogger(PhotoHandler.class);
	
	public static BufferedImage getResizedPhoto(String filePath, Orientation basePhotoOrientation, Dimension resizeDimension) throws IOException {
		
		File file = new File(filePath);
		BufferedImage originalImage = ImageIO.read(file);
		
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		int resizeWidth = (int)resizeDimension.getWidth();
		int resizeHeight = (int)resizeDimension.getHeight();
		
		BufferedImage resizedImage = new BufferedImage(resizeWidth, resizeHeight, type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, resizeWidth, resizeHeight, null);
		g.dispose();
		
		return resizedImage;
	}
	
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
	
	public static Dimension getScaledDimension(Dimension originDimension, int scaleCriteriaSize, Orientation basePhotoOrientation) {
		Dimension dimension = new Dimension();
		
		//  origin width : scaleCriteriaSize = origin Height : x
		if( basePhotoOrientation == Orientation.LANDSCAPE) {
			double newHeight = scaleCriteriaSize * originDimension.getHeight() / originDimension.getWidth();
			dimension.setSize(scaleCriteriaSize, newHeight);
			
		} else if( basePhotoOrientation == Orientation.PORTRAIT) {
			double newWidth= scaleCriteriaSize * originDimension.getWidth() / originDimension.getHeight();
			dimension.setSize(newWidth, scaleCriteriaSize);
		} else {
			//TODO ThrowException
		}
		
		return dimension;
	}
	
	public static void sizedownPhoto(Photo photo) {
		int originalWidth = photo.getOriginalWidth();
		int originalHeight = photo.getOriginalHeight();
		photo.setScaledWidth(originalWidth/2);
		photo.setScaledHeight(originalHeight/2);
	}

	public static Photo getNewPhotoInstanceWithData(Mosaic mosaic, MultipartFile file) throws IOException {
		Dimension photoDimension = getImageDimension(mosaic, file.getOriginalFilename());
		logger.debug("dimension : " + photoDimension.getWidth() + " & " + photoDimension.getHeight());
		
		/*insert file information into the database*/
		int extensionIndex = file.getOriginalFilename().indexOf(".");
		String originalExtention = file.getOriginalFilename().substring(extensionIndex+1);

		String newUniqueId = mosaic.getUrl() + "-" + StringHandler.makeRandomId() +"."+originalExtention;
		return new Photo(newUniqueId, file.getOriginalFilename(), (int)photoDimension.getWidth(), (int)photoDimension.getHeight(), mosaic.getId());
	}
}
