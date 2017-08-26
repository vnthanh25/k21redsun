

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Accessprofile;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.AccessprofileRepository;
import com.redsun.bimbuildapi.repository.specification.AccessprofileSpecification;
import com.redsun.bimbuildapi.repository.specification.AccessprofileSpecificationsBuilder;
import com.redsun.bimbuildapi.service.AccessprofileService;

@Service("accessprofile")
@Transactional
public class AccessprofileServiceImpl implements AccessprofileService {
	
	@Autowired
	private AccessprofileRepository accessprofileRepository;
	
	@Autowired
	private AccessprofileSpecificationsBuilder accessprofileSpecificationsBuilder;

	@Override
	public Accessprofile save(Accessprofile accessprofile) {
		return accessprofileRepository.save(accessprofile);
	}

	@Override
	public Accessprofile create(Accessprofile accessprofile) {
		return accessprofileRepository.save(accessprofile);
	}

	@Override
	public Accessprofile update(Integer id, Accessprofile accessprofile) {
		//Accessprofile dbAccessprofile = accessprofileRepository.findOne([Integer id]);
		//accessprofileRepository.save(dbAccessprofile);
		return accessprofileRepository.save(accessprofile);
	}

	@Override
	public void delete(Accessprofile accessprofile) {
		accessprofileRepository.delete(accessprofile);
	}

	@Override
	public void deleteById(Integer id) {
		accessprofileRepository.delete(id);
	}

	@Override
	public Accessprofile getById(Integer id) {
		return accessprofileRepository.findOne(id);
	}

	@Override
	public List<Accessprofile> listAll() {
		return accessprofileRepository.findAll();
	}

	@Override
	public long countAll() {
		return accessprofileRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return accessprofileRepository.exists(id);
	}
	
	public List<Accessprofile> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Accessprofile> accessprofileSpecification = new AccessprofileSpecification(searchCriteria);
        List<Accessprofile> result = accessprofileRepository.findAll(accessprofileSpecification);
        return result;
	}
	
	public List<Accessprofile> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Accessprofile> accessprofileSpecification = accessprofileSpecificationsBuilder.build(searchCriterias);
        List<Accessprofile> result = accessprofileRepository.findAll(accessprofileSpecification);
        return result;
	}
	
	public Page<Accessprofile> listAllByPage(Pageable pageable) {
		return accessprofileRepository.findAll(pageable);
	}
	
	public Page<Accessprofile> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Accessprofile> accessprofileSpecification = new AccessprofileSpecification(searchCriteria);
		Page<Accessprofile> result = accessprofileRepository.findAll(accessprofileSpecification, pageable);
        return result;
	}
	
	public Page<Accessprofile> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Accessprofile> accessprofileSpecification = accessprofileSpecificationsBuilder.build(searchCriterias);
		Page<Accessprofile> result = accessprofileRepository.findAll(accessprofileSpecification, pageable);
        return result;
	}

	public List<Map<String, Object>> listAccessprofileForSelect() {
		List<Map<String, Object>> result = accessprofileRepository.listAccessprofileForSelect();
        return result;
	}

}
