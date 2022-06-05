package com.sanket.MinorProject2_admin_dashboard.services;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanket.MinorProject2_admin_dashboard.entities.SoilpHTracking;
import com.sanket.MinorProject2_admin_dashboard.repositories.SoilpHTrackingRepository;
 
@Service
@Transactional
public class SoilpHTrackingService {
	 
    @Autowired
    private SoilpHTrackingRepository repo;
     
    public List<SoilpHTracking> listAll() {
        return repo.findAll();
    }
     
    public void save(SoilpHTracking product) {
        repo.save(product);
    }
     
    public SoilpHTracking get(Integer id) {
        return repo.findById(id).get();
    }

    public List<SoilpHTracking> get(String emailId) {
        return repo.findByEmailAddress(emailId);
    }
     
    public void delete(Integer id) {
        repo.deleteById(id);
    }

}
