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
	//session은 web과 종속된 것이기 때문에, service layer에 있으면 안돼.
	//서비스를 재사용을 하기 위해서도 분리해야해.  
	//컨트롤러마다에서도 계속 session을 부르는데, 중복이네요 ㅠ -> 서블릿의 필터 ~ 스프링의 interceptor 
	@Autowired
	HttpSession session;
	//session을 DI해도 되는 가->멀티 스레드 상황에서 싱글 인스턴스이기떄문에 안돼. session은 사용자마다 다르니까. 
	//비용의 희생이 있기는 하지만, scope을 바꾸면 사용할 수 있다. 
	//spring mvc에서 session은 어떻게 하면 효율적으로 사용할 수 있을까? 
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

