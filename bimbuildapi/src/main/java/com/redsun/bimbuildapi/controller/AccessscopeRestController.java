
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

import com.redsun.bimbuildapi.model.Accessscope;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.AccessscopeService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/accessscope")
public class AccessscopeRestController {

	public static final Logger logger = LoggerFactory.getLogger(AccessscopeRestController.class);

	@Autowired
	AccessscopeService accessscopeService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Accessscope-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Accessscope accessscope, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Accessscope : {}", accessscope);
		Accessscope result = accessscopeService.save(accessscope);
		// return.
		return new ResponseEntity<Accessscope>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Accessscope------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Accessscope accessscope) {
		logger.info("Updating Accessscope with id {}", id);
		Accessscope result = accessscopeService.save(accessscope);
		// return.
		return new ResponseEntity<Accessscope>(result, HttpStatus.OK);
	}

	// -------------------Delete a Accessscope-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Accessscope with id {}", id);
		accessscopeService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Accessscopes---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Accessscope>> listAll() {
		List<Accessscope> accessscopes = accessscopeService.listAll();
		if (accessscopes.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Accessscope>>(accessscopes, HttpStatus.OK);
	}

	// -------------------Retrieve Single Accessscope------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Accessscope with id {}", id);
		Accessscope accessscope = accessscopeService.getById(id);
		if (accessscope == null) {
			logger.error("Accessscope with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Accessscope with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Accessscope>(accessscope, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Accessscopes With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list accessscopes with criteria");
		List<Accessscope> accessscopes = accessscopeService.listWithCritera(searchCriteria);
		if(accessscopes.isEmpty()) {
			logger.error("List of accessscopes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Accessscope>>(accessscopes, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Accessscopes With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list accessscopes with criteria");
		List<Accessscope> accessscopes = accessscopeService.listWithCriteras(searchCriterias);
		if(accessscopes.isEmpty()) {
			logger.error("List of accessscopes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Accessscope>>(accessscopes, HttpStatus.OK);
	}

	// -------------------Retrieve All Accessscopes By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Accessscope>> listAllByPage(Pageable pageable) {
		Page<Accessscope> accessscopes = accessscopeService.listAllByPage(pageable);
		if (!accessscopes.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Accessscope>>(accessscopes, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Accessscopes With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list accessscopes with criteria");
		Page<Accessscope> accessscopes = accessscopeService.listWithCriteraByPage(searchCriteria, pageable);
		if(!accessscopes.hasContent()) {
			logger.error("List of accessscopes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Accessscope>>(accessscopes, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Accessscopes With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list accessscopes with criteria");
		Page<Accessscope> accessscopes = accessscopeService.listWithCriterasByPage(searchCriterias, pageable);
		if(!accessscopes.hasContent()) {
			logger.error("List of accessscopes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Accessscope>>(accessscopes, HttpStatus.OK);
	}
	
	// -------------------List all for select------------------------------------------

	@RequestMapping(value = "/listAccessscopeForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listAccessscopeForSelect() {
		logger.info("List all for id and code.");
		List<Map<String, Object>> result = accessscopeService.listAccessscopeForSelect();
		if(result.isEmpty()) {
			logger.error("List of accessscopes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}
	
}
