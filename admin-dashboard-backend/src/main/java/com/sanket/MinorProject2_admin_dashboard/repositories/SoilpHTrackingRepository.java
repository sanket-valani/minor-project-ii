package com.sanket.MinorProject2_admin_dashboard.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sanket.MinorProject2_admin_dashboard.entities.SoilpHTracking;

@Repository 
public interface SoilpHTrackingRepository extends JpaRepository<SoilpHTracking, Integer> {

	  @Query(value = "SELECT * FROM soilphtracking WHERE email_id = ?1", nativeQuery = true)
	  List<SoilpHTracking> findByEmailAddress(String emailId);	
}