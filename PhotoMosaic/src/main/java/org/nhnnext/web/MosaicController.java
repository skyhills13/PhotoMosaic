package org.nhnnext.web;

import java.util.List;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.PhotoDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
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
		
		List<Photo> photos = photoDao.findPhotosOfMosaic(theMosaic.getId());
		Photo[] mosaicPhotos = new Photo[photos.size()];
		for(int i = 0; i < photos.size(); ++i){
			mosaicPhotos[i] = photos.get(i);
		}
		theMosaic.setPhotos(mosaicPhotos);
		
		model.addAttribute("mosaic", theMosaic);
		return "result";
	}
}
