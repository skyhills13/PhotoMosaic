package org.nhnnext.generator;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.nhnnext.container.PhotoContainer;
import org.nhnnext.container.PhotoGroupContainer;
import org.nhnnext.support.Orientation;
import org.nhnnext.template.Template;
import org.nhnnext.template.TemplateFrameList;


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
