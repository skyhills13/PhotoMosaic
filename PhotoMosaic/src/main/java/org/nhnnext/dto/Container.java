package org.nhnnext.dto;

import java.io.IOException;
import java.util.ArrayList;

import org.nhnnext.domains.Mosaic;
import org.nhnnext.support.Orientation;

@SuppressWarnings("serial")
public abstract class Container<T> extends ArrayList<T> {
	//arrayList를 필드로 가지고 있어야지.
		//
	//좋은 상속과 나쁜 상속이 있는데, 나쁜 상속의 예다. 
	//이걸 상속으로 잘썼으려면, arraylist를 쓰는 모든 코드에 container를 넣어도 괜찮아야해. 
	//이건 상속의 용도중 2번이 아니라 1번이야. list라는 자료구조를 재활용하고 싶은거야. 그런 경우라면 합성이 맞아. 합성으로 바꿔야지. 
	//일반화 특수화 용도로도 interface를 쓸 수 있으면 쓰는 것이 좋겠어. 
	//상속은 일반화 특수화 용도로만 쓰는 것이 맞아. 
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
