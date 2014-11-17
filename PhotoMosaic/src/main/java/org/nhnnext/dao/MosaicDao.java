package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.nhnnext.domains.Mosaic;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

/* 
* SQL 문을 소스코드에서 나중에는 분리할 계획이 있는지? 혹시 계획이 아예없다면 나중에 분리하는 게 좋겠지?
* 다른 클래스도 마찬가지고..
*/
public class MosaicDao extends JdbcDaoSupport {
	public Mosaic findById(int id) {
		String sql = "select * from mosaics where id= ?";
		RowMapper<Mosaic> rowMapper = new RowMapper<Mosaic>() {

			public Mosaic mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Mosaic(
						rs.getInt("id"), 
						rs.getString("title"),
						rs.getString("comment"),
						rs.getString("url"));
			}
		};
		return getJdbcTemplate().queryForObject(sql, rowMapper, id);
	}
	
	public Mosaic findByUrl(String url) {
		String sql = "select * from mosaics where url= ?";
		RowMapper<Mosaic> rowMapper = new RowMapper<Mosaic>() {

			public Mosaic mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Mosaic(
						rs.getInt("id"),
						rs.getString("file_name"),
						rs.getString("title"),
						rs.getString("comment"),
						rs.getString("url"),
						rs.getTimestamp("created_date"));
			}
		};
		return getJdbcTemplate().queryForObject(sql, rowMapper, url);
	}
	
	public void upload(Mosaic mosaic) {
		String sql = "INSERT INTO mosaics (file_name, title, comment, url) VALUES (?, ?, ?, ?)";
		getJdbcTemplate().update(sql, mosaic.getFileName(), mosaic.getTitle(), mosaic.getComment(), mosaic.getUrl());
	}
	
	public void updateCreatedTime(Mosaic mosaic) {
		String sql ="UPDATE mosaics SET created_date = NOW() where id = ?";
		getJdbcTemplate().update(sql, mosaic.getId());
		//TODO if I can get NOW() here, it doesn't need getCreateTime method
	}
	
	public Timestamp getCreatedTime(int mosaicId) {
		String sql = "SELECT created_date from mosaics where id = ?";
		return getJdbcTemplate().queryForObject(sql, new Object[]{mosaicId}, Timestamp.class);
	}
}
