
package com.redsun.bimbuildapi.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redsun.bimbuildapi.model.Activity;
import com.redsun.bimbuildapi.model.Planningelement;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.ActivityService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/activity")
public class ActivityRestController {

	public static final Logger logger = LoggerFactory.getLogger(ActivityRestController.class);

	@Autowired
	ActivityService activityService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Activity-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Activity activity, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Activity : {}", activity);
		Activity result = activityService.save(activity);
		// return.
		return new ResponseEntity<Activity>(result, HttpStatus.CREATED);
	}
	
	
	// -------------------Create a Activity with Planningelement-------------------------------------------

	@RequestMapping(value = "/createActivityWithPlanning", method = RequestMethod.POST)
	public ResponseEntity<?> createActivityWithPlanning(@RequestBody Map<String, Object> params, UriComponentsBuilder ucBuilder) throws JsonParseException, JsonMappingException, IOException {
		Map<String, Object> result = null;
		logger.info("Creating Activity with Planningelement : {}", params);
		
		ObjectMapper objectMapper = new ObjectMapper();
		Activity activity = objectMapper.convertValue(params.get("activity"), Activity.class);
		Planningelement planningelement = objectMapper.convertValue(params.get("planningelement"), Planningelement.class);

		result = activityService.createActivityWithPlanning(activity, planningelement);
		
		// return.
		return new ResponseEntity<Map<String, Object>>(result, HttpStatus.CREATED);
	}

	
	// -------------------Update a Activity------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Activity activity) {
		logger.info("Updating Activity with id {}", id);
		Activity result = activityService.save(activity);
		// return.
		return new ResponseEntity<Activity>(result, HttpStatus.OK);
	}

	// -------------------Delete a Activity-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Activity with id {}", id);
		activityService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Activitys---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Activity>> listAll() {
		List<Activity> activitys = activityService.listAll();
		if (activitys.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Activity>>(activitys, HttpStatus.OK);
	}

	// -------------------Retrieve Single Activity------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Activity with id {}", id);
		Activity activity = activityService.getById(id);
		if (activity == null) {
			logger.error("Activity with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Activity with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Activity>(activity, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Activitys With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list activitys with criteria");
		List<Activity> activitys = activityService.listWithCritera(searchCriteria);
		if(activitys.isEmpty()) {
			logger.error("List of activitys is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Activity>>(activitys, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Activitys With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list activitys with criteria");
		List<Activity> activitys = activityService.listWithCriteras(searchCriterias);
		if(activitys.isEmpty()) {
			logger.error("List of activitys is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Activity>>(activitys, HttpStatus.OK);
	}

	// -------------------Retrieve All Activitys By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Activity>> listAllByPage(Pageable pageable) {
		Page<Activity> activitys = activityService.listAllByPage(pageable);
		if (!activitys.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Activity>>(activitys, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Activitys With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list activitys with criteria");
		Page<Activity> activitys = activityService.listWithCriteraByPage(searchCriteria, pageable);
		if(!activitys.hasContent()) {
			logger.error("List of activitys is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Activity>>(activitys, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Activitys With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list activitys with criteria");
		Page<Activity> activitys = activityService.listWithCriterasByPage(searchCriterias, pageable);
		if(!activitys.hasContent()) {
			logger.error("List of activitys is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Activity>>(activitys, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/listParentactivityForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listParentactivityForSelect() {
		logger.info("Fetching list activitys with criteria");
		List<Map<String, Object>> result = activityService.listParentactivityForSelect();
		if(result.isEmpty()) {
			logger.error("List of activitys is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}

}
