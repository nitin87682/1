package com.bme.service;

import java.util.List;




import com.bme.pojo.Rating;

public interface IRatingService {
	public String addRating(Rating rating);	
	public int showNoOfLikes(Integer eID);
	public int showNoOfDislikes(Integer eID);
	
}
