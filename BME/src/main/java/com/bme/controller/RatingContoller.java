package com.bme.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bme.pojo.Rating;

import com.bme.service.IRatingService;

@Controller
public class RatingContoller {
	
	@Autowired
	private IRatingService ratingService;
	@RequestMapping(value="/saveRating",method=RequestMethod.POST)
	public @ResponseBody String saveRating(@RequestBody Rating rating){
			
			 return ratingService.addRating(rating);
	}
	@RequestMapping(value="/showLikes" ,method=RequestMethod.GET)
	public @ResponseBody String showLikes(@RequestParam("likes") String eventId){
		Integer count=ratingService.showNoOfLikes(Integer.parseInt(eventId));
		return "No Of Likes"+ count.toString();		
	}
	@RequestMapping(value="/showDislikes" ,method = RequestMethod.GET)
	public @ResponseBody String showDislikes(@RequestParam("dislikes") String eventId){
		Integer count=ratingService.showNoOfDislikes(Integer.parseInt(eventId));
		return "No Of Dislikes"+count.toString();
	}
	
	
	
}
