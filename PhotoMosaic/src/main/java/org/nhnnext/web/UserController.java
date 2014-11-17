package org.nhnnext.web;

import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.nhnnext.dao.UserDao;
import org.nhnnext.domains.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	UserDao userDao;
	
	@RequestMapping("/form")
	public String userPage(Model model){
		model.addAttribute("user", new User());
		logger.debug("in to userFormPage");
		return "form";
	}
	
	@RequestMapping("/loginform")
	public String loginPage(Model model){
		model.addAttribute("user", new User());
		logger.debug("in to loginFormPage");
		return "loginform";
	}
	
	@RequestMapping(value="/join", method=RequestMethod.POST)
	public String createUser(@Valid User user, BindingResult bindingResult) {
		if ( bindingResult.hasErrors()) {
			logger.debug("binding Result has error!");
			List<ObjectError> errors = bindingResult.getAllErrors();
			for (ObjectError error : errors) {
				logger.debug("error : {}, {}", error.getObjectName(), error.getDefaultMessage());
			}
			return "form";
		}
		userDao.create(user);
		logger.debug("DatabaseUser:{}", userDao.findByEmail(user.getEmail()));
		return "redirect:/form";
	}
	
	@RequestMapping(value="/login")
	public String login(@Valid User user, BindingResult bindingResult, HttpSession session, Model model){

		if(bindingResult.hasErrors()){
			return "loginform";
		}
					
		User dbUser = userDao.findByEmail(user.getEmail());
		if( dbUser == null) {
			//이런 메세지들은 모두 설정파일 어딘가로 분리하는게 좋겠다.
			model.addAttribute("errorMessage", "존재하지 않는 사용자입니다.");
			return "loginform";
		}
		
		if( !user.matchPassword(dbUser.getPassword())) {
			model.addAttribute("errorMessage", "비밀번호가 틀립니다.");
			return "loginform";
		}
		session.setAttribute("email", user.getEmail());
		return "redirect:/";
	}
	@RequestMapping(value="/logout")
	public String logout(HttpSession session){
		session.removeAttribute("email");
		return "redirect:/";
	}
}
