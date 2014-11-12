package org.nhnnext.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping("/")
	public String home(){
		logger.debug("at home, which is select page");
		return "select";
	}
	
	// UI Test를 위한 URL Mapping. file 이름만 바꾸면 된다.
	// TODO 배포 전에 반드시 제거할 것.
	@RequestMapping("/test/{testPage}")
	public String UITest(@PathVariable String testPage) {
		return "/test/" + testPage;
	}

}
