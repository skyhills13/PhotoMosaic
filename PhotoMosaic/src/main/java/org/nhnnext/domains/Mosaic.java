package org.nhnnext.domains;

public class Mosaic {
	private int id;
	private String title;
	private String url;
	private String contents;
	private Photo[] photos;
	
	public Mosaic() {
	}
	public Mosaic(int id, String title, String contents, String url) {
		this.id = id;
		this.title = title;
		this.url = url;
		this.contents = contents;
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
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Photo[] getPhotos() {
		return photos;
	}
	public void setPhotos(Photo[] photos) {
		this.photos = photos;
	}
}
