
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

import com.redsun.bimbuildapi.model.Resource;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.ResourceService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/resource")
public class ResourceRestController {

	public static final Logger logger = LoggerFactory.getLogger(ResourceRestController.class);

	@Autowired
	ResourceService resourceService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Resource-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Resource resource, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Resource : {}", resource);
		Resource result = resourceService.save(resource);
		// return.
		return new ResponseEntity<Resource>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Resource------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Resource resource) {
		logger.info("Updating Resource with id {}", id);
		Resource result = resourceService.save(resource);
		// return.
		return new ResponseEntity<Resource>(result, HttpStatus.OK);
	}

	// -------------------Delete a Resource-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Resource with id {}", id);
		resourceService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Resources---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Resource>> listAll() {
		List<Resource> resources = resourceService.listAll();
		if (resources.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Resource>>(resources, HttpStatus.OK);
	}

	// -------------------Retrieve Single Resource------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Resource with id {}", id);
		Resource resource = resourceService.getById(id);
		if (resource == null) {
			logger.error("Resource with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Resource with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Resource>(resource, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Resources With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list resources with criteria");
		List<Resource> resources = resourceService.listWithCritera(searchCriteria);
		if(resources.isEmpty()) {
			logger.error("List of resources is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Resource>>(resources, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Resources With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list resources with criteria");
		List<Resource> resources = resourceService.listWithCriteras(searchCriterias);
		if(resources.isEmpty()) {
			logger.error("List of resources is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Resource>>(resources, HttpStatus.OK);
	}

	// -------------------Retrieve All Resources By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Resource>> listAllByPage(Pageable pageable) {
		Page<Resource> resources = resourceService.listAllByPage(pageable);
		if (!resources.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Resource>>(resources, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Resources With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list resources with criteria");
		Page<Resource> resources = resourceService.listWithCriteraByPage(searchCriteria, pageable);
		if(!resources.hasContent()) {
			logger.error("List of resources is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Resource>>(resources, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Resources With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list resources with criteria");
		Page<Resource> resources = resourceService.listWithCriterasByPage(searchCriterias, pageable);
		if(!resources.hasContent()) {
			logger.error("List of resources is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Resource>>(resources, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/listContactnameForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listContactnameForSelect() {
		logger.info("Fetching list resources with criteria");
		List<Map<String, Object>> result = resourceService.listContactnameForSelect();
		if(result.isEmpty()) {
			logger.error("List of resources is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/listResponsiblenameForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listResponsiblenameForSelect() {
		logger.info("Fetching list resources with criteria");
		List<Map<String, Object>> result = resourceService.listResponsiblenameForSelect();
		if(result.isEmpty()) {
			logger.error("List of resources is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}


}
