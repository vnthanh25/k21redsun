

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Status;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.StatusRepository;
import com.redsun.bimbuildapi.repository.specification.StatusSpecification;
import com.redsun.bimbuildapi.repository.specification.StatusSpecificationsBuilder;
import com.redsun.bimbuildapi.service.StatusService;

@Service("status")
@Transactional
public class StatusServiceImpl implements StatusService {
	
	@Autowired
	private StatusRepository statusRepository;
	
	@Autowired
	private StatusSpecificationsBuilder statusSpecificationsBuilder;

	@Override
	public Status save(Status status) {
		return statusRepository.save(status);
	}

	@Override
	public Status create(Status status) {
		return statusRepository.save(status);
	}

	@Override
	public Status update(Integer id, Status status) {
		//Status dbStatus = statusRepository.findOne([Integer id]);
		//statusRepository.save(dbStatus);
		return statusRepository.save(status);
	}

	@Override
	public void delete(Status status) {
		statusRepository.delete(status);
	}

	@Override
	public void deleteById(Integer id) {
		statusRepository.delete(id);
	}

	@Override
	public Status getById(Integer id) {
		return statusRepository.findOne(id);
	}

	@Override
	public List<Status> listAll() {
		return statusRepository.findAll();
	}

	@Override
	public long countAll() {
		return statusRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return statusRepository.exists(id);
	}
	
	public List<Status> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Status> statusSpecification = new StatusSpecification(searchCriteria);
        List<Status> result = statusRepository.findAll(statusSpecification);
        return result;
	}
	
	public List<Status> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Status> statusSpecification = statusSpecificationsBuilder.build(searchCriterias);
        List<Status> result = statusRepository.findAll(statusSpecification);
        return result;
	}
	
	public Page<Status> listAllByPage(Pageable pageable) {
		return statusRepository.findAll(pageable);
	}
	
	public Page<Status> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Status> statusSpecification = new StatusSpecification(searchCriteria);
		Page<Status> result = statusRepository.findAll(statusSpecification, pageable);
        return result;
	}
	
	public Page<Status> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Status> statusSpecification = statusSpecificationsBuilder.build(searchCriterias);
		Page<Status> result = statusRepository.findAll(statusSpecification, pageable);
        return result;
	}
	
	public 	List<Map<String, Object>> listStatusForSelect() {
		List<Map<String, Object>> result = statusRepository.listStatusForSelect();
		return result;
	}

}
