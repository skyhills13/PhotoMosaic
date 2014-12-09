package org.nhnnext.dto;

import java.awt.Dimension;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Constants;
import org.nhnnext.support.MosaicHandler;
import org.nhnnext.support.Orientation;
import org.nhnnext.support.PhotoHandler;


@SuppressWarnings("serial")
public class PhotoGroupContainer extends Container<PhotoContainer>{

	public PhotoGroupContainer(Integer max) {
		super(max);
	}


	@SuppressWarnings("unchecked")
	@Override
	public BufferedImage getCombinedMosaic(Mosaic mosaic, Orientation basePhotoOrientation) throws IOException {
		
		ArrayList<BufferedImage> combinedImages = new ArrayList<BufferedImage>(); 
		for (int index = 0; index < getMax() ; index++) {
			BufferedImage image = get(index).getCombinedMosaic(mosaic, basePhotoOrientation);
			combinedImages.add(image);
		}
		
		basePhotoOrientation = (basePhotoOrientation == Orientation.LANDSCAPE) ? Orientation.PORTRAIT : Orientation.LANDSCAPE;
		
		ArrayList<BufferedImage> resizedImageList = getResizedImageList(combinedImages, mosaic, basePhotoOrientation);
		
		return mergeImages(resizedImageList, basePhotoOrientation);
	}


	private BufferedImage mergeImages(ArrayList<BufferedImage> resizedImageList, Orientation basePhotoOrientation) throws IOException {
		ArrayList<MergeInstance> mergeInstanceList = new ArrayList<MergeInstance>();
		
		int x = 0;
		int y = 0;
		for (BufferedImage bufferedImage : resizedImageList) {
			mergeInstanceList.add(new MergeInstance(
					bufferedImage, 
					x,
					y
			));
			
			if(basePhotoOrientation == Orientation.LANDSCAPE) {
				y += bufferedImage.getHeight();
			} else if(basePhotoOrientation == Orientation.PORTRAIT){
				x += bufferedImage.getWidth();
			}
		}
		
		return MosaicHandler.getMergedPhoto(mergeInstanceList, basePhotoOrientation);		
	}


	private ArrayList<BufferedImage> getResizedImageList(ArrayList<BufferedImage> combinedImages, Mosaic mosaic, Orientation basePhotoOrientation) throws IOException {
		BufferedImage smallestSizedImage = getSmallestSizedGroup(combinedImages, basePhotoOrientation);
		
		
		int smallestImagesWidth = smallestSizedImage.getWidth();
		int smallestImagesHeight = smallestSizedImage.getHeight();
		
		int scaleCriteriaSize = (basePhotoOrientation == Orientation.LANDSCAPE ) ? smallestImagesWidth : smallestImagesHeight;
		
		ArrayList<BufferedImage> resizedImages = new ArrayList<BufferedImage>(); 
		
		Dimension resizedDimension = null;
		BufferedImage currentImage = null, resizedImage = null;
		for (int index = 0; index < combinedImages.size(); index++) {
			currentImage = combinedImages.get(index);
			resizedDimension = PhotoHandler.getScaledDimension(
					new Dimension(currentImage.getWidth(), currentImage.getHeight()), 
					scaleCriteriaSize, 
					basePhotoOrientation
			);
			
			resizedImage = PhotoHandler.getResizedPhoto(currentImage, basePhotoOrientation, resizedDimension);
			resizedImages.add(resizedImage);
		}
		
		return resizedImages;
	}

	private BufferedImage getSmallestSizedGroup(List<BufferedImage> combinedImages, Orientation basePhotoOrientation) {
		
		if (combinedImages.size() == 0)
			return null;
			//TODO throw new Exception();
		
		BufferedImage smallestImage = combinedImages.get(0);
		BufferedImage currentImage = null;
		
		if (basePhotoOrientation == Orientation.LANDSCAPE) {
			for (int index = 1; index < combinedImages.size(); index++) {
				currentImage = combinedImages.get(index);
				
				if (smallestImage.getHeight() > currentImage.getHeight())
					smallestImage = currentImage;
			}
			
		} else if (basePhotoOrientation == Orientation.PORTRAIT) {
			for (int index = 1; index < combinedImages.size(); index++) {
				currentImage = combinedImages.get(index);
				
				if (smallestImage.getWidth() > currentImage.getWidth())
					smallestImage = currentImage;
			}
			
		}
		
		return smallestImage;
	}

}