package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.nhnnext.domains.Album;
import org.nhnnext.domains.Photo;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class AlbumDao extends JdbcDaoSupport{

	public List<Album> findByUserId(int userId) {
		String sql = "SELECT * FROM albums where users_id = ?";
		RowMapper<Album> rowMapper = new RowMapper<Album>(){
			public Album mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Album(rs.getInt("id"),
						rs.getString("name"),
						rs.getInt("users_id"));
			}
		};
		return getJdbcTemplate().query(sql, rowMapper, userId);
	}
	
	public List<Photo> findPhotosOfMosaic(int mosaicId) {
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
		return getJdbcTemplate().query(sql, rowMapper, mosaicId);
	}
}
