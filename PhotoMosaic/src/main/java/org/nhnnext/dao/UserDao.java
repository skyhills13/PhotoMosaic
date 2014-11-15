package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.nhnnext.domains.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class UserDao extends JdbcDaoSupport{
	
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

	public void create(User user) {
		String sql = "INSERT INTO users (email, password) VALUES (?, ?)";
		getJdbcTemplate().update(sql, user.getEmail(), user.getPassword());
	}

}
