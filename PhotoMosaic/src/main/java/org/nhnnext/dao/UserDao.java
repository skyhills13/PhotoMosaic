package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.nhnnext.domains.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class UserDao extends JdbcDaoSupport{
	private static final Logger logger = LoggerFactory
			.getLogger(UserDao.class);
	
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
			logger.debug("no user matches the email ");
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
