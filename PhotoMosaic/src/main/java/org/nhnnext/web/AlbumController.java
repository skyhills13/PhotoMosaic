package org.nhnnext.web;

import org.nhnnext.dao.AlbumDao;
import org.nhnnext.dao.UserDao;
import org.nhnnext.domains.Album;
import org.nhnnext.domains.User;
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
	
	@Autowired
	private UserDao userDao;
	
	@RequestMapping("/{userEmail}")
	public String albumPage(@PathVariable String userEmail, Model model){
		logger.debug("into albumpage");
		User user = userDao.findByEmail(userEmail);
		Album album = albumDao.findByUserId(user.getId());
		model.addAttribute("album", album);
		return "album";
	}
	
	public void getAlbums(int userId){
	}
	
}
