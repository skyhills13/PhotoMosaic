package org.nhnnext.dto;

import org.nhnnext.domains.Photo;

@SuppressWarnings("serial")
public class PhotoContainer extends Container<Photo> {
	public PhotoContainer(Integer max) {
		super(max);
	}
}