'user strict';

const mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auctiondb'
});

// connect to database
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Successfully Connected to database!!');
});

module.exports = connection;
