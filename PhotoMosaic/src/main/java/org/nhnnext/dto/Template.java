package org.nhnnext.dto;

import java.util.ArrayList;
import java.util.Random;

import org.nhnnext.support.Orientation;

@SuppressWarnings("serial")
public enum Template {
	HORIZONTAL_STRATEGY_1 (2, 3, 3),
	HORIZONTAL_STRATEGY_2 (2, 2, 4),
	HORIZONTAL_STRATEGY_3 (1, 4, 3),
	
	PORTRAIT_STRATEGY_1 (1, 2, 3, 2),
	PORTRAIT_STRATEGY_2 (1, 3, 3, 1),
	PORTRAIT_STRATEGY_3 (3, 3, 2, 0);
	
	int col1;
	int col2;
	int col3;
	
	int row1;
	int row2;
	int row3;
	int row4;
	
	private static final ArrayList<Template> horizontalTemplate = new ArrayList<Template>() {{
		add(HORIZONTAL_STRATEGY_1);
		add(HORIZONTAL_STRATEGY_2);
		add(HORIZONTAL_STRATEGY_3);
	}};
	
	private static final ArrayList<Template> portraitTemplate = new ArrayList<Template>() {{
		add(PORTRAIT_STRATEGY_1);
		add(PORTRAIT_STRATEGY_2);
		add(PORTRAIT_STRATEGY_3);
	}};
	
	//TODO Make List,  not get-setter
	Template(int col1, int col2, int col3) {
		this.col1 = col1;
		this.col2 = col2;
		this.col3 = col3;
	}
	
	//TODO Make List,  not get-setter
	Template(int row1, int row2, int row3, int row4) {
		this.row1 = row1;
		this.row2 = row2;
		this.row3 = row3;
		this.row4 = row4;
	}
	
	public static Template getRandomTemplate(Orientation orientation) {
		if (orientation == Orientation.LANDSCAPE)
			return horizontalTemplate.get(new Random().nextInt(horizontalTemplate.size()));
		else
			return portraitTemplate.get(new Random().nextInt(portraitTemplate.size()));
	}
	
	//TODO Array Shuffle
	public TemplateFrameList getTemplateFrameList(Orientation orientation) {
		return new TemplateFrameList(){{
			if (orientation == Orientation.LANDSCAPE) {
				add(col1);
				add(col2);
				add(col3);
				
			} else if (orientation == Orientation.PORTRAIT){
				add(row1);
				add(row2);
				add(row3);
				add(row4);
				
			} else {
				//TODO Convert Propert Exception Throws
				//throw new Exception();
			}
		}};
	}
	
	public int getCol1() {
		return col1;
	}
	
	public int getCol2() {
		return col2;
	}
	
	public int getCol3() {
		return col3;
	}
	
	public int getRow1() {
		return row1;
	}
	
	public int getRow2() {
		return row2;
	}
	
	public int getRow3() {
		return row3;
	}
	
	public int getRow4() {
		return row4;
	}
}
