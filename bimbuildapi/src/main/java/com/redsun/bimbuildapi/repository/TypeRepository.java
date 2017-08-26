
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Type ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface TypeRepository extends JpaRepository<Type, Integer>, JpaSpecificationExecutor<Type> {
	@Query(value = "SELECT new map(acs.id as id, acs.name as typecustomer) FROM Type as acs WHERE acs.id IN (97,98)")
	List<Map<String, Object>> listCustomerForSelect();
	@Query(value = "SELECT new map(id as id, name as activityname) FROM Type WHERE scope = 'Activity'")
	List<Map<String, Object>> listActivitytypeForSelect();
}