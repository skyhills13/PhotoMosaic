package org.nhnnext.dto;

import java.awt.Dimension;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.imageio.ImageIO;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Constants;
import org.nhnnext.support.MosaicHandler;
import org.nhnnext.support.Orientation;
import org.nhnnext.support.PhotoHandler;

@SuppressWarnings("serial")
public class PhotoContainer extends Container<Photo> {
	public PhotoContainer(Integer max) {
		super(max);
	}

	@SuppressWarnings("unchecked")
	@Override
	public BufferedImage getCombinedMosaic(Mosaic mosaic, Orientation basePhotoOrientation) throws IOException {
		
		ArrayList<BufferedImage> resizedImageList = getResizedImageList(mosaic, basePhotoOrientation);
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

	private ArrayList<BufferedImage> getResizedImageList(Mosaic mosaic, Orientation basePhotoOrientation) throws IOException {
		Photo smallestSizedPhoto = getSmallestSizedPhoto(basePhotoOrientation);
		
		int scaleCriteriaSize = (basePhotoOrientation == Orientation.LANDSCAPE ) ? smallestSizedPhoto.getOriginalWidth() : smallestSizedPhoto.getOriginalHeight();
		String directoryPath = Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId();
		
		ArrayList<BufferedImage> resizedImages = new ArrayList<BufferedImage>(); 
		
		Photo photo = null;
		Dimension resizedDimension = null;
		BufferedImage resizedImage = null;
		for (int i = 0; i < size(); i++) {
			photo = get(i);
			resizedDimension = PhotoHandler.getScaledDimension(
					new Dimension(photo.getOriginalWidth(), photo.getOriginalHeight()), 
					scaleCriteriaSize, 
					basePhotoOrientation
			);
			File file = new File(directoryPath + File.separator + photo.getUniqueId());
			BufferedImage originalImage = ImageIO.read(file);
			
			resizedImage = PhotoHandler.getResizedPhoto(originalImage, basePhotoOrientation, resizedDimension);
			resizedImages.add(resizedImage);
		}
		
		return resizedImages;
	}

	private Photo getSmallestSizedPhoto(Orientation basePhotoOrientation) {
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