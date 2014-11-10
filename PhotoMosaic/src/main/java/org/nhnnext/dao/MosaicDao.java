package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.nhnnext.domains.Mosaic;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class MosaicDao extends JdbcDaoSupport {
	public Mosaic findById(int id) {
		String sql = "select * from MOSAICS where id= ?";
		RowMapper<Mosaic> rowMapper = new RowMapper<Mosaic>() {

			public Mosaic mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Mosaic(
						rs.getInt("id"), 
						rs.getString("title"),
						rs.getString("contents"),
						rs.getString("url"));
			}
		};
		return getJdbcTemplate().queryForObject(sql, rowMapper, id);
	}
	
	public Mosaic findByUrl(String url) {
		String sql = "select * from MOSAICS where url= ?";
		RowMapper<Mosaic> rowMapper = new RowMapper<Mosaic>() {

			public Mosaic mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Mosaic(
						rs.getInt("id"), 
						rs.getString("title"),
						rs.getString("contents"),
						rs.getString("url"));
			}
		};
		return getJdbcTemplate().queryForObject(sql, rowMapper, url);
	}

	public void upload(Mosaic mosaic) {
		String sql = "INSERT INTO MOSAICS (title, contents, url) VALUES (?, ?, ?)";
		getJdbcTemplate().update(sql, mosaic.getTitle(), mosaic.getContents(), mosaic.getUrl());
	}
}