package org.nhnnext.generator;

import org.junit.Test;
import org.nhnnext.dto.PhotoGroupContainer;
import org.nhnnext.dto.Template;
import org.nhnnext.dto.TemplateFrameList;
import org.nhnnext.support.Orientation;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;


public class ContainerGeneratorTest {

	@Test
	public void getContainer() {
		
		Orientation mosaicOrientation = Orientation.LANDSCAPE;
		
		Template template = Template.getRandomTemplate(mosaicOrientation);
		TemplateFrameList list = template.getTemplateFrameList(mosaicOrientation);
		
		ContainerGenerator cg = new ContainerGenerator(list);
		PhotoGroupContainer groupContainer = cg.getContainer();
		assertThat(groupContainer.size(), is(4));
		
		System.out.println(groupContainer.toString());
	}
}
