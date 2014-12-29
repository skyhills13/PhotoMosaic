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

import org.nhnnext.domains.support.DataURL;
import org.nhnnext.domains.table.Mosaic;
import org.nhnnext.domains.table.Photo;
import org.nhnnext.support.file.FileDataHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class PhotoHandler {
	private static final Logger logger = LoggerFactory.getLogger(PhotoHandler.class);
		
	public static BufferedImage getResizedPhoto(BufferedImage originalImage, Dimension resizeDimension) throws IOException {
		
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		int resizeWidth = (int)resizeDimension.getWidth();
		int resizeHeight = (int)resizeDimension.getHeight();
		
		BufferedImage resizedImage = new BufferedImage(resizeWidth, resizeHeight, type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, resizeWidth, resizeHeight, null);
		g.dispose();
		
		return resizedImage;
	}
	
	public static Dimension getImageDimension(int mosaicId, String fileName)
			throws IOException {
		//db에 넣어라 경로를. 
		//1.mosaic id와  fileName을 가진 새로운 객체를 만들어서 전달하던지 
		//객체 지향 기본 원칙은 같이 돌아다니는 애들은 묶어버리는거야. 그러면 새로운 행동을 넣을 수 있으니까.  
		//2.아니면 file을 넘기던지.
		//context 종속성. 
		//추상클래스를 만들던, 코드 단에서 앞, 뒤로 분리를 하던. 
		
		File imgFile = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaicId + File.separator + fileName);
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
	
	public static Orientation judgePhotoOrientation(Dimension originalDimension) {
		if( originalDimension.height> originalDimension.width) {
			return Orientation.PORTRAIT;
		} else if ( originalDimension.width > originalDimension.height) {
			return Orientation.LANDSCAPE;
		} else {
			return Orientation.SQUARE;
		}
	}
	
//	public static BufferedImage cropPhoto(Photo photo, Rectangle rect) throws IOException{
//		BufferedImage originalPhoto = ImageIO.read(new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + photo.getUniqueId()));
//		BufferedImage croppedImage = originalPhoto.getSubimage(0, 0, rect.width, rect.height);
//		return croppedImage; 
//	}
	
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

	public static Photo getNewPhotoInstanceWithData(Mosaic mosaic, DataURL dataUrl) throws IOException {
		Dimension photoDimension = getImageDimension(mosaic.getId(), dataUrl.getFileName());
		
		/*insert file information into the database*/
		String newUniqueId = StringHandler.getNewUniqueId(mosaic.getUrl(), dataUrl.getFileExtension());
		
		Photo newPhoto = new Photo(newUniqueId, dataUrl.getFileName(), photoDimension, mosaic.getId());
		newPhoto.setOrientation(PhotoHandler.judgePhotoOrientation(photoDimension));
		
		return newPhoto;
	}
	
	public static Photo getNewPhotoInstanceWithData(Mosaic mosaic, MultipartFile file) throws IOException {
		Dimension photoDimension = getImageDimension(mosaic.getId(), file.getOriginalFilename());
		
		/*insert file information into the database*/
		String newUniqueId = StringHandler.getNewUniqueId(mosaic.getUrl(), FileDataHandler.getFileExtension(file));
		
		Photo newPhoto = new Photo(newUniqueId, file.getOriginalFilename(), photoDimension, mosaic.getId());
		newPhoto.setOrientation(PhotoHandler.judgePhotoOrientation(photoDimension));
		
		return newPhoto;
	}
}