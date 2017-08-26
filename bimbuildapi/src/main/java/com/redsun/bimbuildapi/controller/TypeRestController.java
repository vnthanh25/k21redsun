
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

import com.redsun.bimbuildapi.model.Type;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.TypeService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/type")
public class TypeRestController {

	public static final Logger logger = LoggerFactory.getLogger(TypeRestController.class);

	@Autowired
	TypeService typeService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Type-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Type type, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Type : {}", type);
		Type result = typeService.save(type);
		// return.
		return new ResponseEntity<Type>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Type------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Type type) {
		logger.info("Updating Type with id {}", id);
		Type result = typeService.save(type);
		// return.
		return new ResponseEntity<Type>(result, HttpStatus.OK);
	}

	// -------------------Delete a Type-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Type with id {}", id);
		typeService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Types---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Type>> listAll() {
		List<Type> types = typeService.listAll();
		if (types.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Type>>(types, HttpStatus.OK);
	}

	// -------------------Retrieve Single Type------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Type with id {}", id);
		Type type = typeService.getById(id);
		if (type == null) {
			logger.error("Type with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Type with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Type>(type, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Types With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list types with criteria");
		List<Type> types = typeService.listWithCritera(searchCriteria);
		if(types.isEmpty()) {
			logger.error("List of types is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Type>>(types, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Types With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list types with criteria");
		List<Type> types = typeService.listWithCriteras(searchCriterias);
		if(types.isEmpty()) {
			logger.error("List of types is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Type>>(types, HttpStatus.OK);
	}

	// -------------------Retrieve All Types By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Type>> listAllByPage(Pageable pageable) {
		Page<Type> types = typeService.listAllByPage(pageable);
		if (!types.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Type>>(types, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Types With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list types with criteria");
		Page<Type> types = typeService.listWithCriteraByPage(searchCriteria, pageable);
		if(!types.hasContent()) {
			logger.error("List of types is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Type>>(types, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Types With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list types with criteria");
		Page<Type> types = typeService.listWithCriterasByPage(searchCriterias, pageable);
		if(!types.hasContent()) {
			logger.error("List of types is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Type>>(types, HttpStatus.OK);
	}

	@RequestMapping(value = "/listCustomerForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listCustomerForSelect() {
		logger.info("Fetching list clients with criteria");
		List<Map<String, Object>> result = typeService.listCustomerForSelect();
		if(result.isEmpty()) {
			logger.error("List of clients is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/listActivitytypeForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listActivitytypeForSelect() {
		logger.info("Fetching list clients with criteria");
		List<Map<String, Object>> result = typeService.listActivitytypeForSelect();
		if(result.isEmpty()) {
			logger.error("List of clients is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}

}
