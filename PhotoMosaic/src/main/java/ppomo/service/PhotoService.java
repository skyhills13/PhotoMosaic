package ppomo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import ppomo.domain.support.DataURL;

@Service
public class PhotoService {
	
	public void savePhotos(List<DataURL> dataURLList, String photoBasePath) {
		for (DataURL dataURL : dataURLList) {
			dataURL.saveFile(photoBasePath);
		}
	}
}