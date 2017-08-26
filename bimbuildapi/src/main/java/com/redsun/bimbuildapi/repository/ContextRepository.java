
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Context ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface ContextRepository extends JpaRepository<Context, Integer>, JpaSpecificationExecutor<Context> {

	
}