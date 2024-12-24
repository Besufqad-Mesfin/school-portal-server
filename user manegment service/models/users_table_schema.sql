-- Users Table (For login authentication)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,               
    email VARCHAR(100) NOT NULL UNIQUE,              
    password_hash VARCHAR(255) NOT NULL,             
    role VARCHAR(50) DEFAULT 'user',             
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
    );
