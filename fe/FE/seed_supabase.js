require('dotenv').config(); // Giúp bảo mật Key trong file .env
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// 1. Cấu hình Supabase (Thay thế bằng URL và KEY thực tế của bạn)
// Bạn nên tạo file .env và định nghĩa SUPABASE_URL, SUPABASE_KEY trong đó.
const supabaseUrl = process.env.SUPABASE_URL || 'https://<PROJECT_ID>.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '<YOUR_SUPABASE_ANON_OR_SERVICE_ROLE_KEY>';
const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Hàm đọc dữ liệu từ product.js
function getProductsData() {
  const productJsPath = "./js/product.js";
  const productJsContent = fs.readFileSync(productJsPath, "utf8");
  
  try {
    // Chuyển chuỗi JS array thành mảng object thực tế
    return eval(productJsContent); 
  } catch (e) {
    console.error("Lỗi khi đọc mảng từ product.js:", e);
    return [];
  }
}

// 3. Hàm kết nối và đẩy dữ liệu (Đã tạm thời ngắt phần push data)
async function seedToSupabase() {
  const products = getProductsData();
  
  if (products.length === 0) {
    console.log("Không có dữ liệu để đẩy.");
    return;
  }

  console.log(`Đã đọc thành công ${products.length} sản phẩm từ product.js.`);

  // Mapping lại dữ liệu cho chuẩn với các cột trong DB Supabase
  // (Bạn có thể tinh chỉnh lại nếu cấu trúc bảng Supabase khác với JSON)
  const dataToInsert = products.map(p => ({
    // Nếu trong Supabase id là kiểu serial/uuid tự tăng, bạn nên ẩn dòng id đi:
    // id: p.id, 
    brand: p.brand,
    category: p.category,
    product_name: p.product_name,
    price: p.price,
    specs: p.specs, // Nếu cột specs trong Supabase là kiểu JSONB
    image_url: p.image_url
  }));

  console.log("\n=== DỮ LIỆU MẪU SẼ ĐƯỢC ĐẨY (Sản phẩm đầu tiên) ===");
  console.log(JSON.stringify(dataToInsert[0], null, 2));
  console.log("=====================================================\n");

  console.log("[INFO] Cấu hình hàm đẩy dữ liệu đã sẵn sàng.");
  console.log("[INFO] Lệnh insert vào Supabase hiện ĐANG BỊ COMMENT lại theo yêu cầu của bạn.\n");

  // =========================================================================
  // KHI NÀO SẴN SÀNG ĐẨY, HÃY ĐIỀN ĐÚNG API KEY VÀ UNCOMMENT ĐOẠN CODE DƯỚI:
  // =========================================================================
  
  /*
  console.log("Bắt đầu đẩy dữ liệu lên bảng 'products'...");
  
  const { data, error } = await supabase
    .from('products') // Thay 'products' bằng tên bảng thực tế của bạn
    .insert(dataToInsert);

  if (error) {
    console.error("❌ Lỗi khi đẩy dữ liệu:", error.message, error.details);
  } else {
    console.log("✅ Đã đẩy toàn bộ dữ liệu lên Supabase thành công!");
  }
  */
}

// Chạy hàm
seedToSupabase();
