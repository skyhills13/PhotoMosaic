package org.nhnnext.dto;

import java.io.File;

import org.nhnnext.support.Orientation;


@SuppressWarnings("serial")
public class PhotoGroupContainer extends Container<PhotoContainer>{

	public PhotoGroupContainer(Integer max) {
		super(max);
	}

	public File getCombinedMosaic(Orientation basePhotoOrientation) {
		
		for (int index = 0; index < size() ; index++) {
			File file = get(index).getCombinedMosaic(basePhotoOrientation);
		}
		
		return null;
	}

}