package org.nhnnext.support;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.dto.MergeInstance;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class MosaicHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(MosaicHandler.class);
	
	public static BufferedImage getMergedPhoto(ArrayList<MergeInstance> mergeInstanceList, Orientation basePhotoOrientation) throws IOException {
		
		int type = mergeInstanceList.get(0).getBufferedImage().getType();
		
		int baseDirectionLength = 0;
		int notBaseDirectionLength = 0;
		int canvasWidth = 0;
		int canvasHeight = 0;
		
		if (basePhotoOrientation == Orientation.LANDSCAPE) {
			
			for (MergeInstance mergeInstance : mergeInstanceList) {
				notBaseDirectionLength += mergeInstance.getBufferedImage().getHeight();
			}
			
			baseDirectionLength = mergeInstanceList.get(0).getBufferedImage().getWidth();
			canvasWidth = baseDirectionLength;
			canvasHeight = notBaseDirectionLength;
			
		} else if (basePhotoOrientation == Orientation.PORTRAIT) {
			
			for (MergeInstance mergeInstance : mergeInstanceList) {
				notBaseDirectionLength += mergeInstance.getBufferedImage().getWidth();
			}
			
			baseDirectionLength = mergeInstanceList.get(0).getBufferedImage().getHeight();
			canvasWidth = notBaseDirectionLength;
			canvasHeight = baseDirectionLength;
		}
		
		BufferedImage groupImg = new BufferedImage(
			canvasWidth,
			canvasHeight,
			type
		);
		
		for (int i = 0; i < mergeInstanceList.size(); i++) {
				groupImg.createGraphics().drawImage(mergeInstanceList.get(i).getBufferedImage(), mergeInstanceList.get(i).getX(), mergeInstanceList.get(i).getY(), null);
		}
		logger.debug("concatenated photo group");
		return groupImg;
		//String mergedPhotoName = Constants.ATTACHMENT_ROOT_DIR+ File.separator + mosaic.getFileName();
		//File mergedImg = new File(mergedPhotoName);
		//ImageIO.write(finalImg, "png", mergedImg);
	}
	
	public static Orientation judgeMosaicOrientation(Mosaic mosaic){
		int landscapeCount = 0;
		Orientation mosaicOrientation = null;
		for( Photo photo : mosaic.getPhotos()) {
			if(photo.getOrientation() == Orientation.LANDSCAPE){
				landscapeCount++;
			}else if(photo.getOrientation() == Orientation.PORTRAIT) {
				landscapeCount--;
			}
		}
		mosaicOrientation = (landscapeCount > 0) ? Orientation.LANDSCAPE : (landscapeCount < 0 ) ? Orientation.PORTRAIT: Orientation.SQUARE;
		return mosaicOrientation;
	}
	
	// 2,3,3 / 3,2,3 / 3,3,2 / 2,2,4 / 2,4,2 / 4,2,2 / 1,3,4/ 1,4,3 / 3,1,4 /3,4,1 /4,1,3/4,3,1
	// [,,0,,,,0,,,][,,,0,,,0,,,][,,,0,,,,0,,][,,0,,,0,,,,][,,0,,,,,0,,][,0,,,,0,,,,][,0,,,,,0,,,][,,,,0,,,,0,][,,,0,,,,,0,][,,,,0,,0,,,][,,,,0,,,,0,] 
	// 1,2,3,2 / 1,3,3,1 / 3,3,2 /
}