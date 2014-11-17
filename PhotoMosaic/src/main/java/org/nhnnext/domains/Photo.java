package org.nhnnext.domains;

public class Photo {
	
	private int id;
	private String uniqueId;
	private String originalFileName;
	private int originalWidth;
	private int originalHeight;
	private int scaledWidth;
	private int scaledHeight;
	private int mosaicId;
	
	//이렇게 오버로딩된 메서드가 많아야 하는게 맞나? 다 필요한 메서드들?
	//오버로딩하는게 많다는게 복잡함을 증가시키거나 이미 로직이 복잡하다는 걸 의미하는건 아닌지? 
	//그런게 아니면 무시하고^^
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
		super();
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
}