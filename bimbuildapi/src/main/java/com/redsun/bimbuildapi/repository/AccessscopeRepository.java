
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Accessscope ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessscopeRepository extends JpaRepository<Accessscope, Integer>, JpaSpecificationExecutor<Accessscope> {

	@Query(value = "SELECT new map (acs.id as id, acs.accesscode as accesscode) FROM Accessscope as acs WHERE acs.idle = 0")
	List<Map<String, Object>> listAccessscopeForSelect();

}
