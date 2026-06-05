const fs = require("fs");
const axios = require("axios");
const path = require("path");
const google = require("googlethis");

const productJsPath = "./js/product.js";
const productJsContent = fs.readFileSync(productJsPath, "utf8");

let products = [];
try {
  products = eval(productJsContent); 
} catch (e) {
  console.error("Lỗi khi đọc mảng từ product.js:", e);
  process.exit(1);
}

const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9"
  }
});

async function download(url, filePath) {
  const response = await axiosInstance({
    url,
    method: "GET",
    responseType: "stream"
  });

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

(async () => {
  const imagesDir = "./images/products";
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  console.log(`Bắt đầu tải ảnh cho ${products.length} sản phẩm...`);

  for (const p of products) {
    let success = false;
    let ext = ".png";

    // TH 1: Thử tải từ link gốc có sẵn
    if (p.image_url && p.image_url.startsWith("http")) {
      try {
        console.log(`\nĐang tải ảnh gốc cho [${p.id}] ${p.product_name}...`);
        let currentExt = path.extname(new URL(p.image_url).pathname);
        if (currentExt) ext = currentExt;

        const localPath = path.join(imagesDir, `${p.id}${ext}`);
        await download(p.image_url, localPath);
        
        // Kiểm tra dung lượng ảnh gốc
        const stats = fs.statSync(localPath);
        if (stats.size < 5000) { // < 5KB thì có thể là icon lỗi hoặc ảnh rác
          console.log(`-> Ảnh gốc quá nhỏ (${stats.size} bytes), huỷ và tìm bằng Google...`);
          fs.unlinkSync(localPath);
          throw new Error("Ảnh gốc quá nhỏ, không hợp lệ.");
        }

        p.image_url = `/images/products/${p.id}${ext}`;
        console.log(`-> OK: Đã tải từ link gốc.`);
        success = true;
      } catch (e) {
        console.log(`-> Lỗi tải link gốc. Đang chuyển sang tìm kiếm Google...`);
      }
    }

    // TH 2: Nếu link gốc lỗi, dùng googlethis tìm ảnh mới
    if (!success) {
      try {
        // Cải thiện query: Thêm từ khoá để ép tìm ảnh sản phẩm chất lượng tốt
        const query = p.product_name + " transparent background product image";
        const result = await google.image(query, { safe: false });

        if (result && result.length > 0) {
          // Lọc các kết quả: bỏ qua base64, ảnh icon nhỏ...
          for (let i = 0; i < result.length; i++) {
            try {
              const newUrl = result[i].url;
              
              if (!newUrl || newUrl.startsWith("data:") || newUrl.includes("favicon") || newUrl.includes("logo")) {
                continue;
              }

              let newExt = path.extname(new URL(newUrl).pathname).toLowerCase();
              if (![".png", ".jpg", ".jpeg", ".webp"].includes(newExt)) {
                newExt = ".png"; // Mặc định png nếu url bị ảo
              }
              
              const localPath = path.join(imagesDir, `${p.id}${newExt}`);
              await download(newUrl, localPath);
              
              // Kiểm tra dung lượng ảnh tải về
              const stats = fs.statSync(localPath);
              if (stats.size < 15360) { // Nếu < 15KB thường là ảnh rác/thumbnail/icon
                console.log(`   -> Link số ${i+1} tải về ảnh quá nhỏ (${stats.size} bytes), bỏ qua...`);
                fs.unlinkSync(localPath);
                continue;
              }
              
              p.image_url = `/images/products/${p.id}${newExt}`;
              console.log(`-> OK: Đã tìm và tải thành công từ Google Images (${stats.size} bytes).`);
              success = true;
              break; 
            } catch (err) {
              // Bỏ qua lỗi kết nối của 1 link và thử link tiếp
            }
          }
        }
        
        if (!success) {
          console.log(`-> THẤT BẠI: Không thể tìm/tải được ảnh chất lượng cho [${p.id}].`);
        }

      } catch (e) {
        console.log(`-> Lỗi tìm kiếm Google cho [${p.id}]:`, e.message);
      }
    }
  }

  const newProductJsContent = JSON.stringify(products, null, 2);
  fs.writeFileSync(productJsPath, "\n" + newProductJsContent + "\n", "utf8");

  console.log("\n=============================");
  console.log("HOÀN TẤT CẬP NHẬT ẢNH!");
  console.log("=============================");
})();