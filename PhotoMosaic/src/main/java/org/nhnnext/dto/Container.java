package org.nhnnext.dto;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.Photo;
import org.nhnnext.support.Orientation;

@SuppressWarnings("serial")
public abstract class Container<T> extends ArrayList<T> {
	private int max;
	
	public Container(Integer max) {
		this.max = max;
	}
	
	public int getMax() {
		return max;
	}
	
	public boolean isFull() {
		return this.size() == max ? true : false;  
	}
	
	@Override
	public boolean add(T data) {
		if(this.size() < max)
			return super.add(data);
		
		//TODO throw Exception
		else
			return false; 
	}
	
	abstract <Any> Any getCombinedMosaic(Mosaic mosaic, Orientation basePhotoOrientation) throws IOException;
	protected abstract ArrayList<BufferedImage> resizeEach(Mosaic mosaic, Orientation basePhotoOrientation) throws IOException;
	protected abstract Photo getSmallestSizedPhoto(Orientation basePhotoOrientation);
}
