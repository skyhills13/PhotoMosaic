package ppomo.domain.table;

import java.awt.Dimension;

import ppomo.support.Orientation;

public class Photo {
	
	private int id;
	private String uniqueId;
	private String originalFileName;
	private int originalWidth;
	private int originalHeight;
	private int scaledWidth;
	private int scaledHeight;
	private int mosaicId;
	private Orientation orientation;
	
	public Photo(){
	}

	public Photo(String originalFileName){
		this.originalFileName = originalFileName;
	}
	
	public Photo(int id, String uniqueId, String originalFileName, int mosaicId) {
		this.id = id;
		this.uniqueId = uniqueId;
		this.originalFileName = originalFileName;
		this.mosaicId = mosaicId;
	}
	
	public Photo(String uniqueId, String originalFileName, int mosaicId) {
		this.uniqueId = uniqueId;
		this.originalFileName = originalFileName;
		this.mosaicId = mosaicId;
	}
	
	public Photo(String uniqueId, String originalFileName, int originalWidth, int originalHeight, int mosaicId) {
		this.uniqueId = uniqueId;
		this.originalFileName = originalFileName;
		this.originalWidth = originalWidth;
		this.originalHeight = originalHeight;
		this.mosaicId = mosaicId;
	}

	public Photo(int id, String uniqueId, String originalFileName,
			int originalWidth, int originalHeight, int scaledWidth,
			int scaledHeight, int mosaicId) {
		this.id = id;
		this.uniqueId = uniqueId;
		this.originalFileName = originalFileName;
		this.originalWidth = originalWidth;
		this.originalHeight = originalHeight;
		this.scaledWidth = scaledWidth;
		this.scaledHeight = scaledHeight;
		this.mosaicId = mosaicId;
	}

	public Photo(String uniqueId, String originalFileName, Dimension dimension, int mosaicId) {
		this(uniqueId, originalFileName, (int)dimension.getWidth(), (int)dimension.getHeight(), mosaicId);
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getUniqueId() {
		return uniqueId;
	}
	
	public void setUniqueId(String uniqueId) {
		this.uniqueId = uniqueId;
	}
	
	public String getOriginalFileName() {
		return originalFileName;
	}
	public void setOriginalFileName(String originalFileName) {
		this.originalFileName = originalFileName;
	}
		
	public int getOriginalWidth() {
		return originalWidth;
	}
	
	public void setOriginalWidth(int originalWidth) {
		this.originalWidth = originalWidth;
	}
	
	public int getOriginalHeight() {
		return originalHeight;
	}
	
	public void setOriginalHeight(int originalHeight) {
		this.originalHeight = originalHeight;
	}
	
	public int getScaledWidth() {
		return scaledWidth;
	}
	
	public void setScaledWidth(int scaledWidth) {
		this.scaledWidth = scaledWidth;
	}
	
	public int getScaledHeight() {
		return scaledHeight;
	}
	
	public void setScaledHeight(int scaledHeight) {
		this.scaledHeight = scaledHeight;
	}
	
	public int getMosaicId() {
		return mosaicId;
	}
	
	public void setMosaicId(int mosaicId) {
		this.mosaicId = mosaicId;
	}

	public Orientation getOrientation() {
		return orientation;
	}

	public void setOrientation(Orientation orientation) {
		this.orientation = orientation;
	}
}