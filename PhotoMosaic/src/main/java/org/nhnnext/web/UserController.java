package org.nhnnext.web;

import org.nhnnext.domains.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class UserController {
	private static final Logger logger = LoggerFactory
			.getLogger(UserController.class);
	
	@RequestMapping("/form")
	public String userPage(Model model){
		logger.debug("in to userPage");
		model.addAttribute("user", new User());
		return "form";
	}
	
	@RequestMapping(value="/users", method=RequestMethod.POST)
	public String createUser() {
		
		return "redirect:/";
	}
}
