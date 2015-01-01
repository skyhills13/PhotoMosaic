package ppomo.support;

public enum Orientation {
	PORTRAIT, LANDSCAPE, SQUARE;

	public static Orientation getBasePhotoOrientation(Orientation orientation) {
		
		if (orientation == PORTRAIT)
			return LANDSCAPE;
		else if (orientation == LANDSCAPE)
			return PORTRAIT;
		
		//TODO
		//SQUARE's strategy Added
		return null;
	}
}