

package com.redsun.bimbuildapi.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Activity;
import com.redsun.bimbuildapi.model.Planningelement;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.ActivityRepository;
import com.redsun.bimbuildapi.repository.PlanningelementRepository;
import com.redsun.bimbuildapi.repository.specification.ActivitySpecification;
import com.redsun.bimbuildapi.repository.specification.ActivitySpecificationsBuilder;
import com.redsun.bimbuildapi.service.ActivityService;

@Service("activity")
@Transactional
public class ActivityServiceImpl implements ActivityService {
	
	@Autowired
	private ActivityRepository activityRepository;
	
	@Autowired
	private PlanningelementRepository planningelementRepository;
	
	@Autowired
	private ActivitySpecificationsBuilder activitySpecificationsBuilder;

	@Override
	public Activity save(Activity activity) {
		return activityRepository.save(activity);
	}

	@Override
	public Activity create(Activity activity) {
		return activityRepository.save(activity);
	}

	@Override
	public Activity update(Integer id, Activity activity) {
		//Activity dbActivity = activityRepository.findOne([Integer id]);
		//activityRepository.save(dbActivity);
		return activityRepository.save(activity);
	}

	@Override
	public void delete(Activity activity) {
		activityRepository.delete(activity);
	}

	@Override
	public void deleteById(Integer id) {
		activityRepository.delete(id);
	}

	@Override
	public Activity getById(Integer id) {
		return activityRepository.findOne(id);
	}

	@Override
	public List<Activity> listAll() {
		return activityRepository.findAll();
	}

	@Override
	public long countAll() {
		return activityRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return activityRepository.exists(id);
	}
	
	public Map<String, Object> createActivityWithPlanning(Activity activity, Planningelement planningelement) {
		Map<String, Object> result = new HashMap<String, Object>();
		Activity act = activityRepository.save(activity);
		Planningelement plan = planningelementRepository.save(planningelement);
		
		result.put("idactivity", act.getId());
		result.put("idplanningelement", plan.getId());
		
		return result;
	}
	
	public List<Activity> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Activity> activitySpecification = new ActivitySpecification(searchCriteria);
        List<Activity> result = activityRepository.findAll(activitySpecification);
        return result;
	}
	
	public List<Activity> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Activity> activitySpecification = activitySpecificationsBuilder.build(searchCriterias);
        List<Activity> result = activityRepository.findAll(activitySpecification);
        return result;
	}
	
	public Page<Activity> listAllByPage(Pageable pageable) {
		return activityRepository.findAll(pageable);
	}
	
	public Page<Activity> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Activity> activitySpecification = new ActivitySpecification(searchCriteria);
		Page<Activity> result = activityRepository.findAll(activitySpecification, pageable);
        return result;
	}
	
	public Page<Activity> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Activity> activitySpecification = activitySpecificationsBuilder.build(searchCriterias);
		Page<Activity> result = activityRepository.findAll(activitySpecification, pageable);
        return result;
	}

	public List<Map<String, Object>> listParentactivityForSelect() {
		List<Map<String, Object>> result = activityRepository.listParentactivityForSelect();
		return result;
	}
}
