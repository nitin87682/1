package com.bme.pojo;

import java.util.Date;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Rating {
	@Id
	@GeneratedValue
	@Column(name="rating_id")
	private int ratingId;
	@Column(name="event_id")
	private int eventId;
	@Column(name="user_id")
	private int userId;
	private String rating;
	@Column(name="create_date")
	private Date createDate;
	@Column(name="delete_date")
	private Date deleteDate;
	
	public Rating(){}
	
	public Rating(int ratingId, int eventId, int userId, String rating) {
		super();
		this.ratingId = ratingId;
		this.eventId = eventId;
		this.userId = userId;
		this.rating = rating;
	}

	public int getRatingId() {
		return ratingId;
	}

	public void setRatingId(int ratingId) {
		this.ratingId = ratingId;
	}

	public int getEventId() {
		return eventId;
	}

	public void setEventId(int eventId) {
		this.eventId = eventId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getDeleteDate() {
		return deleteDate;
	}

	public void setDeleteDate(Date deleteDate) {
		this.deleteDate = deleteDate;
	}

	@Override
	public String toString() {
		return "Rating [ratingId=" + ratingId + ", eventId=" + eventId
				+ ", userId=" + userId + ", rating=" + rating + ", createDate="
				+ createDate + ", deleteDate=" + deleteDate + "]";
	}
	
	
	

}
