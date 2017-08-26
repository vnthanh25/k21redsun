
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Activity ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface ActivityRepository extends JpaRepository<Activity, Integer>, JpaSpecificationExecutor<Activity> {
	@Query(value="SELECT new map(id as id, name as parentactivity) FROM Activity")
		List<Map<String, Object>> listParentactivityForSelect();
		
}