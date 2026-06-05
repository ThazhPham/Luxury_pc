package poly.edu.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import poly.edu.entity.User;

public interface UserDAO extends JpaRepository<User, Integer>{

    User findByEmail(String email);

    User findByEmailAndPassword(String email,String password);
}