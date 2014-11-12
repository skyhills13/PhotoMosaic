package org.nhnnext.web;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MosaicController {

	@Autowired
	MosaicDao mosaicDao;
	
	@Autowired
	PhotoDao photoDao;
	
	@RequestMapping("/result/{uniqueUrl}")
	public String showResult(@PathVariable String uniqueUrl, Model model){
		Mosaic theMosaic = mosaicDao.findByUrl(uniqueUrl);
		theMosaic.setPhotos(photoDao.findPhotosOfMosaic(theMosaic.getId()));
		model.addAttribute("mosaic", theMosaic);
		return "result";
	}
}
