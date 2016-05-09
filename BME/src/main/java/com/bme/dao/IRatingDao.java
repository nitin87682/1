package com.bme.dao;

import java.util.List;



import com.bme.pojo.Rating;

public interface IRatingDao {
	
	public boolean saveRating(Rating rating);
	public boolean duplicateUser(Rating rating);

	public int showNoOfLikes(Integer eID);
	public int showNoOfDislikes(Integer eID);
	
}
