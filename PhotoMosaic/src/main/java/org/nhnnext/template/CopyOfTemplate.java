package org.nhnnext.template;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

import org.nhnnext.support.Orientation;

@SuppressWarnings("serial")
public enum CopyOfTemplate {
	
	PORTRAIT_STRATEGY_1 (2, 3, 3),
	PORTRAIT_STRATEGY_2 (2, 2, 4),
	//PORTRAIT_STRATEGY_3 (1, 4, 3),
	
	HORIZONTAL_STRATEGY_1 (1, 2, 3, 2),
	HORIZONTAL_STRATEGY_2 (1, 3, 3, 1),
	HORIZONTAL_STRATEGY_3 (3, 3, 2, 0);
	
	private TemplateFrameList templateFrameList;
	
	private static final ArrayList<CopyOfTemplate> horizontalTemplate = new ArrayList<CopyOfTemplate>() {{
		add(HORIZONTAL_STRATEGY_1);
		add(HORIZONTAL_STRATEGY_2);
		add(HORIZONTAL_STRATEGY_3);
	}};
	
	private static final ArrayList<CopyOfTemplate> portraitTemplate = new ArrayList<CopyOfTemplate>() {{
		add(PORTRAIT_STRATEGY_1);
		add(PORTRAIT_STRATEGY_2);
		//add(PORTRAIT_STRATEGY_3);
	}};
	
	//TODO Make List,  not get-setter
	CopyOfTemplate(int col1, int col2, int col3) {
		templateFrameList = new TemplateFrameList();
		templateFrameList.add(col1);
		templateFrameList.add(col2);
		templateFrameList.add(col3);
	}
	
	//TODO Make List,  not get-setter
	CopyOfTemplate(int row1, int row2, int row3, int row4) {
		templateFrameList = new TemplateFrameList();
		templateFrameList.add(row1);
		templateFrameList.add(row2);
		templateFrameList.add(row3);
		templateFrameList.add(row4);
	}
	
	public static CopyOfTemplate getRandomTemplate(Orientation orientation) {
		if (orientation == Orientation.LANDSCAPE)
			return horizontalTemplate.get(new Random().nextInt(horizontalTemplate.size()));
		else
			return portraitTemplate.get(new Random().nextInt(portraitTemplate.size()));
	}
	
	//TODO Array Shuffle
	public TemplateFrameList getTemplateFrameList() {
		Collections.shuffle(templateFrameList);
		return templateFrameList;
	}
}
