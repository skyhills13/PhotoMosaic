package org.nhnnext.dto;

import java.io.File;

import org.nhnnext.domains.Photo;
import org.nhnnext.support.Orientation;

@SuppressWarnings("serial")
public class PhotoContainer extends Container<Photo> {
	public PhotoContainer(Integer max) {
		super(max);
	}

	@Override
	File getCombinedMosaic(Orientation basePhotoOrientation) {
		
		Photo basePhoto = getBasePhoto(basePhotoOrientation);
		for (int i = 0; i < size(); i++) {
			//get(i)
		}
		
		
		return null;
	}

	private Photo getBasePhoto(Orientation basePhotoOrientation) {
		Photo basePhoto = get(0);
		
		if (basePhotoOrientation == Orientation.LANDSCAPE) {
			for (int index = 1; index < size(); index++) {
				Photo comparingPhoto = get(index);
				if (basePhoto.getOriginalWidth() > comparingPhoto.getOriginalWidth()) {
					basePhoto = comparingPhoto;
				}
			}
			
		} else if (basePhotoOrientation == Orientation.PORTRAIT) {
			for (int index = 1; index < size(); index++) {
				Photo comparingPhoto = get(index);
				if (basePhoto.getOriginalHeight() > comparingPhoto.getOriginalHeight()) {
					basePhoto = comparingPhoto;
				}
			}
			
		}
		
		return basePhoto;
	}
}