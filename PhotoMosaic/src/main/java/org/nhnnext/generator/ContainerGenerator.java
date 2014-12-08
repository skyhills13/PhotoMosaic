package org.nhnnext.generator;

import org.nhnnext.dto.PhotoContainer;
import org.nhnnext.dto.PhotoGroupContainer;
import org.nhnnext.dto.TemplateFrameList;

public class ContainerGenerator {
	
	TemplateFrameList templateFrameList;
	
	public ContainerGenerator(TemplateFrameList templateFrameList) {
		this.templateFrameList = templateFrameList;
	}

	public PhotoGroupContainer getContainer() {
		
		//TODO Apply Extends, Extract Abstract functions
		PhotoGroupContainer groupContainer = new PhotoGroupContainer();
		
		for (int index = 0; index < templateFrameList.size(); index++) {
			PhotoContainer photoContainer = new PhotoContainer(templateFrameList.get(index));
			groupContainer.add(photoContainer);
		}
		
		return groupContainer;
	}

}
