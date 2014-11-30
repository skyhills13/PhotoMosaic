package org.nhnnext.web;

import java.util.List;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.UserDao;
import org.nhnnext.domains.Mosaic;
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
	private UserDao userDao;
	
	@Autowired
	private MosaicDao mosaicDao;
	
	@RequestMapping("/album/{userId}")
	public String albumPage(@PathVariable int userId, Model model){
		logger.debug("into albumpage");
		User user = userDao.findById(userId);
		List<Mosaic> mosaics = mosaicDao.findMosaicsOfUser(user.getId());
		model.addAttribute("mosaics", mosaics);
		return "album";
	}
}
