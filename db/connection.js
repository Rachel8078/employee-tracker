const mysql = require('mysql2');

// MySQL login information
const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'J6W!O',
    database: 'employee_tracker'
});

// Connect to database
db.connect(err => {
    if (err) throw err;
});

module.exports = db;