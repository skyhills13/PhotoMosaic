package org.nhnnext.domains;

import java.sql.Timestamp;

public class Mosaic {
	private int id;
	private String fileName;
	private String title;
	private String url;
	private String comment;
	private String createdDate;
	private Photo[] photos;
	
	public Mosaic() {
	}
	
	
	public Mosaic(String fileName, String title, String url, String comment) {
		this.fileName = fileName;
		this.title = title;
		this.url = url;
		this.comment = comment;
	}


	public Mosaic(int id, String title, String comment, String url) {
		this.id = id;
		this.title = title;
		this.url = url;
		this.comment = comment;
	}
	public Mosaic(int id, String fileName, String title, String comment, String url,
			Timestamp createdDate) {
		this.id = id;
		this.fileName = fileName;
		this.title = title;
		this.url = url;
		this.comment = comment;
		this.createdDate = createdDate.toString();
	}

	//아직 완성품이 아닌 듯? 매개변수에 선언된 건 많은데 메서드에서 사용하는 건 별로 없어보이길래.
	public Mosaic(int id, String fileName, String title, String url,
			String comment, Timestamp timestamp, int userId, int mosaicId) {
		this.id = id;
		this.fileName = fileName;
		this.title = title;
		this.url = url;
		this.comment = comment;
		this.createdDate = createdDate.toString();
		//TODO userId , mosaicId 생성
	}


	// 아래 getter setter는 분명히 필요해서 추가한 것들이겠지? 
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate.toString();
	}
	public Photo[] getPhotos() {
		return photos;
	}
	public void setPhotos(Photo[] photos) {
		this.photos = photos;
	}
}
