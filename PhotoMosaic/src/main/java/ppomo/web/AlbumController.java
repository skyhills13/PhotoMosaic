package ppomo.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import ppomo.domain.table.Mosaic;
import ppomo.service.AlbumService;

@Controller
public class AlbumController {
	private static final Logger logger = LoggerFactory.getLogger(AlbumController.class);
	
	@Autowired
	private AlbumService albumService;
	
	@RequestMapping("/album/{userId}")
	public String showAlbum(@PathVariable int userId, Model model){
		logger.debug("into albumpage");
		
		List<Mosaic> mosaics = albumService.showAlbumOfSpecificUser(userId);
		
		model.addAttribute("mosaics", mosaics);
		return "album";
	}
}
