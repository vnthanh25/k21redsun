
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

import com.redsun.bimbuildapi.model.Planningmode;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.PlanningmodeService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/planningmode")
public class PlanningmodeRestController {

	public static final Logger logger = LoggerFactory.getLogger(PlanningmodeRestController.class);

	@Autowired
	PlanningmodeService planningmodeService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Planningmode-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Planningmode planningmode, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Planningmode : {}", planningmode);
		Planningmode result = planningmodeService.save(planningmode);
		// return.
		return new ResponseEntity<Planningmode>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Planningmode------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Planningmode planningmode) {
		logger.info("Updating Planningmode with id {}", id);
		Planningmode result = planningmodeService.save(planningmode);
		// return.
		return new ResponseEntity<Planningmode>(result, HttpStatus.OK);
	}

	// -------------------Delete a Planningmode-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Planningmode with id {}", id);
		planningmodeService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Planningmodes---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Planningmode>> listAll() {
		List<Planningmode> planningmodes = planningmodeService.listAll();
		if (planningmodes.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Planningmode>>(planningmodes, HttpStatus.OK);
	}

	// -------------------Retrieve Single Planningmode------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Planningmode with id {}", id);
		Planningmode planningmode = planningmodeService.getById(id);
		if (planningmode == null) {
			logger.error("Planningmode with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Planningmode with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Planningmode>(planningmode, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Planningmodes With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list planningmodes with criteria");
		List<Planningmode> planningmodes = planningmodeService.listWithCritera(searchCriteria);
		if(planningmodes.isEmpty()) {
			logger.error("List of planningmodes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Planningmode>>(planningmodes, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Planningmodes With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list planningmodes with criteria");
		List<Planningmode> planningmodes = planningmodeService.listWithCriteras(searchCriterias);
		if(planningmodes.isEmpty()) {
			logger.error("List of planningmodes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Planningmode>>(planningmodes, HttpStatus.OK);
	}

	// -------------------Retrieve All Planningmodes By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Planningmode>> listAllByPage(Pageable pageable) {
		Page<Planningmode> planningmodes = planningmodeService.listAllByPage(pageable);
		if (!planningmodes.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Planningmode>>(planningmodes, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Planningmodes With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list planningmodes with criteria");
		Page<Planningmode> planningmodes = planningmodeService.listWithCriteraByPage(searchCriteria, pageable);
		if(!planningmodes.hasContent()) {
			logger.error("List of planningmodes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Planningmode>>(planningmodes, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Planningmodes With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list planningmodes with criteria");
		Page<Planningmode> planningmodes = planningmodeService.listWithCriterasByPage(searchCriterias, pageable);
		if(!planningmodes.hasContent()) {
			logger.error("List of planningmodes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Planningmode>>(planningmodes, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/listPlanningmodeForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listPlanningmodeForSelect() {
		logger.info("Fetching list planningmodes with criteria");
		List<Map<String, Object>> result = planningmodeService.listPlanningmodeForSelect();
		if(result.isEmpty()) {
			logger.error("List of planningmodes is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}

	
}
