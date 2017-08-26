
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Resource ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface ResourceRepository extends JpaRepository<Resource, Integer>, JpaSpecificationExecutor<Resource> {
	@Query(value = "SELECT new map(id as id, name as requestor) FROM Resource WHERE iscontact = 1")
	List<Map<String, Object>> listContactnameForSelect();
	@Query(value = "SELECT new map(id as id, name as responsible) FROM Resource WHERE isresource = 1")
	List<Map<String, Object>> listResponsiblenameForSelect();

}