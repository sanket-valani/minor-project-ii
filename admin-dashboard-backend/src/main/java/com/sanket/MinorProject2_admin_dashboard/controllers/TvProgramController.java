package com.sanket.MinorProject2_admin_dashboard.controllers;

import java.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.sanket.MinorProject2_admin_dashboard.entities.TvProgram;
import com.sanket.MinorProject2_admin_dashboard.services.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TvProgramController {
	 
    @Autowired
    private TvProgramService service;
    
    @GetMapping("/tvprogram")
    public List<TvProgram> list() {
        return service.listAll();
    }
         
    @PutMapping("/tvprogram/{id}")
    public ResponseEntity<?> update(@RequestBody TvProgram program, @PathVariable Integer id) {
        try {
            TvProgram existProduct = service.get(id);
            service.save(program);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }      
    }
    
    @PostMapping("/tvprogram")
    public void add(@RequestBody TvProgram program) {
        service.save(program);
    }
    
    @DeleteMapping("/tvprogram/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }    
}
