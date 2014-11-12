package org.nhnnext.dao;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.nhnnext.domains.Photo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

public class MyBatisPhotoDao implements PhotoDao{
	private static final Logger logger = LoggerFactory
			.getLogger(MyBatisPhotoDao.class);
	
	private DataSource dataSource;
	
	private SqlSession sqlSession;
	
	@PostConstruct
	public void initialize() {
		ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
		populator.addScript(new ClassPathResource("photomosaic.sql"));
		DatabasePopulatorUtils.execute(populator, dataSource);
		logger.info("database initailized success!");
	}
	
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	@Override
	public Photo findByName(String originalFileName) {
		return sqlSession.selectOne("org.nhnnext.domains.UserMapper.findByName", originalFileName);
	}

	@Override
	public void upload(Photo photo) {
		sqlSession.insert("org.nhnnext.domains.UserMapper.upload", photo);
	}

	@Override
	public void deleteById(Photo photo) {
		
	}

	@Override
	public void deleteAll(Photo photo) {
		
	}

	@Override
	public Photo findByUniqueId(String uniqueId) {
		return sqlSession.selectOne("org.nhnnext.domains.UserMapper.findByUniqueId", uniqueId);
	}

	@Override
	public int getNumOfPhotos(int mosaicId) {
		int numOfPhotos = sqlSession.selectOne("org.nhnnext.domains.UserMapper.getNumOfPhotos", mosaicId);
		return numOfPhotos;
	}

}
