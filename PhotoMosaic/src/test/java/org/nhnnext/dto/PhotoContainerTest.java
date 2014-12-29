package org.nhnnext.dto;

import static org.junit.Assert.*;

import org.junit.Test;
import org.nhnnext.container.PhotoContainer;
import org.nhnnext.domains.table.Photo;

public class PhotoContainerTest {

	@Test
	public void maxAdded() {
		PhotoContainer photoContainer = new PhotoContainer(3);
		
		boolean addResult = photoContainer.add(new Photo());
		assertTrue(addResult);
		assertFalse(photoContainer.isFull());
		
		addResult = photoContainer.add(new Photo());
		assertTrue(addResult);
		assertFalse(photoContainer.isFull());
		
		addResult = photoContainer.add(new Photo());
		assertTrue(addResult);
		assertTrue(photoContainer.isFull());
		
		addResult = photoContainer.add(new Photo());
		assertFalse(addResult);
	}

}
