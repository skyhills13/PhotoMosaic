package ppomo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ppomo.dao.MosaicDao;
import ppomo.dao.UserDao;
import ppomo.domain.table.Mosaic;
import ppomo.domain.table.User;

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
