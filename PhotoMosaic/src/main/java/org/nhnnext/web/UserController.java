package org.nhnnext.web;

import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.nhnnext.dao.UserDao;
import org.nhnnext.domain.table.User;
import org.nhnnext.support.Constants;
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
	public String createUser(@Valid User user, BindingResult bindingResult, Model model) {
		
		if(userDao.findByEmail(user.getEmail()) != null){
			model.addAttribute("errorMessage", Constants.ALREADY_EXISTING_MEMBER);
			return "form";
		};
		
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
			model.addAttribute("errorMessage", Constants.NOT_EXISTING_MEMBER);
			return "loginform";
		}
		
		if( !user.matchPassword(dbUser.getPassword())) {
			model.addAttribute("errorMessage", Constants.WRONG_PASSWORD);
			return "loginform";
		}
		
		String currentUserEmail = user.getEmail();
		session.setAttribute("email", currentUserEmail);
		int currentUserId = userDao.findByEmail(currentUserEmail).getId(); 
		user.setId(currentUserId);
		session.setAttribute("userId", user.getId());
		return "redirect:/";
	}
	
	@RequestMapping(value="/logout")
	public String logout(HttpSession session){
		session.removeAttribute("email");
		session.removeAttribute("userId");
		return "redirect:/";
	}
}
