
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Status ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface StatusRepository extends JpaRepository<Status, Integer>, JpaSpecificationExecutor<Status> {
	@Query(value="SELECT new map(id as id, name as status) FROM Status WHERE idle = 0")
		List<Map<String, Object>> listStatusForSelect();

}