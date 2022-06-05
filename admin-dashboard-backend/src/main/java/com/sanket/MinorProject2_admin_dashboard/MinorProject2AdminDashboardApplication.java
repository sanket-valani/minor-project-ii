package com.sanket.MinorProject2_admin_dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class MinorProject2AdminDashboardApplication extends SpringBootServletInitializer {
   @Override
   protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
      return application.sources(MinorProject2AdminDashboardApplication.class);
   }
   public static void main(String[] args) {
      SpringApplication.run(MinorProject2AdminDashboardApplication.class, args);
   }
}

