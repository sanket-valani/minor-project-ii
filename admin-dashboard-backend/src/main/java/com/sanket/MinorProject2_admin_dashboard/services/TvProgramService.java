package com.sanket.MinorProject2_admin_dashboard.services;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sanket.MinorProject2_admin_dashboard.entities.TvProgram;
import com.sanket.MinorProject2_admin_dashboard.repositories.TvProgramRepository;
 
@Service
@Transactional
public class TvProgramService {
	 
    @Autowired
    private TvProgramRepository repo;
     
    public List<TvProgram> listAll() {
        return repo.findAll();
    }
     
    public void save(TvProgram product) {
        repo.save(product);
    }
     
    public TvProgram get(Integer id) {
        return repo.findById(id).get();
    }
     
    public void delete(Integer id) {
        repo.deleteById(id);
    }

}
