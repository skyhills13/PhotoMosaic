package org.nhnnext.dao;

import org.nhnnext.domains.Photo;

public interface PhotoDao {

	Photo findByName(String originalFileName);

	void upload(Photo photo);

	void deleteById(Photo photo);

	void deleteAll(Photo photo);

	Photo findByUniqueId(String uniqueId);

	int getNumOfPhotos(int mosaicId);

}