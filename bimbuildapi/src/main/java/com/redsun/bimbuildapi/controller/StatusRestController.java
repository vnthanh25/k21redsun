
package com.redsun.bimbuildapi.controller;

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

import com.redsun.bimbuildapi.model.Status;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.StatusService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/status")
public class StatusRestController {

	public static final Logger logger = LoggerFactory.getLogger(StatusRestController.class);

	@Autowired
	StatusService statusService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Status-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Status status, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Status : {}", status);
		Status result = statusService.save(status);
		// return.
		return new ResponseEntity<Status>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Status------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Status status) {
		logger.info("Updating Status with id {}", id);
		Status result = statusService.save(status);
		// return.
		return new ResponseEntity<Status>(result, HttpStatus.OK);
	}

	// -------------------Delete a Status-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Status with id {}", id);
		statusService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Statuss---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Status>> listAll() {
		List<Status> statuss = statusService.listAll();
		if (statuss.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Status>>(statuss, HttpStatus.OK);
	}

	// -------------------Retrieve Single Status------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Status with id {}", id);
		Status status = statusService.getById(id);
		if (status == null) {
			logger.error("Status with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Status with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Status>(status, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Statuss With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list statuss with criteria");
		List<Status> statuss = statusService.listWithCritera(searchCriteria);
		if(statuss.isEmpty()) {
			logger.error("List of statuss is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Status>>(statuss, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Statuss With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list statuss with criteria");
		List<Status> statuss = statusService.listWithCriteras(searchCriterias);
		if(statuss.isEmpty()) {
			logger.error("List of statuss is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Status>>(statuss, HttpStatus.OK);
	}

	// -------------------Retrieve All Statuss By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Status>> listAllByPage(Pageable pageable) {
		Page<Status> statuss = statusService.listAllByPage(pageable);
		if (!statuss.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Status>>(statuss, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Statuss With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list statuss with criteria");
		Page<Status> statuss = statusService.listWithCriteraByPage(searchCriteria, pageable);
		if(!statuss.hasContent()) {
			logger.error("List of statuss is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Status>>(statuss, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Statuss With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list statuss with criteria");
		Page<Status> statuss = statusService.listWithCriterasByPage(searchCriterias, pageable);
		if(!statuss.hasContent()) {
			logger.error("List of statuss is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Status>>(statuss, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/listStatusForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listStatusForSelect() {
		logger.info("Fetching list statuss with criteria");
		List<Map<String, Object>> result = statusService.listStatusForSelect();
		if(result.isEmpty()) {
			logger.error("List of statuss is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}

}
