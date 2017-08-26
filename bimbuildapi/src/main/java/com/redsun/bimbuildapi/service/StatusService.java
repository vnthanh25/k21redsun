
package com.redsun.bimbuildapi.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.redsun.bimbuildapi.model.Status;
import com.redsun.bimbuildapi.model.common.SearchCriteria;

public interface StatusService {

	/**
	 * Saves (create or update) the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param status
	 * @return
	 */
	Status save(Status status);

	/**
	 * Create the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param status
	 * @return
	 */
	Status create(Status status);

	/**
	 * Update the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param status
	 * @return
	 */
	Status update(Integer id, Status status);

	/**
	 * Deletes the given entity <br>
	 * Transactional operation ( begin transaction and commit )
	 * @param status
	 * @return true if found and deleted, false if not found
	 */
	void delete(Status status);

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
	Status getById(Integer id);

	/**
	 * Loads ALL the entities (use with caution)
	 * @return
	 */
	List<Status> listAll();

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
	List<Status> listWithCritera(SearchCriteria searchCriteria);

	/**
	 * Search by multiple criteria.
	 * @return
	 */
	List<Status> listWithCriteras(List<SearchCriteria> searchCriterias);

	/**
	 * Loads ALL the entities by page (use with caution)
	 * @return
	 */
	Page<Status> listAllByPage(Pageable pageable);

	/**
	 * Search by a criteria by page.
	 * @return
	 */
	Page<Status> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable);

	/**
	 * Search by multiple criteria by page.
	 * @return
	 */
	Page<Status> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable);

	/**
	 * Search by multiple criteria by page.
	 * @return
	 */

	List<Map<String, Object>> listStatusForSelect();

}
