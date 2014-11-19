package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

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
	
	public List<Mosaic> findMosaicsOfUser(int userId) {
		String sql = "select * from mosaics where users_id = ? ";
		RowMapper<Mosaic> rowMapper = new RowMapper<Mosaic>() {
			public Mosaic mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Mosaic(rs.getInt("id"),
							rs.getString("fileName"),
							rs.getString("title"),
							rs.getString("url"),
							rs.getString("comment"),
							rs.getTimestamp("created_date"),
							rs.getInt("users_id"));
			}
		};
		return getJdbcTemplate().query(sql, rowMapper, userId);
	}
	
	// TODO 1. users_id가 다 null 이여서 위에 함수 동작 안함. users_id를 저장할 방법을 select.jsp 및 PhotoController 에서 만들 것.
	// TODO 2. DB에는 fileName이 아닌 file_name로 되어 있음. 그래서 위의 함수는 동작 안함. 변경 바람.
	// 그리하여 테스트에 쓸 메소드 새로 만듬(만들어진 모든 모자이크를 반환해버림)
	public List<Mosaic> findAllMosaics() {
		String sql = "select * from mosaics";
		RowMapper<Mosaic> rowMapper = new RowMapper<Mosaic>() {
			public Mosaic mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Mosaic(rs.getInt("id"),
						rs.getString("file_name"),
						rs.getString("title"),
						rs.getString("url"),
						rs.getString("comment"),
						rs.getTimestamp("created_date"));
			}
		};
		return getJdbcTemplate().query(sql, rowMapper);
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
