package org.nhnnext.template;

import static org.junit.Assert.*;

import org.junit.Test;

import ppomo.support.Orientation;
import ppomo.template.Template;

public class TemplateTest {

	@Test
	public void getTemplate() {
		int photoNum = 6;
		Template template = Template.getRandomTemplate(photoNum, Orientation.LANDSCAPE);
		int templateNumber = 0;
		for (int number : template.getTemplateFrameList()) {
			templateNumber += number;
		}
		
		assertEquals(photoNum, templateNumber);
	}

}
