package org.nhnnext.generator;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

import javax.imageio.ImageIO;

import org.nhnnext.container.PhotoContainer;
import org.nhnnext.container.PhotoGroupContainer;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Constants;
import org.nhnnext.support.Orientation;
import org.nhnnext.template.Template;
import org.nhnnext.template.TemplateFrameList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MosaicImageGenerator {

	private static final Logger logger = LoggerFactory.getLogger(MosaicImageGenerator.class);
	
	private PhotoGroupContainer groupContainer; 
	private Orientation basePhotoOrientation;
	private TemplateFrameList templateFrameList;
	private Mosaic mosaic;
	
	public MosaicImageGenerator(Mosaic mosaic) {
		
		init(mosaic);
		setupContainer();
		placePhotosToContainer(mosaic.getPhotos());
	}

	protected void init(Mosaic mosaic) {
		this.mosaic = mosaic;
		Orientation mosaicOrientation = mosaic.getOrientation();
		Template template = Template.getRandomTemplate(mosaicOrientation);
		this.templateFrameList = template.getTemplateFrameList();
		//Get CriteriaOrientation, 
		this.basePhotoOrientation = Orientation.getBasePhotoOrientation(mosaicOrientation);
	}

	private void setupContainer() {
		ContainerGenerator containerGenerator = new ContainerGenerator(templateFrameList);
		this.groupContainer = containerGenerator.getContainer();
		logger.info("Create Group Container : {}",groupContainer.toString());
		
		Iterator<PhotoContainer> ir =  groupContainer.iterator();
		while(ir.hasNext()){
			PhotoContainer photoContainer = ir.next();//현재야 현재. 
			logger.info("PhotoContainer : {}, Size : {}, Max : {}",photoContainer.toString(), photoContainer.size(), photoContainer.getMax());
		}
	}
	
	private void placePhotosToContainer(Photo[] originPhotos) {
		
		ArrayList<Photo> originPhotoList = new ArrayList<Photo>(Arrays.asList(originPhotos));
		PhotoContainer criteriaPhotoList = new PhotoContainer(this.templateFrameList.size());
		
		//Seperate PhotoList (criteria and others)
		for (Photo photo : originPhotos) {
			if (photo.getOrientation() == basePhotoOrientation) {
				criteriaPhotoList.add(photo);
				originPhotoList.remove(photo);
			}
		}
		
		logger.info("originPhotoList.size() : {}",originPhotoList.size());
		logger.info("criteriaPhotoList.size() : {}",criteriaPhotoList.size());
		
		//Placement
		for (int index = 0; index < this.groupContainer.getMax(); index++) {
			PhotoContainer photoContainer = this.groupContainer.get(index);
			
			if (!criteriaPhotoList.isEmpty()) {
				photoContainer.add(criteriaPhotoList.remove(0));
				logger.info("index : {}. photoContainer.isFull() : {}", index, photoContainer.isFull());				
			}
			
			while(!photoContainer.isFull()) {
				photoContainer.add(originPhotoList.remove(0));
				logger.info("index : {}. photoContainer.isFull() : {}", index, photoContainer.isFull());
			}
		}
		
		//TODO
		//Something Wrong
		//if (originPhotoList.size() !=0 || criteriaPhotoList.size() != 0)
		//		throw new Exception();	
	}

	public void makeMosaicImage() throws IOException {
		BufferedImage mosaicImage = groupContainer.getCombinedMosaic(mosaic, basePhotoOrientation);
		File file = new File(Constants.ATTACHMENT_ROOT_DIR + File.separator + mosaic.getId() + File.separator + mosaic.getFileName());
		ImageIO.write(mosaicImage, Constants.MOSAIC_FILE_EXTENSION, file);
	}
}
