package org.nhnnext.service;

import java.util.List;

import org.nhnnext.domain.support.DataURL;
import org.springframework.stereotype.Service;

@Service
public class PhotoService {
	
	public void savePhotos(List<DataURL> dataURLList, String photoBasePath) {
		for (DataURL dataURL : dataURLList) {
			dataURL.saveFile(photoBasePath);
		}
	}
}