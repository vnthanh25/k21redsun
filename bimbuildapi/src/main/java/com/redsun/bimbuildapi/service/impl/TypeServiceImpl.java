

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Type;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.TypeRepository;
import com.redsun.bimbuildapi.repository.specification.TypeSpecification;
import com.redsun.bimbuildapi.repository.specification.TypeSpecificationsBuilder;
import com.redsun.bimbuildapi.service.TypeService;

@Service("type")
@Transactional
public class TypeServiceImpl implements TypeService {
	
	@Autowired
	private TypeRepository typeRepository;
	
	@Autowired
	private TypeSpecificationsBuilder typeSpecificationsBuilder;

	@Override
	public Type save(Type type) {
		return typeRepository.save(type);
	}

	@Override
	public Type create(Type type) {
		return typeRepository.save(type);
	}

	@Override
	public Type update(Integer id, Type type) {
		//Type dbType = typeRepository.findOne([Integer id]);
		//typeRepository.save(dbType);
		return typeRepository.save(type);
	}

	@Override
	public void delete(Type type) {
		typeRepository.delete(type);
	}

	@Override
	public void deleteById(Integer id) {
		typeRepository.delete(id);
	}

	@Override
	public Type getById(Integer id) {
		return typeRepository.findOne(id);
	}

	@Override
	public List<Type> listAll() {
		return typeRepository.findAll();
	}

	@Override
	public long countAll() {
		return typeRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return typeRepository.exists(id);
	}
	
	public List<Type> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Type> typeSpecification = new TypeSpecification(searchCriteria);
        List<Type> result = typeRepository.findAll(typeSpecification);
        return result;
	}
	
	public List<Type> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Type> typeSpecification = typeSpecificationsBuilder.build(searchCriterias);
        List<Type> result = typeRepository.findAll(typeSpecification);
        return result;
	}
	
	public Page<Type> listAllByPage(Pageable pageable) {
		return typeRepository.findAll(pageable);
	}
	
	public Page<Type> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Type> typeSpecification = new TypeSpecification(searchCriteria);
		Page<Type> result = typeRepository.findAll(typeSpecification, pageable);
        return result;
	}
	
	public Page<Type> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Type> typeSpecification = typeSpecificationsBuilder.build(searchCriterias);
		Page<Type> result = typeRepository.findAll(typeSpecification, pageable);
        return result;
	}
	
	public List<Map<String, Object>> listCustomerForSelect() {
		List<Map<String, Object>> result = typeRepository.listCustomerForSelect();
		return result;
	}
	
	public List<Map<String, Object>> listActivitytypeForSelect() {
		List<Map<String, Object>> result = typeRepository.listActivitytypeForSelect();
		return result;
	}


}
