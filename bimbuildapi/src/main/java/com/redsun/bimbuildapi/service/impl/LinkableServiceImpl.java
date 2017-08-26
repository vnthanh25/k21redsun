

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Linkable;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.LinkableRepository;
import com.redsun.bimbuildapi.repository.specification.LinkableSpecification;
import com.redsun.bimbuildapi.repository.specification.LinkableSpecificationsBuilder;
import com.redsun.bimbuildapi.service.LinkableService;

@Service("linkable")
@Transactional
public class LinkableServiceImpl implements LinkableService {
	
	@Autowired
	private LinkableRepository linkableRepository;
	
	@Autowired
	private LinkableSpecificationsBuilder linkableSpecificationsBuilder;

	@Override
	public Linkable save(Linkable linkable) {
		return linkableRepository.save(linkable);
	}

	@Override
	public Linkable create(Linkable linkable) {
		return linkableRepository.save(linkable);
	}

	@Override
	public Linkable update(Integer id, Linkable linkable) {
		//Linkable dbLinkable = linkableRepository.findOne([Integer id]);
		//linkableRepository.save(dbLinkable);
		return linkableRepository.save(linkable);
	}

	@Override
	public void delete(Linkable linkable) {
		linkableRepository.delete(linkable);
	}

	@Override
	public void deleteById(Integer id) {
		linkableRepository.delete(id);
	}

	@Override
	public Linkable getById(Integer id) {
		return linkableRepository.findOne(id);
	}

	@Override
	public List<Linkable> listAll() {
		return linkableRepository.findAll();
	}

	@Override
	public long countAll() {
		return linkableRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return linkableRepository.exists(id);
	}
	
	public List<Linkable> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Linkable> linkableSpecification = new LinkableSpecification(searchCriteria);
        List<Linkable> result = linkableRepository.findAll(linkableSpecification);
        return result;
	}
	
	public List<Linkable> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Linkable> linkableSpecification = linkableSpecificationsBuilder.build(searchCriterias);
        List<Linkable> result = linkableRepository.findAll(linkableSpecification);
        return result;
	}
	
	public Page<Linkable> listAllByPage(Pageable pageable) {
		return linkableRepository.findAll(pageable);
	}
	
	public Page<Linkable> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Linkable> linkableSpecification = new LinkableSpecification(searchCriteria);
		Page<Linkable> result = linkableRepository.findAll(linkableSpecification, pageable);
        return result;
	}
	
	public Page<Linkable> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Linkable> linkableSpecification = linkableSpecificationsBuilder.build(searchCriterias);
		Page<Linkable> result = linkableRepository.findAll(linkableSpecification, pageable);
        return result;
	}
	
	public List<Map<String, Object>> listLinknameForSelect() {
		List<Map<String, Object>> result = linkableRepository.listLinknameForSelect();
		return result;
	}

}
