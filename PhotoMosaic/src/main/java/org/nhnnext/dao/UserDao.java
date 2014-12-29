package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.nhnnext.domains.table.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;

public class UserDao extends DaoTemplate{
	
	public User findByEmail(String email) {
		String sql = "SELECT * FROM users WHERE email = ?";
		RowMapper<User> rowMapper = new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User(
						rs.getInt("id"),
						rs.getString("email"),
						rs.getString("password")); 
			}
		};
		try {
			return getJdbcTemplate().queryForObject(sql, rowMapper, email);
		}catch(EmptyResultDataAccessException e){
			return null;
		}
	}
	
	public User findById(int id) {
		String sql = "SELECT * FROM users WHERE id = ?";
		RowMapper<User> rowMapper = new RowMapper<User>() {
			@Override
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				return new User(
						rs.getInt("id"),
						rs.getString("email"),
						rs.getString("password")); 
			}
		};
		try {
			return getJdbcTemplate().queryForObject(sql, rowMapper, id);
		}catch(EmptyResultDataAccessException e){
			logger.debug("no user matches the email ");
			return null;
		}
	}

	public void create(User user) {
		String sql = "INSERT INTO users (email, password) VALUES (?, ?)";
		getJdbcTemplate().update(sql, user.getEmail(), user.getPassword());
	}

}
