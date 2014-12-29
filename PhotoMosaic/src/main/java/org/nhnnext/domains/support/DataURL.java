package org.nhnnext.domains.support;

public class DataURL {

	private String fileName;
	private String dataURL;

	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	public String getDataURL() {
		return this.dataURL;
	}
	public void setDataURL(String dataURL) {
		this.dataURL = dataURL;
	}
	
	@Override
	public String toString() {
		return "DataUrl [fileName=" + fileName + ", dataURL=" + dataURL.substring(0,80)+ "..." + "]";
	}
}
