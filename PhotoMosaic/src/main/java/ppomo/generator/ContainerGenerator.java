package ppomo.generator;

import ppomo.container.PhotoContainer;
import ppomo.container.PhotoGroupContainer;
import ppomo.template.TemplateFrameList;

public class ContainerGenerator {
	
	TemplateFrameList templateFrameList;
	
	public ContainerGenerator(TemplateFrameList templateFrameList) {
		this.templateFrameList = templateFrameList;
	}

	public PhotoGroupContainer getContainer() {
		
		PhotoGroupContainer groupContainer = new PhotoGroupContainer(templateFrameList.size());
		
		for (int index = 0; index < templateFrameList.size(); index++) {
			PhotoContainer photoContainer = new PhotoContainer(templateFrameList.get(index));
			groupContainer.add(photoContainer);
			
		}
		
		return groupContainer;
	}

}
