package ppomo.domain.table;

import java.sql.Timestamp;
import java.util.Arrays;

import ppomo.support.Orientation;

public class Mosaic {
	
	@Override
	public String toString() {
		return "Mosaic [id=" + id + ", fileName=" + fileName + ", title="
				+ title + ", url=" + url + ", comment=" + comment
				+ ", createdDate=" + createdDate + ", userId=" + userId
				+ ", photos=" + Arrays.toString(photos) + ", orientation="
				+ orientation + "]";
	}
	//getter를 쓰게되면, 객체가 아니라 데이터가 되는거야. 그래서 원칙적으로는 getter를 안주는게 맞아. 그리고 필요한 것만 있는지 맞아. 
	// getter가 적은 코드가 좋은거야. 
	private int id;
	private String fileName;
	private String title;
	private String url;
	private String comment;
	private String createdDate;
	private int userId;
	private Photo[] photos;
	private Orientation orientation;
	
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
	public Mosaic(int id, String fileName, String title, String url,
			String comment, Timestamp createdDate) {
		this.id = id;
		this.fileName = fileName;
		this.title = title;
		this.url = url;
		this.comment = comment;
		this.createdDate = createdDate.toString();
	}
	public Mosaic(int id, String fileName, String title,  String url,
			String comment, Timestamp createdDate, int userId) {
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
		setOrientation();
	}

	public Orientation getOrientation() {
		return orientation;
	}

	private void setOrientation() {
		int landscapeCount = 0;
		for( Photo photo : photos) {
			if(photo.getOrientation() == Orientation.LANDSCAPE){
				landscapeCount++;
			}else if(photo.getOrientation() == Orientation.PORTRAIT) {
				landscapeCount--;
			}
		}
		this.orientation = (landscapeCount > 0) ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
	}
}