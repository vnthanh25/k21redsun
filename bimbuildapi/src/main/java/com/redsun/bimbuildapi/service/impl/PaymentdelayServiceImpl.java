

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Paymentdelay;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.PaymentdelayRepository;
import com.redsun.bimbuildapi.repository.specification.PaymentdelaySpecification;
import com.redsun.bimbuildapi.repository.specification.PaymentdelaySpecificationsBuilder;
import com.redsun.bimbuildapi.service.PaymentdelayService;

@Service("paymentdelay")
@Transactional
public class PaymentdelayServiceImpl implements PaymentdelayService {
	
	@Autowired
	private PaymentdelayRepository paymentdelayRepository;
	
	@Autowired
	private PaymentdelaySpecificationsBuilder paymentdelaySpecificationsBuilder;

	@Override
	public Paymentdelay save(Paymentdelay paymentdelay) {
		return paymentdelayRepository.save(paymentdelay);
	}

	@Override
	public Paymentdelay create(Paymentdelay paymentdelay) {
		return paymentdelayRepository.save(paymentdelay);
	}

	@Override
	public Paymentdelay update(Integer id, Paymentdelay paymentdelay) {
		//Paymentdelay dbPaymentdelay = paymentdelayRepository.findOne([Integer id]);
		//paymentdelayRepository.save(dbPaymentdelay);
		return paymentdelayRepository.save(paymentdelay);
	}

	@Override
	public void delete(Paymentdelay paymentdelay) {
		paymentdelayRepository.delete(paymentdelay);
	}

	@Override
	public void deleteById(Integer id) {
		paymentdelayRepository.delete(id);
	}

	@Override
	public Paymentdelay getById(Integer id) {
		return paymentdelayRepository.findOne(id);
	}

	@Override
	public List<Paymentdelay> listAll() {
		return paymentdelayRepository.findAll();
	}

	@Override
	public long countAll() {
		return paymentdelayRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return paymentdelayRepository.exists(id);
	}
	
	public List<Paymentdelay> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Paymentdelay> paymentdelaySpecification = new PaymentdelaySpecification(searchCriteria);
        List<Paymentdelay> result = paymentdelayRepository.findAll(paymentdelaySpecification);
        return result;
	}
	
	public List<Paymentdelay> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Paymentdelay> paymentdelaySpecification = paymentdelaySpecificationsBuilder.build(searchCriterias);
        List<Paymentdelay> result = paymentdelayRepository.findAll(paymentdelaySpecification);
        return result;
	}
	
	public Page<Paymentdelay> listAllByPage(Pageable pageable) {
		return paymentdelayRepository.findAll(pageable);
	}
	
	public Page<Paymentdelay> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Paymentdelay> paymentdelaySpecification = new PaymentdelaySpecification(searchCriteria);
		Page<Paymentdelay> result = paymentdelayRepository.findAll(paymentdelaySpecification, pageable);
        return result;
	}
	
	public Page<Paymentdelay> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Paymentdelay> paymentdelaySpecification = paymentdelaySpecificationsBuilder.build(searchCriterias);
		Page<Paymentdelay> result = paymentdelayRepository.findAll(paymentdelaySpecification, pageable);
        return result;
	}
	
	public List<Map<String, Object>> listPaymentdelayForSelect() {
		List<Map<String, Object>> result = paymentdelayRepository.listPaymentdelayForSelect();
		return result;
	}

	


}
