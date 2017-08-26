

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Resource;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.ResourceRepository;
import com.redsun.bimbuildapi.repository.specification.ResourceSpecification;
import com.redsun.bimbuildapi.repository.specification.ResourceSpecificationsBuilder;
import com.redsun.bimbuildapi.service.ResourceService;

@Service("resource")
@Transactional
public class ResourceServiceImpl implements ResourceService {
	
	@Autowired
	private ResourceRepository resourceRepository;
	
	@Autowired
	private ResourceSpecificationsBuilder resourceSpecificationsBuilder;

	@Override
	public Resource save(Resource resource) {
		return resourceRepository.save(resource);
	}

	@Override
	public Resource create(Resource resource) {
		return resourceRepository.save(resource);
	}

	@Override
	public Resource update(Integer id, Resource resource) {
		//Resource dbResource = resourceRepository.findOne([Integer id]);
		//resourceRepository.save(dbResource);
		return resourceRepository.save(resource);
	}

	@Override
	public void delete(Resource resource) {
		resourceRepository.delete(resource);
	}

	@Override
	public void deleteById(Integer id) {
		resourceRepository.delete(id);
	}

	@Override
	public Resource getById(Integer id) {
		return resourceRepository.findOne(id);
	}

	@Override
	public List<Resource> listAll() {
		return resourceRepository.findAll();
	}

	@Override
	public long countAll() {
		return resourceRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return resourceRepository.exists(id);
	}
	
	public List<Resource> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Resource> resourceSpecification = new ResourceSpecification(searchCriteria);
        List<Resource> result = resourceRepository.findAll(resourceSpecification);
        return result;
	}
	
	public List<Resource> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Resource> resourceSpecification = resourceSpecificationsBuilder.build(searchCriterias);
        List<Resource> result = resourceRepository.findAll(resourceSpecification);
        return result;
	}
	
	public Page<Resource> listAllByPage(Pageable pageable) {
		return resourceRepository.findAll(pageable);
	}
	
	public Page<Resource> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Resource> resourceSpecification = new ResourceSpecification(searchCriteria);
		Page<Resource> result = resourceRepository.findAll(resourceSpecification, pageable);
        return result;
	}
	
	public Page<Resource> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Resource> resourceSpecification = resourceSpecificationsBuilder.build(searchCriterias);
		Page<Resource> result = resourceRepository.findAll(resourceSpecification, pageable);
        return result;
	}
	
	public List<Map<String, Object>> listContactnameForSelect() {
		List<Map<String, Object>> result = resourceRepository.listContactnameForSelect();
		return result;
	}
	
	public List<Map<String, Object>> listResponsiblenameForSelect() {
		List<Map<String, Object>> result = resourceRepository.listResponsiblenameForSelect();
		return result;
	}

}
