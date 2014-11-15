package org.nhnnext.web;

import org.nhnnext.dao.UserDao;
import org.nhnnext.domains.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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
	
	@RequestMapping(value="/join", method=RequestMethod.POST)
	public String createUser(@RequestParam("email") String email, @RequestParam("password") String password) {
		User newUser = new User(email, password);
		userDao.create(newUser);
		logger.debug("DatabaseUser:{}", userDao.findByEmail(newUser.getEmail()));
		return "redirect:/";
	}
	
	@RequestMapping(value="/login")
	public String login(Model model){
		model.addAttribute("user", new User());
		return "login";
	}
}
