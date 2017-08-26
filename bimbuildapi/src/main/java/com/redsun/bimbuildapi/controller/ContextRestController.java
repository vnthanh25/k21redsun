
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

import com.redsun.bimbuildapi.model.Context;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.ContextService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/context")
public class ContextRestController {

	public static final Logger logger = LoggerFactory.getLogger(ContextRestController.class);

	@Autowired
	ContextService contextService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Context-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Context context, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Context : {}", context);
		Context result = contextService.save(context);
		// return.
		return new ResponseEntity<Context>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Context------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Context context) {
		logger.info("Updating Context with id {}", id);
		Context result = contextService.save(context);
		// return.
		return new ResponseEntity<Context>(result, HttpStatus.OK);
	}

	// -------------------Delete a Context-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Context with id {}", id);
		contextService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Contexts---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Context>> listAll() {
		List<Context> contexts = contextService.listAll();
		if (contexts.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Context>>(contexts, HttpStatus.OK);
	}

	// -------------------Retrieve Single Context------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Context with id {}", id);
		Context context = contextService.getById(id);
		if (context == null) {
			logger.error("Context with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Context with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Context>(context, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Contexts With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list contexts with criteria");
		List<Context> contexts = contextService.listWithCritera(searchCriteria);
		if(contexts.isEmpty()) {
			logger.error("List of contexts is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Context>>(contexts, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Contexts With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list contexts with criteria");
		List<Context> contexts = contextService.listWithCriteras(searchCriterias);
		if(contexts.isEmpty()) {
			logger.error("List of contexts is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Context>>(contexts, HttpStatus.OK);
	}

	// -------------------Retrieve All Contexts By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Context>> listAllByPage(Pageable pageable) {
		Page<Context> contexts = contextService.listAllByPage(pageable);
		if (!contexts.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Context>>(contexts, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Contexts With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list contexts with criteria");
		Page<Context> contexts = contextService.listWithCriteraByPage(searchCriteria, pageable);
		if(!contexts.hasContent()) {
			logger.error("List of contexts is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Context>>(contexts, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Contexts With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list contexts with criteria");
		Page<Context> contexts = contextService.listWithCriterasByPage(searchCriterias, pageable);
		if(!contexts.hasContent()) {
			logger.error("List of contexts is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Context>>(contexts, HttpStatus.OK);
	}

}
