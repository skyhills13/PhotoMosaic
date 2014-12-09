package org.nhnnext.dto;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Orientation;


@SuppressWarnings("serial")
public class PhotoGroupContainer extends Container<PhotoContainer>{

	public PhotoGroupContainer(Integer max) {
		super(max);
	}


	@SuppressWarnings("unchecked")
	@Override
	public BufferedImage getCombinedMosaic(Mosaic mosaic, Orientation basePhotoOrientation) throws IOException {
		
		ArrayList<BufferedImage> combinedImages = new ArrayList<BufferedImage>(); 
		
		for (int index = 0; index < size() ; index++) {
			BufferedImage image = get(index).getCombinedMosaic(mosaic, basePhotoOrientation);
			combinedImages.add(image);
		}
		
		return null;
	}


	@Override
	protected ArrayList<BufferedImage> resizeEach(Mosaic mosaic,
			Orientation basePhotoOrientation) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	protected Photo getSmallestSizedPhoto(Orientation basePhotoOrientation) {
		// TODO Auto-generated method stub
		return null;
	}

}