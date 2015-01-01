package ppomo.alogirthm.template;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import ppomo.support.Orientation;

public enum Template {

	/*
	 * PORTRAIT
	 */
	//2
	STRATEGY_1 (2, Orientation.PORTRAIT, new Integer[]{1, 1}),
	//3
	STRATEGY_2 (3, Orientation.PORTRAIT, new Integer[]{1, 2}),
	//4
	STRATEGY_3 (4, Orientation.PORTRAIT, new Integer[]{2, 2}),
	STRATEGY_4 (4, Orientation.PORTRAIT, new Integer[]{1, 3}),
	STRATEGY_5 (4, Orientation.PORTRAIT, new Integer[]{1, 1, 2}),
	//5
	STRATEGY_6 (5, Orientation.PORTRAIT, new Integer[]{2, 3}),
	STRATEGY_7 (5, Orientation.PORTRAIT, new Integer[]{2, 2, 1}),
	//6
	STRATEGY_8 (6, Orientation.PORTRAIT, new Integer[]{2, 2, 2}),
	STRATEGY_9 (6, Orientation.PORTRAIT, new Integer[]{1, 2, 3}),
	//7
	STRATEGY_10 (7, Orientation.PORTRAIT, new Integer[]{2, 2, 3}),
	//8
	STRATEGY_11 (8, Orientation.PORTRAIT, new Integer[]{2, 3, 3}),
	STRATEGY_12 (8, Orientation.PORTRAIT, new Integer[]{2, 2, 4}),
	
	/*
	 * LANDSCAPE
	 */
	//2
	STRATEGY_13 (2, Orientation.LANDSCAPE, new Integer[]{1, 1}),
	//3
	STRATEGY_14 (3, Orientation.LANDSCAPE, new Integer[]{1, 2}),
	//4
	STRATEGY_15 (4, Orientation.LANDSCAPE, new Integer[]{2, 2, 0}),
	STRATEGY_16 (4, Orientation.LANDSCAPE, new Integer[]{1, 3, 0}),
	STRATEGY_17 (4, Orientation.LANDSCAPE, new Integer[]{1, 1, 2}),
	//5
	STRATEGY_18 (5, Orientation.LANDSCAPE, new Integer[]{2, 3}),
	STRATEGY_19 (5, Orientation.LANDSCAPE, new Integer[]{2, 2, 1}),
	//6
	STRATEGY_20 (6, Orientation.LANDSCAPE, new Integer[]{2, 2, 2}),
	STRATEGY_21 (6, Orientation.LANDSCAPE, new Integer[]{1, 2, 3}),
	STRATEGY_22 (6, Orientation.LANDSCAPE, new Integer[]{3, 3}),
	//7
	STRATEGY_23 (7, Orientation.LANDSCAPE, new Integer[]{2, 2, 3}),
	//8
//	STRATEGY_24 (8, Orientation.LANDSCAPE, new Integer[]{1, 2, 3, 2}),
//	STRATEGY_25 (8, Orientation.LANDSCAPE, new Integer[]{1, 3, 3, 1}),
	STRATEGY_26 (8, Orientation.LANDSCAPE, new Integer[]{3, 3, 2});
	
	private TemplateFrameList templateFrameList;
	
	/** Schema
	 * {
	 * 		photoNumber : [
	 * 			Orientation.HORIZONTAOL: [
	 * 				STRATEGY_1,
	 * 				STRATEGY_2,
	 * 				...	
	 * 			],
	 * 			
	 * 			Orientation.PORTRAIT : [
	 * 				STRATEGY_3,
	 * 				STRATEGY_4,
	 * 				...
	 * 			]
	 * 		]
	 * }
	 */
	private static Map<Integer, HashMap<Orientation, ArrayList<Template>>> strategyStorage;
	private Integer[] templateFrameArray;
	
	Template(int photoNumber, Orientation strategyOrientation, Integer[] templateFrameArray) {
		addStrategyStorage(photoNumber, strategyOrientation, this);
		this.templateFrameArray = templateFrameArray;
	}
	
	private synchronized static void addStrategyStorage(int photoNumber, Orientation strategyOrientation, Template template) {
		if (strategyStorage == null)
			strategyStorage = new HashMap<Integer, HashMap<Orientation, ArrayList<Template>>>();
		
		HashMap<Orientation, ArrayList<Template>> individualStrategyStorage = strategyStorage.get(photoNumber);
		
		/*
		 * 만약 Storage의 틀이 만들어지지 않은 상태라면, 빈 Frame을 생성해서 넣어준다.
		 */
		if (individualStrategyStorage == null) {
			strategyStorage.put(photoNumber, new HashMap<Orientation, ArrayList<Template>>());
			individualStrategyStorage = strategyStorage.get(photoNumber);
			
			individualStrategyStorage.put(Orientation.LANDSCAPE, new ArrayList<Template>());
			individualStrategyStorage.put(Orientation.PORTRAIT, new ArrayList<Template>());
		}
		
		ArrayList<Template> orientationStorage = individualStrategyStorage.get(strategyOrientation);
		orientationStorage.add(template);
	}
	
	//TODO Make List,  not get-setter
	Template(int col1, int col2, int col3) {
		templateFrameList = new TemplateFrameList();
		templateFrameList.add(col1);
		templateFrameList.add(col2);
		templateFrameList.add(col3);
	}
	
	//TODO Make List,  not get-setter
	Template(int row1, int row2, int row3, int row4) {
		templateFrameList = new TemplateFrameList();
		templateFrameList.add(row1);
		templateFrameList.add(row2);
		templateFrameList.add(row3);
		templateFrameList.add(row4);
	}
	
	public static Template getRandomTemplate(int photoNumber, Orientation targetOrientation) {
		ArrayList<Template> tempList = new ArrayList<Template>();
		if(photoNumber > 8) {
			photoNumber = 8;
		}
		tempList.addAll(strategyStorage.get(photoNumber).get(targetOrientation));
		Collections.shuffle(tempList);
		
		return tempList.get(0);
	}
	
	public TemplateFrameList getTemplateFrameList() {
		TemplateFrameList templateFrameList = new TemplateFrameList();
		
		for (Integer templateFrameNumber : templateFrameArray) {
			templateFrameList.add(templateFrameNumber);
		}
		
		return templateFrameList;
	}
}
