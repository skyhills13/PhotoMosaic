package org.nhnnext.dto;

import java.util.ArrayList;

import org.nhnnext.domains.Photo;

@SuppressWarnings("serial")
public class PhotoContainer extends ArrayList<Photo>{

	private int max;
	
	public PhotoContainer(Integer max) {
		this.max = max;
	}
	
	public boolean isFull() {
		return this.size() == max ? true : false;  
	}
	
	@Override
	public boolean add(Photo photo) {
		if(this.size() < max)
			return super.add(photo);
		
		//TODO throw Exception
		else
			return false; 
	}
	
	
}
