package poly.edu.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import poly.edu.entity.Product;
import java.util.List;

public interface ProductDAO extends JpaRepository<Product, Integer> {
    
    // Thêm điều kiện ( ) cho danh mục và AND p.image IS NOT NULL để chỉ lấy sản phẩm có link ảnh
    @Query("SELECT p FROM Product p WHERE (p.category.name = 'CPU' OR p.category.name = 'GPU') AND p.image IS NOT NULL")
    List<Product> findFeaturedProducts();

    // Thêm điều kiện AND p.image IS NOT NULL
    @Query("SELECT p FROM Product p WHERE p.stock < 10 AND p.image IS NOT NULL")
    List<Product> findFlashSaleProducts();

    // Đổi tên hàm theo quy tắc của Spring Data JPA để tự động lọc bỏ các sản phẩm không có ảnh
    List<Product> findByCategoryIdAndImageIsNotNull(Integer categoryId);
}