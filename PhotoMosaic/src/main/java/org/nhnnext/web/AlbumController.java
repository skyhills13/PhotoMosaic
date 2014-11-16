package org.nhnnext.web;

import org.nhnnext.dao.AlbumDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AlbumController {
	private static final Logger logger = LoggerFactory.getLogger(AlbumController.class);
	
	@Autowired
	private AlbumDao albumDao;
	
	@RequestMapping("/{userEmail}")
	public String albumPage(@PathVariable String userEmail, Model model){
		logger.debug("into albumpage");
		return "album";
	}
	
	public void getAlbums(int userId){
		albumDao.findByUserId(userId);
	}
	
}
