package org.nhnnext.support;

import java.awt.Dimension;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.FileImageInputStream;
import javax.imageio.stream.ImageInputStream;

import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class PhotoHandler {
	private static final Logger logger = LoggerFactory.getLogger(PhotoHandler.class);
	private static final String ATTACHMENT_ROOT_DIR = "/Users/soeunpark/Documents/workspace/sts/PhotoMosaic/PhotoMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR_REMOTE = "";
//	private static final String ATTACHMENT_ROOT_DIR = "/Users/kimjoohwee/develop/PictureMosaic/PhotoMosaic/webapp/images";
//	private static final String ATTACHMENT_ROOT_DIR =  "/Users/min/dev/FinalProject/Git Repository/PhotoMosaic/webapp/images";

	public static String upload(MultipartFile multipartFile) {
		if (multipartFile.isEmpty()) {
			logger.debug("no picture");
			return null;
		}
		transferToAttachmentDir(multipartFile);
		return multipartFile.getOriginalFilename();
	}

	private static File transferToAttachmentDir(MultipartFile multipartFile) {
		File destFile = getDestinationFile(multipartFile.getOriginalFilename());
		try {
			multipartFile.transferTo(destFile);
		} catch (Exception ex) {
			throw new IllegalArgumentException(destFile + "로 첨부파일 옮기다 오류 발생");
		}
		return destFile;
	}

	public static File getDestinationFile(String fileName) {
		return new File(ATTACHMENT_ROOT_DIR + File.separator + fileName);
	}
	
	public static boolean delete(String fileName) {
		File targetFile = getDestinationFile(fileName);
		try {
			return targetFile.delete();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	//TODO should consider the case of the non-existence of dir (previous version of FileUploadController) 
	
	public static Dimension getImageDimension(String fileName)
			throws IOException {
		File imgFile = new File(ATTACHMENT_ROOT_DIR + File.separator + fileName);
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
	
	public static void mergeImages(int mosaicId) throws IOException{
		/*이거는 컨트롤러에 들어가야 함 임시로 여기에 넣어두었다.*/
		PhotoDao photoDao = new PhotoDao();
		
		
		int numOfPhotos = photoDao.getNumOfPhotos(mosaicId);
		Photo[] photos = new Photo[numOfPhotos];
		
		
		int rows = 2;   //we assume the no. of rows and cols are known and each chunk has equal width and height  
        int cols = 2;  
        int chunks = rows * cols;  
  
        int chunkWidth, chunkHeight;  
        int type;
        
        //fetching image files  
        File[] imgFiles = new File[chunks];  
        for (int i = 0; i < chunks; i++) {  
            imgFiles[i] = new File(ATTACHMENT_ROOT_DIR + File.separator + photos[i].getOriginalFileName());  
        }  
  
       //creating a bufferd image array from image files  
        BufferedImage[] bufferedImages = new BufferedImage[chunks];  
        for (int i = 0; i < chunks; i++) {  
            bufferedImages[i] = ImageIO.read(imgFiles[i]);  
        }  
        type = bufferedImages[0].getType();
        logger.debug("type in the mergeImages : " + bufferedImages[0].getType());
        chunkWidth = bufferedImages[0].getWidth();  
        chunkHeight = bufferedImages[0].getHeight();  
  
        //Initializing the final image  
        BufferedImage finalImg = new BufferedImage(chunkWidth*cols, chunkHeight*rows, type);  
  
        int num = 0;  
        for (int i = 0; i < rows; i++) {  
            for (int j = 0; j < cols; j++) {  
                finalImg.createGraphics().drawImage(bufferedImages[num], chunkWidth * j, chunkHeight * i, null);  
                num++;  
            }  
        }  
        logger.debug("Image concatenated.....");  
        ImageIO.write(finalImg, "jpeg", new File("finalImg.jpg"));
	}
}
