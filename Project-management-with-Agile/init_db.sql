-- DROP TABLES FIRST IN REVERSE ORDER OF DEPENDENCY
DROP TABLE IF EXISTS stock_movements CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS pc_builds CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS carts CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

-- CREATE TABLES
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    price DECIMAL(12,2),
    description TEXT,
    image VARCHAR(255),
    category_id INT,
    stock INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    total_price DECIMAL(12,2),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    price DECIMAL(12,2),
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE pc_builds (
    id SERIAL PRIMARY KEY,
    user_id INT,
    cpu_id INT,
    gpu_id INT,
    ram_id INT,
    mainboard_id INT,
    ssd_id INT,
    total_price DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INT UNIQUE,
    quantity INT DEFAULT 0,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE stock_movements (
    id SERIAL PRIMARY KEY,
    product_id INT,
    change_quantity INT,
    movement_type VARCHAR(20),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- INSERT DATA
INSERT INTO roles(name) VALUES
('ADMIN'),
('STAFF'),
('USER'),
('WAREHOUSE'),
('MANAGER');

INSERT INTO users(username,email,password,full_name,phone,address) VALUES
('admin','admin@luxurypc.com','123456','Admin LuxuryPC','0900000001','HCM'),
('staff01','staff01@luxurypc.com','123456','Tran Van B','0900000002','HCM'),
('user01','user01@gmail.com','123456','Nguyen Van C','0900000003','Hanoi'),
('user02','user02@gmail.com','123456','Le Thi D','0900000004','Da Nang'),
('user03','user03@gmail.com','123456','Pham Van E','0900000005','Can Tho');

INSERT INTO categories(name) VALUES
('CPU'),
('GPU'),
('RAM'),
('Mainboard'),
('SSD');

INSERT INTO products(name,price,description,image,category_id,stock) VALUES
('Intel Core i9 14900K',15000000,'CPU Intel Gen 14','cpu.png',1,20),
('AMD Ryzen 9 7950X',14000000,'CPU AMD mạnh','cpu_ryzen9.png',1,15),
('RTX 4090 ASUS ROG',45000000,'GPU cao cấp','gpu.png',2,5),
('Corsair 32GB DDR5',5000000,'RAM Gaming','ram.png',3,40),
('Samsung 990 Pro 1TB',3500000,'SSD NVMe Gen4','ssd990.png',5,30);

INSERT INTO carts(user_id) VALUES
(1),
(2),
(3),
(4),
(5);

INSERT INTO cart_items(cart_id,product_id,quantity) VALUES
(1,1,1),
(2,3,1),
(3,4,2),
(4,5,1),
(5,2,1);

INSERT INTO orders(user_id,total_price,status) VALUES
(3,15000000,'PAID'),
(4,45000000,'PAID'),
(5,5000000,'PENDING'),
(3,3500000,'SHIPPING'),
(2,14000000,'COMPLETED');

INSERT INTO order_items(order_id,product_id,price,quantity) VALUES
(1,1,15000000,1),
(2,3,45000000,1),
(3,4,5000000,1),
(4,5,3500000,1),
(5,2,14000000,1);

INSERT INTO pc_builds(user_id,cpu_id,gpu_id,ram_id,mainboard_id,ssd_id,total_price) VALUES
(3,1,3,4,4,5,70000000),
(4,2,3,4,4,5,68000000),
(5,1,3,4,4,5,71000000),
(2,2,3,4,4,5,69000000),
(1,1,3,4,4,5,72000000);

INSERT INTO inventory(product_id,quantity) VALUES
(1,20),
(2,15),
(3,5),
(4,40),
(5,30);

INSERT INTO stock_movements(product_id,change_quantity,movement_type,note) VALUES
(1,20,'IMPORT','Nhập CPU Intel'),
(2,15,'IMPORT','Nhập CPU AMD'),
(3,5,'IMPORT','Nhập GPU RTX'),
(4,40,'IMPORT','Nhập RAM Corsair'),
(5,30,'IMPORT','Nhập SSD Samsung');