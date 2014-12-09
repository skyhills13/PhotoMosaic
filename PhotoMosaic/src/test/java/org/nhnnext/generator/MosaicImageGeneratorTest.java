package org.nhnnext.generator;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.commons.fileupload.disk.DiskFileItem;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Constants;
import org.nhnnext.support.MosaicHandler;
import org.nhnnext.support.Orientation;
import org.nhnnext.support.PhotoHandler;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/applicationContext.xml")
public class MosaicImageGeneratorTest {

	private static Mosaic mosaic;
	
	@BeforeClass
	public static void init() throws IOException {
		//Create Mosaic
		mosaic = new Mosaic();
		mosaic.setId(1);
		
		String[] filePathArray = new String[]{
			"A0.jpg",
			"A1.jpg",
			"A2.jpg",
			"A3.jpg",
			
			"C0.jpg",
			"C1.jpg",
			"C2.jpg",
			"C3.jpg"
		};
		
		ArrayList<Photo> photoList = new ArrayList<Photo>();
		
		for (String path : filePathArray) {
			File file = getFile(path);
			DiskFileItem fileItem = new DiskFileItem("file", "text/plain", false, file.getName(), (int) file.length() , file.getParentFile());
			fileItem.getOutputStream();
			MultipartFile multipartFile = new CommonsMultipartFile(fileItem);
			
			Photo photo = PhotoHandler.getNewPhotoInstanceWithData(mosaic, multipartFile);
			photoList.add(photo);
		}
		assertEquals(filePathArray.length, photoList.size());
		
		for( Photo photo : photoList){
			photo.setOrientation(PhotoHandler.judgePhotoOrientation(photo));
		}
		
		mosaic.setFileName("testMosaic.png");
		mosaic.setPhotos(photoList.toArray(new Photo[photoList.size()]));
		Orientation mosaicOrientation = MosaicHandler.judgeMosaicOrientation(mosaic);
		mosaic.setOrientation(mosaicOrientation);
//		
		
	}
	
	@Test
	public void getMosaic() {
		System.out.println(mosaic.toString());
		MosaicImageGenerator mg = new MosaicImageGenerator(mosaic);
		try {
			mg.makeMosaicImage();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static File getFile(String fileName) {
		return new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + "test" + File.separator + fileName);
	}
}
