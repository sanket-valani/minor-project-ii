package com.sanket.MinorProject2_admin_dashboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.sanket.MinorProject2_admin_dashboard.entities.FarmingTip;

@Repository 
public interface FramingTipRepository  extends JpaRepository<FarmingTip, Integer> {
	
}