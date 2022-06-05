package com.sanket.MinorProject2_admin_dashboard.controllers;

import java.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.sanket.MinorProject2_admin_dashboard.entities.FarmingTip;
import com.sanket.MinorProject2_admin_dashboard.entities.TvProgram;
import com.sanket.MinorProject2_admin_dashboard.services.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FarmingTipController {
	 
    @Autowired
    private FarmingTipService service;
    
    @GetMapping("/farmingtip")
    public List<FarmingTip> list() {
        return service.listAll();
    }
         
    @PutMapping("/farmingtip/{id}")
    public ResponseEntity<?> update(@RequestBody FarmingTip program, @PathVariable Integer id) {
        try {        	
            FarmingTip existProduct = service.get(id);
            service.save(program);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }      
    }
    
    @PostMapping("/farmingtip")
    public void add(@RequestBody FarmingTip program) {
        service.save(program);
    }
    
    @DeleteMapping("/farmingtip/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }    
}
