

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Accessscope;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.AccessscopeRepository;
import com.redsun.bimbuildapi.repository.specification.AccessscopeSpecification;
import com.redsun.bimbuildapi.repository.specification.AccessscopeSpecificationsBuilder;
import com.redsun.bimbuildapi.service.AccessscopeService;

@Service("accessscope")
@Transactional
public class AccessscopeServiceImpl implements AccessscopeService {
	
	@Autowired
	private AccessscopeRepository accessscopeRepository;
	
	@Autowired
	private AccessscopeSpecificationsBuilder accessscopeSpecificationsBuilder;

	@Override
	public Accessscope save(Accessscope accessscope) {
		return accessscopeRepository.save(accessscope);
	}

	@Override
	public Accessscope create(Accessscope accessscope) {
		return accessscopeRepository.save(accessscope);
	}

	@Override
	public Accessscope update(Integer id, Accessscope accessscope) {
		//Accessscope dbAccessscope = accessscopeRepository.findOne([Integer id]);
		//accessscopeRepository.save(dbAccessscope);
		return accessscopeRepository.save(accessscope);
	}

	@Override
	public void delete(Accessscope accessscope) {
		accessscopeRepository.delete(accessscope);
	}

	@Override
	public void deleteById(Integer id) {
		accessscopeRepository.delete(id);
	}

	@Override
	public Accessscope getById(Integer id) {
		return accessscopeRepository.findOne(id);
	}

	@Override
	public List<Accessscope> listAll() {
		return accessscopeRepository.findAll();
	}

	@Override
	public long countAll() {
		return accessscopeRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return accessscopeRepository.exists(id);
	}
	
	public List<Accessscope> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Accessscope> accessscopeSpecification = new AccessscopeSpecification(searchCriteria);
        List<Accessscope> result = accessscopeRepository.findAll(accessscopeSpecification);
        return result;
	}
	
	public List<Accessscope> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Accessscope> accessscopeSpecification = accessscopeSpecificationsBuilder.build(searchCriterias);
        List<Accessscope> result = accessscopeRepository.findAll(accessscopeSpecification);
        return result;
	}
	
	public Page<Accessscope> listAllByPage(Pageable pageable) {
		return accessscopeRepository.findAll(pageable);
	}
	
	public Page<Accessscope> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Accessscope> accessscopeSpecification = new AccessscopeSpecification(searchCriteria);
		Page<Accessscope> result = accessscopeRepository.findAll(accessscopeSpecification, pageable);
        return result;
	}
	
	public Page<Accessscope> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Accessscope> accessscopeSpecification = accessscopeSpecificationsBuilder.build(searchCriterias);
		Page<Accessscope> result = accessscopeRepository.findAll(accessscopeSpecification, pageable);
        return result;
	}

	public List<Map<String, Object>> listAccessscopeForSelect() {
		List<Map<String, Object>> result = accessscopeRepository.listAccessscopeForSelect();
		return result;
	}

}
