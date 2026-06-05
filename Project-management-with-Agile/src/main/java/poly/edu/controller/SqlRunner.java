package poly.edu.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

@RestController
public class SqlRunner {

    @GetMapping("/run-sql")
    public String runSql() {
        String url = "jdbc:postgresql://aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres?user=postgres.fxwmcnagogiwczmyfmnu&password=trangwebpcuytin";
        try {
            String sql = new String(Files.readAllBytes(Paths.get("d:/code/LuxuryPC/init_db.sql")));
            try (Connection conn = DriverManager.getConnection(url);
                 Statement stmt = conn.createStatement()) {
                stmt.execute(sql);
            }
            return "SQL Script executed successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error executing SQL script: " + e.getMessage();
        }
    }
}
