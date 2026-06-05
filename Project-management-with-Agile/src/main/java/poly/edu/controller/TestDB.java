package poly.edu.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.sql.Connection;
import java.sql.DriverManager;

@RestController
public class TestDB {

    @GetMapping("/testdb")
    public String test() {
    	try {
    	    Connection conn = DriverManager.getConnection(
    	        "jdbc:postgresql://aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres?user=postgres.fxwmcnagogiwczmyfmnu&password=trangwebpcuytin"
    	    );

    	    return "Connected Database Successfully!";
    	    
    	} catch (Exception e) {
    	    return "Connection Failed: " + e.getMessage();
    	}
    }
}