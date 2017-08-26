
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Linkable ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface LinkableRepository extends JpaRepository<Linkable, Integer>, JpaSpecificationExecutor<Linkable> {
	@Query(value="SELECT new map(id as id, name as linkname) FROM Linkable")
		List<Map<String, Object>> listLinknameForSelect();

}