package org.nhnnext.dto;

import java.io.IOException;
import java.util.ArrayList;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.support.Orientation;

@SuppressWarnings("serial")
public abstract class Container<T> extends ArrayList<T> {
	//arrayList를 필드로 가지고 있어야지.
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
}
