

package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Checklistline ;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;



@Repository
public interface ChecklistlineRepository extends JpaRepository<Checklistline, Integer>, JpaSpecificationExecutor<Checklistline> {


}