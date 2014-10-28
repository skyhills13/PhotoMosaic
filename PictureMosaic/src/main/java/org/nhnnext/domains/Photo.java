package org.nhnnext.domains;


public class Photo {
	
	private int id;
	private String name;
	private double size;
	private int originalWidth;
	private int originalHeight;
	private int mosaicId;
	
	public int getId() {
		return id;
	}
	
	public int getMosaicId() {
		return mosaicId;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getSize() {
		return size;
	}
	public void setSize(double size) {
		this.size = size;
	}
	public int getOriginal_width() {
		return originalWidth;
	}
	public void setOriginal_width(int original_width) {
		this.originalWidth = original_width;
	}
	public int getOriginal_height() {
		return originalHeight;
	}
	public void setOriginal_height(int original_height) {
		this.originalHeight = original_height;
	}
}
