package poly.edu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import poly.edu.dao.ProductDAO;
import poly.edu.entity.Product;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductDAO productDAO;

    public List<Product> getAllProducts() {
        return productDAO.findAll();
    }

    public List<Product> getFeaturedProducts() {
        return productDAO.findFeaturedProducts();
    }

    public List<Product> getFlashSaleProducts() {
        return productDAO.findFlashSaleProducts();
    }

    // Đã cập nhật lại tên hàm gọi sang DAO khớp với bước trước
    public List<Product> getProductsByCategory(Integer categoryId) {
        return productDAO.findByCategoryIdAndImageIsNotNull(categoryId);
    }

}