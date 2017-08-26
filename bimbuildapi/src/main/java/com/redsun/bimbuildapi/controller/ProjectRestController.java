
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

import com.redsun.bimbuildapi.model.Project;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.ProjectService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/project")
public class ProjectRestController {

	public static final Logger logger = LoggerFactory.getLogger(ProjectRestController.class);

	@Autowired
	ProjectService projectService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Project-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Project project, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Project : {}", project);
		Project result = projectService.save(project);
		// return.
		return new ResponseEntity<Project>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Project------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Project project) {
		logger.info("Updating Project with id {}", id);
		Project result = projectService.save(project);
		// return.
		return new ResponseEntity<Project>(result, HttpStatus.OK);
	}

	// -------------------Delete a Project-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Project with id {}", id);
		projectService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Projects---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Project>> listAll() {
		List<Project> projects = projectService.listAll();
		if (projects.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Project>>(projects, HttpStatus.OK);
	}

	// -------------------Retrieve Single Project------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Project with id {}", id);
		Project project = projectService.getById(id);
		if (project == null) {
			logger.error("Project with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Project with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Project>(project, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Projects With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list projects with criteria");
		List<Project> projects = projectService.listWithCritera(searchCriteria);
		if(projects.isEmpty()) {
			logger.error("List of projects is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Project>>(projects, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Projects With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list projects with criteria");
		List<Project> projects = projectService.listWithCriteras(searchCriterias);
		if(projects.isEmpty()) {
			logger.error("List of projects is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Project>>(projects, HttpStatus.OK);
	}

	// -------------------Retrieve All Projects By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Project>> listAllByPage(Pageable pageable) {
		Page<Project> projects = projectService.listAllByPage(pageable);
		if (!projects.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Project>>(projects, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Projects With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list projects with criteria");
		Page<Project> projects = projectService.listWithCriteraByPage(searchCriteria, pageable);
		if(!projects.hasContent()) {
			logger.error("List of projects is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Project>>(projects, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Projects With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list projects with criteria");
		Page<Project> projects = projectService.listWithCriterasByPage(searchCriterias, pageable);
		if(!projects.hasContent()) {
			logger.error("List of projects is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Project>>(projects, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/listProjectnameForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listProjectnameForSelect() {
		logger.info("Fetching list projects with criteria");
		List<Map<String, Object>> result = projectService.listProjectnameForSelect();
		if(result.isEmpty()) {
			logger.error("List of projects is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}

}
