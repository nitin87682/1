package com.bme.service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bme.dao.IRatingDao;
import com.bme.pojo.Rating;

@Service
public class RatingServiceImpl implements IRatingService{
	
	@Autowired
	private IRatingDao ratingDao;

	@Transactional
	public String addRating(Rating rating) {
		
		if(ratingDao.duplicateUser(rating))
		{
		  if(ratingDao.saveRating(rating))
		  {
			  return "Rating Added";
		  }
		 return "Failed";
		}
		return "Duplicate Rating";
	}
	@Transactional
	public int showNoOfLikes(Integer eID)
	{
	return ratingDao.showNoOfLikes(eID);
	}

	@Transactional
	public int showNoOfDislikes(Integer eID)
	{
	return ratingDao.showNoOfDislikes(eID);
	}
}
