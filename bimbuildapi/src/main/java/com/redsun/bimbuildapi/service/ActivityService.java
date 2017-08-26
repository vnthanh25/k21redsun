
package com.redsun.bimbuildapi.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.redsun.bimbuildapi.model.Activity;
import com.redsun.bimbuildapi.model.Planningelement;
import com.redsun.bimbuildapi.model.common.SearchCriteria;

public interface ActivityService {

	/**
	 * Saves (create or update) the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param activity
	 * @return
	 */
	Activity save(Activity activity);

	/**
	 * Create the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param activity
	 * @return
	 */
	Activity create(Activity activity);
	

	/**
	 * Update the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param activity
	 * @return
	 */
	Activity update(Integer id, Activity activity);

	/**
	 * Deletes the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param activity
	 * @return true if found and deleted, false if not found
	 */
	void delete(Activity activity);

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
	Activity getById(Integer id);

	/**
	 * Loads ALL the entities (use with caution)
	 * @return
	 */
	List<Activity> listAll();

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
	 * Create the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param activity
	 * @return
	 */
	Map<String, Object> createActivityWithPlanning(Activity activity, Planningelement planningelement);

	
	/**






	/**
	 * Search by a criteria.
	 * @return
	 */
	List<Activity> listWithCritera(SearchCriteria searchCriteria);

	/**
	 * Search by multiple criteria.
	 * @return
	 */
	List<Activity> listWithCriteras(List<SearchCriteria> searchCriterias);

	/**
	 * Loads ALL the entities by page (use with caution)
	 * @return
	 */
	Page<Activity> listAllByPage(Pageable pageable);

	/**
	 * Search by a criteria by page.
	 * @return
	 */
	Page<Activity> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable);

	/**
	 * Search by multiple criteria by page.
	 * @return
	 */
	Page<Activity> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable);

	/**
	 * Search by multiple criteria by page.
	 * @return
	 */
	List<Map<String, Object>> listParentactivityForSelect();
}
