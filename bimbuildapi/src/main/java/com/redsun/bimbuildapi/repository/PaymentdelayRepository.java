
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Paymentdelay ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface PaymentdelayRepository extends JpaRepository<Paymentdelay, Integer>, JpaSpecificationExecutor<Paymentdelay> {

@Query(value = "SELECT new map(ac.id as id, ac.name as payment, ac.endofmonth as endofmonth) FROM Paymentdelay as ac")
	List<Map<String, Object>> listPaymentdelayForSelect();
}