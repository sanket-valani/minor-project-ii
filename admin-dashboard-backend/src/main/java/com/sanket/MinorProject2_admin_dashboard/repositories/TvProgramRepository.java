package com.sanket.MinorProject2_admin_dashboard.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sanket.MinorProject2_admin_dashboard.entities.TvProgram;

@Repository 
public interface TvProgramRepository extends JpaRepository<TvProgram, Integer> {
	
}