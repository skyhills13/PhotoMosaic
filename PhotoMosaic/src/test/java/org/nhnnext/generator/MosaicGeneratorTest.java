package org.nhnnext.generator;

import static org.junit.Assert.*;

import java.io.File;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/applicationContext.xml")
public class MosaicGeneratorTest {

	@Autowired
	PhotoDao photoDao;
	
	@BeforeClass
	public void init() {
		//Create Mosaic
		Mosaic mosaic = new Mosaic();
		mosaic.setId(1);
		String photoNameA0 = Constants.ATTACHMENT_ROOT_DIR + File.separator + "test" + File.separator + "A0.jpg";
		String photoNameA1 = Constants.ATTACHMENT_ROOT_DIR + File.separator + "test" + File.separator + "A0.jpg";
		String photoNameA2 = Constants.ATTACHMENT_ROOT_DIR + File.separator + "test" + File.separator + "A0.jpg";
		String photoNameA3 = Constants.ATTACHMENT_ROOT_DIR + File.separator + "test" + File.separator + "A0.jpg";
		String photoNameB0 = Constants.ATTACHMENT_ROOT_DIR + File.separator + "test" + File.separator + "A0.jpg";
		String photoNameC0 = Constants.ATTACHMENT_ROOT_DIR + File.separator + "test" + File.separator + "A0.jpg";
		String photoNameC1 = Constants.ATTACHMENT_ROOT_DIR + File.separator + "test" + File.separator + "A0.jpg";
		String photoName = Constants.ATTACHMENT_ROOT_DIR + File.separator + "test" + File.separator + "A0.jpg";
		
		//photoDao.upload(photo);
	}
	
	@Test
	public void getMosaic() {
		//new Photo();
		//MosaicGenerator mg = new MosaicGenerator(originPhotos, mosaicOrientation)
	}

}
