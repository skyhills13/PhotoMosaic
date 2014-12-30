package org.nhnnext.service;

import javax.servlet.http.HttpSession;

import org.nhnnext.dao.UserDao;
import org.nhnnext.domain.table.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	UserDao userDao;
	//컨트롤러마다에서도 계속 session을 부르는데, 중복이네요 ㅠ -> 서블릿의 필터 ~ 스프링의 interceptor 
	//spring mvc에서 session은 어떻게 하면 효율적으로 사용할 수 있을까? 
	public User getCurrentUser(HttpSession session) {
		String userEmail = null;
		User currentUser = null;
		if (session.getAttribute("email") != null) {
			userEmail = session.getAttribute("email").toString();
			currentUser = userDao.findByEmail(userEmail);
		}
		return currentUser;
	}
}

