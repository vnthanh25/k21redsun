
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

import com.redsun.bimbuildapi.model.Client;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.ClientService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/client")
public class ClientRestController {

	public static final Logger logger = LoggerFactory.getLogger(ClientRestController.class);

	@Autowired
	ClientService clientService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Client-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Client client, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Client : {}", client);
		Client result = clientService.save(client);
		// return.
		return new ResponseEntity<Client>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Client------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Client client) {
		logger.info("Updating Client with id {}", id);
		Client result = clientService.save(client);
		// return.
		return new ResponseEntity<Client>(result, HttpStatus.OK);
	}

	// -------------------Delete a Client-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Client with id {}", id);
		clientService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Clients---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Client>> listAll() {
		List<Client> clients = clientService.listAll();
		if (clients.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Client>>(clients, HttpStatus.OK);
	}

	// -------------------Retrieve Single Client------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Client with id {}", id);
		Client client = clientService.getById(id);
		if (client == null) {
			logger.error("Client with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Client with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Client>(client, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Clients With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list clients with criteria");
		List<Client> clients = clientService.listWithCritera(searchCriteria);
		if(clients.isEmpty()) {
			logger.error("List of clients is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Client>>(clients, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Clients With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list clients with criteria");
		List<Client> clients = clientService.listWithCriteras(searchCriterias);
		if(clients.isEmpty()) {
			logger.error("List of clients is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Client>>(clients, HttpStatus.OK);
	}

	// -------------------Retrieve All Clients By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Client>> listAllByPage(Pageable pageable) {
		Page<Client> clients = clientService.listAllByPage(pageable);
		if (!clients.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Client>>(clients, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Clients With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list clients with criteria");
		Page<Client> clients = clientService.listWithCriteraByPage(searchCriteria, pageable);
		if(!clients.hasContent()) {
			logger.error("List of clients is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Client>>(clients, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Clients With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list clients with criteria");
		Page<Client> clients = clientService.listWithCriterasByPage(searchCriterias, pageable);
		if(!clients.hasContent()) {
			logger.error("List of clients is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Client>>(clients, HttpStatus.OK);
	}

	
	
}
