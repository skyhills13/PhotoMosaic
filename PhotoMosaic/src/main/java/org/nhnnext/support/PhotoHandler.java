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

import org.nhnnext.domains.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

public class PhotoHandler {
	private static final Logger logger = LoggerFactory.getLogger(PhotoHandler.class);


	private static final int CHUNK_WIDTH = 1000;
	private static final int CHUNK_HEIGHT = 750;
	
	
	public static void resizePhoto(Photo photo) throws IOException {
		File file = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + photo.getUniqueId());
		//TODO change throw exception to try catch 
		BufferedImage originalImage = ImageIO.read(file);
		int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();
		

		//photo.getScaleedWidth()같은 값을 두 군데에서 사용하고 있으니 미리 변수로 담가두고, 생성자의 인자로 추가하면 어때? 
		//그렇게되면 생성자 호출문도 지금보다 좀더 간걸해보일거 같고.
		BufferedImage resizedImage = new BufferedImage(photo.getScaledWidth(), photo.getScaledHeight(), type);
		Graphics2D g = resizedImage.createGraphics();
		g.drawImage(originalImage, 0, 0, photo.getScaledWidth(), photo.getScaledHeight(), null);
		g.dispose();
		
		ImageIO.write(resizedImage, "png", new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + "resizecheckcheck.png"));
	}
	
	//에러처리코드가 많이 필요한 코드인가봐. 이런 경우 예외상황에 대해서 테스트를 해보는 것도 좋겠어.(예외발생시 적절한 exception이 발생하는지)
	//아! java 개발하면서 test code구현을 해보는 건 어때? 물론 권장사항이고. 핵심로직에 대해서는 test code가 있다면 좋겠음.
	public static Dimension getImageDimension(String fileName)
			throws IOException {
		File imgFile = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + fileName);
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
