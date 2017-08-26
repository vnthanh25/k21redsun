

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Project;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.ProjectRepository;
import com.redsun.bimbuildapi.repository.specification.ProjectSpecification;
import com.redsun.bimbuildapi.repository.specification.ProjectSpecificationsBuilder;
import com.redsun.bimbuildapi.service.ProjectService;

@Service("project")
@Transactional
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private ProjectSpecificationsBuilder projectSpecificationsBuilder;

	@Override
	public Project save(Project project) {
		return projectRepository.save(project);
	}

	@Override
	public Project create(Project project) {
		return projectRepository.save(project);
	}

	@Override
	public Project update(Integer id, Project project) {
		//Project dbProject = projectRepository.findOne([Integer id]);
		//projectRepository.save(dbProject);
		return projectRepository.save(project);
	}

	@Override
	public void delete(Project project) {
		projectRepository.delete(project);
	}

	@Override
	public void deleteById(Integer id) {
		projectRepository.delete(id);
	}

	@Override
	public Project getById(Integer id) {
		return projectRepository.findOne(id);
	}

	@Override
	public List<Project> listAll() {
		return projectRepository.findAll();
	}

	@Override
	public long countAll() {
		return projectRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return projectRepository.exists(id);
	}
	
	public List<Project> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Project> projectSpecification = new ProjectSpecification(searchCriteria);
        List<Project> result = projectRepository.findAll(projectSpecification);
        return result;
	}
	
	public List<Project> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Project> projectSpecification = projectSpecificationsBuilder.build(searchCriterias);
        List<Project> result = projectRepository.findAll(projectSpecification);
        return result;
	}
	
	public Page<Project> listAllByPage(Pageable pageable) {
		return projectRepository.findAll(pageable);
	}
	
	public Page<Project> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Project> projectSpecification = new ProjectSpecification(searchCriteria);
		Page<Project> result = projectRepository.findAll(projectSpecification, pageable);
        return result;
	}
	
	public Page<Project> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Project> projectSpecification = projectSpecificationsBuilder.build(searchCriterias);
		Page<Project> result = projectRepository.findAll(projectSpecification, pageable);
        return result;
	}
	
	public List<Map<String, Object>> listProjectnameForSelect() {
		List<Map<String, Object>> result = projectRepository.listProjectnameForSelect();
		return result;
	}

}
