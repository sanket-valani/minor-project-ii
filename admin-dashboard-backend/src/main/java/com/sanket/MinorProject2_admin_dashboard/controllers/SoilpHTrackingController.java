package com.sanket.MinorProject2_admin_dashboard.controllers;

import java.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.sanket.MinorProject2_admin_dashboard.entities.SoilpHTracking;
import com.sanket.MinorProject2_admin_dashboard.entities.TvProgram;
import com.sanket.MinorProject2_admin_dashboard.services.SoilpHTrackingService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SoilpHTrackingController {
	 
    @Autowired
    private SoilpHTrackingService service;
    
    @GetMapping("/soilphtracking")
    public List<SoilpHTracking> list() {
        return service.listAll();
    }

    @GetMapping("/soilphtracking/{emailId}")
    public List<SoilpHTracking> listOne(@PathVariable String emailId) {
        return service.get(emailId);
    }
         
    @PutMapping("/soilphtracking/{id}")
    public ResponseEntity<?> update(@RequestBody SoilpHTracking program, @PathVariable Integer id) {
        try {        	
            SoilpHTracking existProduct = service.get(id);
            service.save(program);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }      
    }
    
    @PostMapping("/soilphtracking")
    public void add(@RequestBody SoilpHTracking program) {
        service.save(program);
    }
    
    @DeleteMapping("/soilphtracking/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }    
}
