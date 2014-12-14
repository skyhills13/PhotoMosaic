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
		
		Mosaic theMosaic = getSpecificMosaic(uniqueUrl);
		Photo[] mosaicPhotos = getPhotosOfAMosaic(theMosaic);
		setPhotosOnMosaic(theMosaic, mosaicPhotos);
		
		model.addAttribute("mosaic", theMosaic);
		return "result";
	}
	
	public Mosaic getSpecificMosaic(String uniqueUrl){
		Mosaic theMosaic = mosaicDao.findByUrl(uniqueUrl);
		return theMosaic;
	}
	
	public Photo[] getPhotosOfAMosaic(Mosaic mosaic){
		List<Photo> photos = photoDao.findPhotosOfMosaic(mosaic.getId());
		Photo[] mosaicPhotos = new Photo[photos.size()];
		for(int i = 0; i < photos.size(); ++i){
			mosaicPhotos[i] = photos.get(i);
		}
		return mosaicPhotos;
	}

	public void setPhotosOnMosaic(Mosaic mosaic, Photo[] photos){
		mosaic.setPhotos(photos);
	}
}
