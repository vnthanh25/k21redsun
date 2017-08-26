
package com.redsun.bimbuildapi.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.redsun.bimbuildapi.model.Project;
import com.redsun.bimbuildapi.model.common.SearchCriteria;

public interface ProjectService {

	/**
	 * Saves (create or update) the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param project
	 * @return
	 */
	Project save(Project project);

	/**
	 * Create the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param project
	 * @return
	 */
	Project create(Project project);

	/**
	 * Update the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param project
	 * @return
	 */
	Project update(Integer id, Project project);

	/**
	 * Deletes the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param project
	 * @return true if found and deleted, false if not found
	 */
	void delete(Project project);

	/**
	 * Deletes the entity by its Primary Key <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param id
	 * @return true if found and deleted, false if not found
	 */
	void deleteById(Integer id);

	/**
	 * Loads the entity for the given Primary Key <br>
	 * @param id
	 * @return the entity loaded (or null if not found)
	 */
	Project getById(Integer id);

	/**
	 * Loads ALL the entities (use with caution)
	 * @return
	 */
	List<Project> listAll();

	/**
	 * Count all the occurrences
	 * @return
	 */
	long countAll();

	/**
	 * Check exist
	 * @return
	 */
	boolean isExist(Integer id);

	/**
	 * Search by a criteria.
	 * @return
	 */
	List<Project> listWithCritera(SearchCriteria searchCriteria);

	/**
	 * Search by multiple criteria.
	 * @return
	 */
	List<Project> listWithCriteras(List<SearchCriteria> searchCriterias);

	/**
	 * Loads ALL the entities by page (use with caution)
	 * @return
	 */
	Page<Project> listAllByPage(Pageable pageable);

	/**
	 * Search by a criteria by page.
	 * @return
	 */
	Page<Project> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable);

	/**
	 * Search by multiple criteria by page.
	 * @return
	 */
	Page<Project> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable);
	
	/**
	 * Search by multiple criteria by page.
	 * @return
	 */
	List<Map<String, Object>> listProjectnameForSelect();
}