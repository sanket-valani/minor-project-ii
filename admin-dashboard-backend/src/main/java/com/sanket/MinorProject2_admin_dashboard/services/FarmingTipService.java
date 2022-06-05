package com.sanket.MinorProject2_admin_dashboard.services;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanket.MinorProject2_admin_dashboard.entities.FarmingTip;
import com.sanket.MinorProject2_admin_dashboard.repositories.FramingTipRepository;;
 
@Service
@Transactional
public class FarmingTipService {
	 
    @Autowired
    private FramingTipRepository repo;
     
    public List<FarmingTip> listAll() {
        return repo.findAll();
    }
     
    public void save(FarmingTip product) {
        repo.save(product);
    }
     
    public FarmingTip get(Integer id) {
        return repo.findById(id).get();
    }
     
    public void delete(Integer id) {
        repo.deleteById(id);
    }

}
