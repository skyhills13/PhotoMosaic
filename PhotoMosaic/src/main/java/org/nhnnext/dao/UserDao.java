package org.nhnnext.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.nhnnext.domains.User;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

public class UserDao extends JdbcDaoSupport{
	
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
		return getJdbcTemplate().queryForObject(sql, rowMapper, id);
	}

	public void create(User user) {
		String sql = "INSERT INTO users (id, email, password) VALUES (?, ?)";
		getJdbcTemplate().update(sql, user.getId(), user.getEmail(), user.getPassword());
	}

}
