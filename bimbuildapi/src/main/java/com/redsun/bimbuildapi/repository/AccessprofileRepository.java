
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Accessprofile ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface AccessprofileRepository extends JpaRepository<Accessprofile, Integer>, JpaSpecificationExecutor<Accessprofile> {

	@Query(value = "SELECT new map (acc.id as id, acc.name as name) FROM Accessprofile as acc WHERE acc.idle = 0")
	List<Map<String, Object>> listAccessprofileForSelect();

}