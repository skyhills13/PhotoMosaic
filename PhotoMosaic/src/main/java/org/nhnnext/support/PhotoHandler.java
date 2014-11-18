package org.nhnnext.support;

import java.awt.Dimension;
import java.awt.Graphics2D;
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


	private static final int CHUNK_WIDTH = 1000;
	private static final int CHUNK_HEIGHT = 750;
	
	
	public static void resizePhoto(Mosaic mosaic, Photo photo) throws IOException {
		File file = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + photo.getUniqueId());
		//TODO change throw exception to try catch 
		BufferedImage originalImage = ImageIO.read(file);
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		
		BufferedImage resizedImage = new BufferedImage(photo.getScaledWidth(), photo.getScaledHeight(), type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, photo.getScaledWidth(), photo.getScaledHeight(), null);
		g.dispose();
		
		ImageIO.write(resizedImage, "png", new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + "resizecheckcheck.png"));
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
	
	public static Dimension getScaledDimension(Photo photo) {
		Dimension boundary = new Dimension(CHUNK_WIDTH, CHUNK_HEIGHT);
		int originalWidth = photo.getOriginalWidth();
		int originalHeight = photo.getOriginalHeight();
		int boundWidth = boundary.width;
		int boundHeight = boundary.height;
		int newWidth = originalWidth;
		int newHeight = originalHeight;
		
		if (originalWidth > boundWidth) {
			newWidth = boundWidth;
			newHeight = (newWidth * originalHeight) / originalWidth;
		}
		
		if(newHeight > boundHeight) {
			newHeight = boundHeight;
			newWidth = (newHeight * originalWidth) / originalHeight;
		}
		return new Dimension(newWidth, newHeight);
	}
}
