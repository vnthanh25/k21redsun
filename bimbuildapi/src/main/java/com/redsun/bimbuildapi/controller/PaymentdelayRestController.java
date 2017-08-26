
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

import com.redsun.bimbuildapi.model.Paymentdelay;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.service.PaymentdelayService;
import com.redsun.bimbuildapi.util.CustomErrorType;

@RestController
@RequestMapping("/paymentdelay")
public class PaymentdelayRestController {

	public static final Logger logger = LoggerFactory.getLogger(PaymentdelayRestController.class);

	@Autowired
	PaymentdelayService paymentdelayService; //Service which will do all data retrieval/manipulation work

	// -------------------Create a Paymentdelay-------------------------------------------

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<?> create(@RequestBody Paymentdelay paymentdelay, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Paymentdelay : {}", paymentdelay);
		Paymentdelay result = paymentdelayService.save(paymentdelay);
		// return.
		return new ResponseEntity<Paymentdelay>(result, HttpStatus.CREATED);
	}

	// -------------------Update a Paymentdelay------------------------------------------------

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Paymentdelay paymentdelay) {
		logger.info("Updating Paymentdelay with id {}", id);
		Paymentdelay result = paymentdelayService.save(paymentdelay);
		// return.
		return new ResponseEntity<Paymentdelay>(result, HttpStatus.OK);
	}

	// -------------------Delete a Paymentdelay-----------------------------------------

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
		logger.info("Fetching & Deleting Paymentdelay with id {}", id);
		paymentdelayService.deleteById(id);
		// return.	
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	// -------------------Retrieve All Paymentdelays---------------------------------------------

	@RequestMapping(value = "/listAll", method = RequestMethod.GET)
	public ResponseEntity<List<Paymentdelay>> listAll() {
		List<Paymentdelay> paymentdelays = paymentdelayService.listAll();
		if (paymentdelays.isEmpty()) {
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<List<Paymentdelay>>(paymentdelays, HttpStatus.OK);
	}

	// -------------------Retrieve Single Paymentdelay------------------------------------------

	@RequestMapping(value = "/getById/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
		logger.info("Fetching Paymentdelay with id {}", id);
		Paymentdelay paymentdelay = paymentdelayService.getById(id);
		if (paymentdelay == null) {
			logger.error("Paymentdelay with id {} not found.", id);
			// return.
			return new ResponseEntity<CustomErrorType>(new CustomErrorType("Paymentdelay with id " + id 
					+ " not found"), HttpStatus.NOT_FOUND);
		}
		// return.
		return new ResponseEntity<Paymentdelay>(paymentdelay, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Paymentdelays With A Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriteria", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteria(@RequestBody SearchCriteria searchCriteria) {
		logger.info("Fetching list paymentdelays with criteria");
		List<Paymentdelay> paymentdelays = paymentdelayService.listWithCritera(searchCriteria);
		if(paymentdelays.isEmpty()) {
			logger.error("List of paymentdelays is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Paymentdelay>>(paymentdelays, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Paymentdelays With Many Criteria------------------------------------------
	
	@RequestMapping(value = "/listWithCriterias", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriterias(@RequestBody List<SearchCriteria> searchCriterias) {
		logger.info("Fetching list paymentdelays with criteria");
		List<Paymentdelay> paymentdelays = paymentdelayService.listWithCriteras(searchCriterias);
		if(paymentdelays.isEmpty()) {
			logger.error("List of paymentdelays is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Paymentdelay>>(paymentdelays, HttpStatus.OK);
	}

	// -------------------Retrieve All Paymentdelays By Page---------------------------------------------

	@RequestMapping(value = "/listAllByPage", method = RequestMethod.GET)
	public ResponseEntity<Page<Paymentdelay>> listAllByPage(Pageable pageable) {
		Page<Paymentdelay> paymentdelays = paymentdelayService.listAllByPage(pageable);
		if (!paymentdelays.hasContent()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		// return.
		return new ResponseEntity<Page<Paymentdelay>>(paymentdelays, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Paymentdelays With A Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriaByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriaByPage(@RequestBody SearchCriteria searchCriteria, Pageable pageable) {
		logger.info("Fetching list paymentdelays with criteria");
		Page<Paymentdelay> paymentdelays = paymentdelayService.listWithCriteraByPage(searchCriteria, pageable);
		if(!paymentdelays.hasContent()) {
			logger.error("List of paymentdelays is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Paymentdelay>>(paymentdelays, HttpStatus.OK);
	}
	
	// -------------------Retrieve List Of Paymentdelays With Multiple Criteria By Page------------------------------------------
	
	@RequestMapping(value = "/listWithCriteriasByPage", method = RequestMethod.POST)
	public ResponseEntity<?> listWithCriteriasByPage(@RequestBody List<SearchCriteria> searchCriterias, Pageable pageable) {
		logger.info("Fetching list paymentdelays with criteria");
		Page<Paymentdelay> paymentdelays = paymentdelayService.listWithCriterasByPage(searchCriterias, pageable);
		if(!paymentdelays.hasContent()) {
			logger.error("List of paymentdelays is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<Page<Paymentdelay>>(paymentdelays, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/listPaymentdelayForSelect", method = RequestMethod.GET)
	public ResponseEntity<?> listPaymentdelayForSelect() {
		logger.info("Fetching list paymentdelays with criteria");
		List<Map<String, Object>> result = paymentdelayService.listPaymentdelayForSelect();
		if(result.isEmpty()) {
			logger.error("List of paymentdelays is empty.");
			// return.
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		// return.
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}

}
