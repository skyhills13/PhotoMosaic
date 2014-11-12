package org.nhnnext.test;

import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;
import org.nhnnext.domains.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class MyBatisTest {
	private static final Logger logger = LoggerFactory.getLogger(MyBatisTest.class);

	@Test
	public void findByNameTest() throws Exception {
		String resource = "mybatis-config-test.xml";
		InputStream inputStream = Resources.getResourceAsStream(resource);
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		SqlSession session = sqlSessionFactory.openSession();
		try {
			Photo photo = (Photo)session.selectOne("org.nhnnext.domains.PhotoMapper.findByName","tomyson1.png");
			logger.debug("Photo : {}" , photo);
		} finally {
			session.close();
		}
	}
}
