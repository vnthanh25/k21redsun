
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Planningmode ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface PlanningmodeRepository extends JpaRepository<Planningmode, Integer>, JpaSpecificationExecutor<Planningmode> {

@Query(value="SELECT new map(plm.id as id, plm.name as planningname, plm.code as planningcode) FROM Planningmode as plm WHERE plm.applyto = 'Activity'")
	List<Map<String, Object>> listPlanningmodeForSelect();
}