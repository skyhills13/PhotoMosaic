package org.nhnnext.generator;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.nhnnext.dto.PhotoContainer;
import org.nhnnext.dto.PhotoGroupContainer;
import org.nhnnext.dto.Template;
import org.nhnnext.dto.TemplateFrameList;
import org.nhnnext.support.Orientation;


public class ContainerGeneratorTest {

	@Test
	public void getContainer() {
		
		Orientation mosaicOrientation = Orientation.LANDSCAPE;
		
		Template template = Template.getRandomTemplate(mosaicOrientation);
		TemplateFrameList list = template.getTemplateFrameList();
		System.out.println("list : "+list);
		ContainerGenerator cg = new ContainerGenerator(list);
		PhotoGroupContainer groupContainer = cg.getContainer();
		
		assertThat(groupContainer.size(), is(3));
		
		System.out.println(groupContainer.toString());
		for (PhotoContainer photoContainer : groupContainer) {
			System.out.print(photoContainer.getMax()+", ");
		}
	}
}
