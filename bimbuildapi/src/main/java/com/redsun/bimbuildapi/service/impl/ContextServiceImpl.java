

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Context;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.ContextRepository;
import com.redsun.bimbuildapi.repository.specification.ContextSpecification;
import com.redsun.bimbuildapi.repository.specification.ContextSpecificationsBuilder;
import com.redsun.bimbuildapi.service.ContextService;

@Service("context")
@Transactional
public class ContextServiceImpl implements ContextService {
	
	@Autowired
	private ContextRepository contextRepository;
	
	@Autowired
	private ContextSpecificationsBuilder contextSpecificationsBuilder;

	@Override
	public Context save(Context context) {
		return contextRepository.save(context);
	}

	@Override
	public Context create(Context context) {
		return contextRepository.save(context);
	}

	@Override
	public Context update(Integer id, Context context) {
		//Context dbContext = contextRepository.findOne([Integer id]);
		//contextRepository.save(dbContext);
		return contextRepository.save(context);
	}

	@Override
	public void delete(Context context) {
		contextRepository.delete(context);
	}

	@Override
	public void deleteById(Integer id) {
		contextRepository.delete(id);
	}

	@Override
	public Context getById(Integer id) {
		return contextRepository.findOne(id);
	}

	@Override
	public List<Context> listAll() {
		return contextRepository.findAll();
	}

	@Override
	public long countAll() {
		return contextRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return contextRepository.exists(id);
	}
	
	public List<Context> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Context> contextSpecification = new ContextSpecification(searchCriteria);
        List<Context> result = contextRepository.findAll(contextSpecification);
        return result;
	}
	
	public List<Context> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Context> contextSpecification = contextSpecificationsBuilder.build(searchCriterias);
        List<Context> result = contextRepository.findAll(contextSpecification);
        return result;
	}
	
	public Page<Context> listAllByPage(Pageable pageable) {
		return contextRepository.findAll(pageable);
	}
	
	public Page<Context> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Context> contextSpecification = new ContextSpecification(searchCriteria);
		Page<Context> result = contextRepository.findAll(contextSpecification, pageable);
        return result;
	}
	
	public Page<Context> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Context> contextSpecification = contextSpecificationsBuilder.build(searchCriterias);
		Page<Context> result = contextRepository.findAll(contextSpecification, pageable);
        return result;
	}

}
