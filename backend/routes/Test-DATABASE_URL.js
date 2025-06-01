require('dotenv').config();
const mysql = require('mysql2');

// Parse the DATABASE_URL manually (optional if mysql2 can use full URL)
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
  } else {
    console.log('✅ Connected successfully to MySQL!');
  }
  connection.end();
});
