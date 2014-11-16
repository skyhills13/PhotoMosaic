package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.nhnnext.domains.Album;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class AlbumDao extends JdbcDaoSupport{

	public Album findByUserId(int userId) {
		String sql = "SELECT * FROM albums where users_id = ?";
		RowMapper<Album> rowMapper = new RowMapper<Album>(){
			public Album mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new Album(rs.getInt("id"),
						rs.getString("name"),
						rs.getInt("users_id"));
			}
		};
		return getJdbcTemplate().queryForObject(sql, rowMapper, userId);
	}
}
