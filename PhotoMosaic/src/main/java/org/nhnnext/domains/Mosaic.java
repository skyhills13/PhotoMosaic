package org.nhnnext.domains;

import java.sql.Timestamp;

public class Mosaic {
	private int id;
	private String fileName;
	private String title;
	private String url;
	private String comment;
	private String createdDate;
	private int userId;
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
	public Mosaic(int id, String fileName, String title, String url,
			String comment, Timestamp timestamp, int userId) {
		this.id = id;
		this.fileName = fileName;
		this.title = title;
		this.url = url;
		this.comment = comment;
		this.createdDate = createdDate.toString();
		this.userId = userId;
	}


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
	
	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Photo[] getPhotos() {
		return photos;
	}
	public void setPhotos(Photo[] photos) {
		this.photos = photos;
	}
}
