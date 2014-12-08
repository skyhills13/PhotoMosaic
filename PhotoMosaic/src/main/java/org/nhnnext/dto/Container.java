package org.nhnnext.dto;

import java.util.ArrayList;

@SuppressWarnings("serial")
public class Container<T> extends ArrayList<T> {
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
}
