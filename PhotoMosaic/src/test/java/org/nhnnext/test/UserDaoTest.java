package org.nhnnext.test;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ppomo.dao.DaoTemplate;
import ppomo.domain.table.User;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:/applicationContext.xml")
public class UserDaoTest {
	
	private static final Logger logger = LoggerFactory
			.getLogger(UserDaoTest.class);
	
	@Autowired
	private DaoTemplate userDao;


//	@Test
//	public void create(){
//		User user = new User(1, "111@111.com", "111");
//		userDao.create(user);
//		User actual = userDao.findByEmail(user.getEmail());
//		logger.debug("user: {}", actual);
//		assertThat(actual, is(user));
//	}
}
