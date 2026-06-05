package poly.edu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.edu.dao.UserDAO;
import poly.edu.entity.User;

@Service
public class AuthService {	

    @Autowired
    UserDAO userDAO;

    public User login(String email,String password){
        return userDAO.findByEmailAndPassword(email,password);
    }

    public User register(User user){
        return userDAO.save(user);
    }

}