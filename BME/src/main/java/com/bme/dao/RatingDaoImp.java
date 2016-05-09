package com.bme.dao;


import java.util.Date;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bme.pojo.Rating;

@Repository
public class RatingDaoImp implements IRatingDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	@Override
	public boolean saveRating(Rating rating) {
		
		rating.setCreateDate(new Date());
	
		int status =(Integer) sessionFactory.getCurrentSession().save(rating);
		if(status>=1)
		{
			return true;
		}
		
		return false;	
	}
	@Override
	public int showNoOfLikes(Integer eID)
	{
		int count = ((Long) sessionFactory.getCurrentSession().createQuery("select count(*) from Rating where rating='Like' and event_id="+eID).uniqueResult()).intValue();
		return count;
		
	}
	@Override
	public int showNoOfDislikes(Integer eID)
	{
		int count = ((Long) sessionFactory.getCurrentSession().createQuery("select count(*) from Rating where rating='Dislike' and eventId="+eID).uniqueResult()).intValue();
		return count;
		
	}
	@Override
	public boolean duplicateUser(Rating rating) {
		
		int count =((Long) sessionFactory.getCurrentSession().createQuery("select count(*) from Rating where userId="+rating.getUserId()+ "and eventId="+rating.getEventId()).uniqueResult()).intValue();
		if(count>=1){
			return false;
		}
		return true;
	}
}
