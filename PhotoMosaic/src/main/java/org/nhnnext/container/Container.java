package org.nhnnext.container;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

import org.nhnnext.domains.table.Mosaic;
import org.nhnnext.support.Orientation;

public abstract class Container<T>{

	protected ArrayList<T> arrayList;

	private int max;
	
	public Container(Integer max) {
		arrayList = new ArrayList<T>();
		this.max = max;
	}
	
	public int getMax() {
		return max;
	}
	
	public boolean isFull() {
		return arrayList.size() == max ? true : false;  
	}
	
	public boolean add(T data) {
		if(arrayList.size() < max)
			return arrayList.add(data);
		//TODO throw Exception
		else
			return false; 
	}
	
	public int size() {
		return arrayList.size();
	}
	
	public T get(int index) {
		return arrayList.get(index);
	}
	
	public boolean isEmpty() {
		return arrayList.isEmpty();
	}

	public T remove(int index) {
		return arrayList.remove(index);
	}
	
	
	//공부 
	public Iterator<T> iterator(){
		return arrayList.iterator();
	}
	
	abstract <Any> Any getCombinedMosaic(Mosaic mosaic, Orientation basePhotoOrientation) throws IOException;
}
