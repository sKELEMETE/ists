const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: "localhost", // Database host, usually localhost
  user: "root", // Your MySQL username
  password: "", // Your MySQL password
  database: "ists", // Database name you will create
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db; // Export connection to use in other files
