package org.nhnnext.test;

import static org.junit.Assert.assertEquals;

import java.util.UUID;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domain.table.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/applicationContext.xml")
public class PhotoDaoTest {
	
	private static final Logger logger = LoggerFactory.getLogger(PhotoDaoTest.class);
	
	@Autowired
	private PhotoDao photoDao;
	
	@Test
	public void upload(){
		Photo photo = new Photo("tomyson1.png");
		photo.setUniqueId(UUID.randomUUID().toString());
		photoDao.upload(photo);
		Photo dbPhoto = photoDao.findByName(photo.getOriginalFileName());
		logger.debug("dbPhoto:{}", dbPhoto);
		logger.debug("photo:{}", photo.getUniqueId());
		logger.debug("dbphoto:{}", dbPhoto.getUniqueId());
		//TODO solve assertEquals error
		//둘다 아님 
		assertEquals(photo, dbPhoto);
		//assertThat(photo, is(dbPhoto));
	}
}
