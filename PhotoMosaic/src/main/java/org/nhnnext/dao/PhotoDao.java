package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

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
		String sql = "select * from photos where original_name= ?";
		RowMapper<Photo> rowMapper = new RowMapper<Photo>() {
			
			public Photo mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Photo(
						rs.getInt("id"),
						rs.getString("unique_id"),
						rs.getString("original_name"),
						rs.getInt("mosaics_id"));
			}
		};
		return getJdbcTemplate().queryForObject(sql, rowMapper, originalFileName);
	}

	public void upload(Photo photo) {
		String sql="INSERT INTO photos (unique_id, original_name, original_width, original_height, scaled_width, scaled_height, mosaics_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
		getJdbcTemplate().update(sql, photo.getUniqueId(), photo.getOriginalFileName(), photo.getOriginalWidth(), photo.getOriginalHeight(), photo.getScaledWidth(), photo.getScaledHeight(), photo.getMosaicId());
	}
	
	public void deleteById(Photo photo) {
		String sql="delete from photos where id = ? ";
		getJdbcTemplate().update(sql, photo.getId());
	}
	
	public void deleteAll(Photo photo) {
		String sql="delete from photos";
		getJdbcTemplate().update(sql);
	}
	
	public Photo findByUniqueId(String uniqueId) {
		String sql = "select * from photos where unique_id = ?";
		RowMapper<Photo> rowMapper = new RowMapper<Photo>() {
			
			public Photo mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Photo(
						rs.getInt("id"),
						rs.getString("unique_id"),
						rs.getString("original_name"),
						rs.getInt("mosaics_id"));
			}
		};
		return getJdbcTemplate().queryForObject(sql, rowMapper, uniqueId);
	}
	
	public Photo[] findPhotosOfMosaic(int mosaicId) {
		String sql = "select * from photos where mosaics_id= ? ";
		RowMapper<Photo> rowMapper = new RowMapper<Photo>() {
			public Photo mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Photo(rs.getInt("id"), 
							rs.getString("unique_id"),
							rs.getString("original_name"),
							rs.getInt("original_width"),
							rs.getInt("original_height"),
							rs.getInt("scaled_width"),
							rs.getInt("scaled_height"),
							rs.getInt("mosaics_id"));
			}
		};
		List<Photo> photos = getJdbcTemplate().query(sql, rowMapper, mosaicId);
		Photo[] mosaicPhotos = new Photo[photos.size()];
		for(int i = 0; i < photos.size(); ++i){
			mosaicPhotos[i] = photos.get(i);
		}
		return mosaicPhotos;
	}
	
	public int getNumOfPhotos(int mosaicId) {
		String sql = "select COUNT(*) from photos where mosaics_id = ?";
		int numOfPhotos = getJdbcTemplate().queryForObject(sql, new Object[]{mosaicId}, Integer.class);
		return numOfPhotos;
	}
}
