
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Project ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer>, JpaSpecificationExecutor<Project> {
	@Query(value = "SELECT new map(id as id, name as projectname) FROM Project")
	List<Map<String, Object>> listProjectnameForSelect();

}