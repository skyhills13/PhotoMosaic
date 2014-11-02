package org.nhnnext.domains;


public class Photo {
	
	private int id;
	private String uniqueId;
	private String originalFileName;
	
	
	public Photo(String originalFileName){
		this.originalFileName = originalFileName;
	}
	
	public Photo(int id, String uniqueId, String originalFileName) {
		this.id = id;
		this.uniqueId = uniqueId;
		this.originalFileName = originalFileName;
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
		
}