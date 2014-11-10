package org.nhnnext.domains;


public class Photo {
	
	private int id;
	private String uniqueId;
	private String originalFileName;
	private int width;
	private int height;
	private int posX;
	private int posY;
	private int mosaicId;
	

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
	
	public Photo(String uniqueId, String originalFileName, int width, int height, int mosaicId) {
		super();
		this.uniqueId = uniqueId;
		this.originalFileName = originalFileName;
		this.width = width;
		this.height = height;
		this.mosaicId = mosaicId;
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
		
	public int getWidth() {
		return width;
	}
	
	public void setWidth(int width) {
		this.width = width;
	}
	
	public int getHeight() {
		return height;
	}
	
	public void setHeight(int height) {
		this.height = height;
	}
	
	public int getPosX() {
		return posX;
	}
	
	public void setPosX(int posX) {
		this.posX = posX;
	}
	
	public int getPosY() {
		return posY;
	}
	
	public void setPosY(int posY) {
		this.posY = posY;
	}
	
	public int getMosaicId() {
		return mosaicId;
	}
	
	public void setMosaicId(int mosaicId) {
		this.mosaicId = mosaicId;
	}
}