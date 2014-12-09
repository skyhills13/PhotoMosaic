package org.nhnnext.service;

import javax.servlet.http.HttpSession;

import org.nhnnext.dao.UserDao;
import org.nhnnext.domains.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	UserDao userDao;
	
	@Autowired
	HttpSession session;
	
	public User getCurrentUser() {
		String userEmail = null;
		User currentUser = null;
		if (session.getAttribute("email") != null) {
			userEmail = session.getAttribute("email").toString();
			currentUser = userDao.findByEmail(userEmail);
		}
		return currentUser;
	}
}

