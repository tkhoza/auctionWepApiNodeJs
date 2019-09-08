https://www.tutsmake.com/node-express-js-creating-a-restful-crud-api-with-mysql/

*Steps for creating creating an API with Node Express JS and MYSQL*
1. Create working directory, cd in.
2. Run the following commands.
    * npm init --yes
    * npm install

    // Installing Express JS, MYSQL driver
    * npm install express --save
    * npm install mysql --save
    * npm install body-parser --save
3. Create MYSQL database.
4. Create Server.js file
5. Configure the Server.js file.

                var express = require('express');
                var app = express();
                var bodyParser = require('body-parser');
                var mysql = require('mysql');
                
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({
                    extended: true
                }));

                // connection configurations
                var dbConn = mysql.createConnection({
                    host: 'localhost',
                    user: 'root',
                    password: '',
                    database: 'auctiondb'
                });
                // connect to database
                dbConn.connect(); 

                /*CRUD METHODS GOES HERE*/

                // set port
                app.listen(3000, function () {
                    console.log('Node app is running on port 3000');
                });
                
                module.exports = app;


6. Run the server: npm start

for more info on this api