// db.js
import mysql from 'mysql2';

// Create a connection pool (recommended for scalability)
const pool = mysql.createPool({
  host: 'localhost',        
  user: 'your_username',    
  password: 'your_password',
  database: 'your_database',
  waitForConnections: true, 
  connectionLimit: 10,      
  queueLimit: 0             
});


export default pool;
