package ppomo.algorithm.instance;

import java.awt.image.BufferedImage;

public class MergeInstance {
	
	@Override
	public String toString() {
		return "MergeInstance [bufferedImage=" + bufferedImage + ", x=" + x
				+ ", y=" + y + "]";
	}

	private BufferedImage bufferedImage;
	private int x;
	private int y;
	
	public MergeInstance(BufferedImage bufferedImage, int x, int y) {
		super();
		this.bufferedImage = bufferedImage;
		this.x = x;
		this.y = y;
	}

	public BufferedImage getBufferedImage() {
		return bufferedImage;
	}

	public int getX() {
		return x;
	}

	public int getY() {
		return y;
	}
}
