
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

import com.redsun.bimbuildapi.model.Linkable;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.LinkableService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/linkable")
public class LinkableRestController {

	public static final Logger logger = LoggerFactory.getLogger(LinkableRestController.class);

	@Autowired
	LinkableService linkableService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Linkable-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Linkable linkable, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Linkable : {}", linkable);
		Linkable result = linkableService.save(linkable);
		// return.
		return new ResponseEntity<Linkable>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Linkable------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Linkable linkable) {
		logger.info("Updating Linkable with id {}", id);
		Linkable result = linkableService.save(linkable);
		// return.
		return new ResponseEntity<Linkable>(result, HttpStatus.OK);
	}

	// -------------------Delete a Linkable-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Linkable with id {}", id);
		linkableService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Linkables---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Linkable>> listAll() {
		List<Linkable> linkables = linkableService.listAll();
		if (linkables.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Linkable>>(linkables, HttpStatus.OK);
	}

	// -------------------Retrieve Single Linkable------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Linkable with id {}", id);
		Linkable linkable = linkableService.getById(id);
		if (linkable == null) {
			logger.error("Linkable with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Linkable with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Linkable>(linkable, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Linkables With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list linkables with criteria");
		List<Linkable> linkables = linkableService.listWithCritera(searchCriteria);
		if(linkables.isEmpty()) {
			logger.error("List of linkables is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Linkable>>(linkables, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Linkables With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list linkables with criteria");
		List<Linkable> linkables = linkableService.listWithCriteras(searchCriterias);
		if(linkables.isEmpty()) {
			logger.error("List of linkables is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Linkable>>(linkables, HttpStatus.OK);
	}

	// -------------------Retrieve All Linkables By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Linkable>> listAllByPage(Pageable pageable) {
		Page<Linkable> linkables = linkableService.listAllByPage(pageable);
		if (!linkables.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Linkable>>(linkables, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Linkables With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list linkables with criteria");
		Page<Linkable> linkables = linkableService.listWithCriteraByPage(searchCriteria, pageable);
		if(!linkables.hasContent()) {
			logger.error("List of linkables is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Linkable>>(linkables, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Linkables With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list linkables with criteria");
		Page<Linkable> linkables = linkableService.listWithCriterasByPage(searchCriterias, pageable);
		if(!linkables.hasContent()) {
			logger.error("List of linkables is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Linkable>>(linkables, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/listLinknameForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listLinknameForSelect() {
		logger.info("Fetching list linkables with criteria");
		List<Map<String, Object>> result = linkableService.listLinknameForSelect();
		if(result.isEmpty()) {
			logger.error("List of linkables is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}

}
