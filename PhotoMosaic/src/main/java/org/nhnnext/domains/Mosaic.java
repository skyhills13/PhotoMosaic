package org.nhnnext.domains;

import java.sql.Timestamp;

public class Mosaic {
	private int id;
	private String title;
	private String url;
	private String comment;
	private Timestamp createdTime;
	private Photo[] photos;
	
	public Mosaic() {
	}
	public Mosaic(int id, String title, String comment, String url) {
		this.id = id;
		this.title = title;
		this.url = url;
		this.comment = comment;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	
	public Timestamp getCreatedTime() {
		return createdTime;
	}
	public void setCreatedTime(Timestamp createdTime) {
		this.createdTime = createdTime;
	}
	public Photo[] getPhotos() {
		return photos;
	}
	public void setPhotos(Photo[] photos) {
		this.photos = photos;
	}
}
