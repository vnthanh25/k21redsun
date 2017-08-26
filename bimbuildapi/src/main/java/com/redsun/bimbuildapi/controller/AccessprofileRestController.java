
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

import com.redsun.bimbuildapi.model.Accessprofile;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.AccessprofileService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/accessprofile")
public class AccessprofileRestController {

	public static final Logger logger = LoggerFactory.getLogger(AccessprofileRestController.class);

	@Autowired
	AccessprofileService accessprofileService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Accessprofile-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Accessprofile accessprofile, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Accessprofile : {}", accessprofile);
		Accessprofile result = accessprofileService.save(accessprofile);
		// return.
		return new ResponseEntity<Accessprofile>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Accessprofile------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Accessprofile accessprofile) {
		logger.info("Updating Accessprofile with id {}", id);
		Accessprofile result = accessprofileService.save(accessprofile);
		// return.
		return new ResponseEntity<Accessprofile>(result, HttpStatus.OK);
	}

	// -------------------Delete a Accessprofile-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Accessprofile with id {}", id);
		accessprofileService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Accessprofiles---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Accessprofile>> listAll() {
		List<Accessprofile> accessprofiles = accessprofileService.listAll();
		if (accessprofiles.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Accessprofile>>(accessprofiles, HttpStatus.OK);
	}

	// -------------------Retrieve Single Accessprofile------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Accessprofile with id {}", id);
		Accessprofile accessprofile = accessprofileService.getById(id);
		if (accessprofile == null) {
			logger.error("Accessprofile with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Accessprofile with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Accessprofile>(accessprofile, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Accessprofiles With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list accessprofiles with criteria");
		List<Accessprofile> accessprofiles = accessprofileService.listWithCritera(searchCriteria);
		if(accessprofiles.isEmpty()) {
			logger.error("List of accessprofiles is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Accessprofile>>(accessprofiles, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Accessprofiles With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list accessprofiles with criteria");
		List<Accessprofile> accessprofiles = accessprofileService.listWithCriteras(searchCriterias);
		if(accessprofiles.isEmpty()) {
			logger.error("List of accessprofiles is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Accessprofile>>(accessprofiles, HttpStatus.OK);
	}

	// -------------------Retrieve All Accessprofiles By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Accessprofile>> listAllByPage(Pageable pageable) {
		Page<Accessprofile> accessprofiles = accessprofileService.listAllByPage(pageable);
		if (!accessprofiles.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Accessprofile>>(accessprofiles, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Accessprofiles With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list accessprofiles with criteria");
		Page<Accessprofile> accessprofiles = accessprofileService.listWithCriteraByPage(searchCriteria, pageable);
		if(!accessprofiles.hasContent()) {
			logger.error("List of accessprofiles is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Accessprofile>>(accessprofiles, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Accessprofiles With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list accessprofiles with criteria");
		Page<Accessprofile> accessprofiles = accessprofileService.listWithCriterasByPage(searchCriterias, pageable);
		if(!accessprofiles.hasContent()) {
			logger.error("List of accessprofiles is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Accessprofile>>(accessprofiles, HttpStatus.OK);
	}

	// -------------------Retrieve List Of Accessprofiles For Select------------------------------------------
	
	@RequestMapping(value = "/listAccessprofileForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listAccessprofileForSelect() {
		logger.info("Fetching list contexts with criteria");
		List<Map<String, Object>> result = accessprofileService.listAccessprofileForSelect();
		if(result.isEmpty()) {
			logger.error("List of contexts is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}
	
}
