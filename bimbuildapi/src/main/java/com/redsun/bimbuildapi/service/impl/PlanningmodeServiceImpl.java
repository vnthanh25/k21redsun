

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Planningmode;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.PlanningmodeRepository;
import com.redsun.bimbuildapi.repository.specification.PlanningmodeSpecification;
import com.redsun.bimbuildapi.repository.specification.PlanningmodeSpecificationsBuilder;
import com.redsun.bimbuildapi.service.PlanningmodeService;

@Service("planningmode")
@Transactional
public class PlanningmodeServiceImpl implements PlanningmodeService {
	
	@Autowired
	private PlanningmodeRepository planningmodeRepository;
	
	@Autowired
	private PlanningmodeSpecificationsBuilder planningmodeSpecificationsBuilder;

	@Override
	public Planningmode save(Planningmode planningmode) {
		return planningmodeRepository.save(planningmode);
	}

	@Override
	public Planningmode create(Planningmode planningmode) {
		return planningmodeRepository.save(planningmode);
	}

	@Override
	public Planningmode update(Integer id, Planningmode planningmode) {
		//Planningmode dbPlanningmode = planningmodeRepository.findOne([Integer id]);
		//planningmodeRepository.save(dbPlanningmode);
		return planningmodeRepository.save(planningmode);
	}

	@Override
	public void delete(Planningmode planningmode) {
		planningmodeRepository.delete(planningmode);
	}

	@Override
	public void deleteById(Integer id) {
		planningmodeRepository.delete(id);
	}

	@Override
	public Planningmode getById(Integer id) {
		return planningmodeRepository.findOne(id);
	}

	@Override
	public List<Planningmode> listAll() {
		return planningmodeRepository.findAll();
	}

	@Override
	public long countAll() {
		return planningmodeRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return planningmodeRepository.exists(id);
	}
	
	public List<Planningmode> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Planningmode> planningmodeSpecification = new PlanningmodeSpecification(searchCriteria);
        List<Planningmode> result = planningmodeRepository.findAll(planningmodeSpecification);
        return result;
	}
	
	public List<Planningmode> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Planningmode> planningmodeSpecification = planningmodeSpecificationsBuilder.build(searchCriterias);
        List<Planningmode> result = planningmodeRepository.findAll(planningmodeSpecification);
        return result;
	}
	
	public Page<Planningmode> listAllByPage(Pageable pageable) {
		return planningmodeRepository.findAll(pageable);
	}
	
	public Page<Planningmode> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Planningmode> planningmodeSpecification = new PlanningmodeSpecification(searchCriteria);
		Page<Planningmode> result = planningmodeRepository.findAll(planningmodeSpecification, pageable);
        return result;
	}
	
	public Page<Planningmode> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Planningmode> planningmodeSpecification = planningmodeSpecificationsBuilder.build(searchCriterias);
		Page<Planningmode> result = planningmodeRepository.findAll(planningmodeSpecification, pageable);
        return result;
	}
	
	public List<Map<String, Object>> listPlanningmodeForSelect() {
		List<Map<String, Object>> result = planningmodeRepository.listPlanningmodeForSelect();
		return result;
	}

}
