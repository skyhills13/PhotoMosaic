package ppomo.support;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import ppomo.algorithm.instance.MergeInstance;

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
	}
}