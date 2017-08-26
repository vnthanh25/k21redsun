
package com.redsun.bimbuildapi.repository;

import com.redsun.bimbuildapi.model.Payment ;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer>, JpaSpecificationExecutor<Payment> {

	@Query(value = "SELECT new map(id, name as payment) FROM Paymentdelay")
	List<Map<String, Object>> listPaymentdelay();
}
