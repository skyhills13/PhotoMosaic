package org.nhnnext.service;

import java.util.List;

import org.nhnnext.dao.MosaicDao;
import org.nhnnext.dao.UserDao;
import org.nhnnext.domains.Mosaic;
import org.nhnnext.domains.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlbumService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private MosaicDao mosaicDao;
		
	public List<Mosaic> showAlbumOfSpecificUser(int userId){
		User user = getSpecificUser(userId);
		return getMosaicsOfAUser(user);
	}
	
	public User getSpecificUser(int userId){
		return userDao.findById(userId);
	}
	
	public List<Mosaic> getMosaicsOfAUser(User user){
		return mosaicDao.findMosaicsOfUser(user.getId());
	}
	
}
