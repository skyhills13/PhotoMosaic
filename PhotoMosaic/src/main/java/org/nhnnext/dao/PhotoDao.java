package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.annotation.PostConstruct;

import org.nhnnext.domains.Photo;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

public class PhotoDao extends JdbcDaoSupport{
	
	@PostConstruct
	public void initialize(){
		ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
		populator.addScript(new ClassPathResource("photomosaic.sql"));
		DatabasePopulatorUtils.execute(populator, getDataSource());
		logger.debug("database initialize success!");
	}

	public Photo findByName(String originalFileName) {
		String sql = "select * from PHOTOS where original_name= ?";
		RowMapper<Photo> rowMapper = new RowMapper<Photo>() {
			
			public Photo mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Photo(
						rs.getInt("id"),
						rs.getString("unique_id"),
						rs.getString("original_name"));
			}
		};
		return getJdbcTemplate().queryForObject(sql, rowMapper, originalFileName);
	}

	public void upload(Photo photo) {
		String sql="INSERT INTO PHOTOS (unique_id, original_name) VALUES (?, ?)";
		getJdbcTemplate().update(sql, photo.getUniqueId(), photo.getOriginalFileName());
	}
	
	public void deleteById(Photo photo) {
		String sql="delete from PHOTOS where id = ? ";
		getJdbcTemplate().update(sql, photo.getId());
	}
	
	public void deleteAll(Photo photo) {
		String sql="delete from PHOTOS";
		getJdbcTemplate().update(sql);
	}
	
	public Photo findByUniqueId(String uniqueId) {
		String sql = "select * from PHOTOS where unique_id = ?";
		RowMapper<Photo> rowMapper = new RowMapper<Photo>() {
			
			public Photo mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Photo(
						rs.getInt("id"),
						rs.getString("unique_id"),
						rs.getString("original_name"));
			}
		};
		return getJdbcTemplate().queryForObject(sql, rowMapper, uniqueId);
	}
}
