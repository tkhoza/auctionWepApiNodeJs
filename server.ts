import express from 'express';
var cors = require('cors');

//const cookieParser = require('cookie-parser');
import { checkIfAuthenticated } from './src/services/authentication';
import { getCommentById, updateComment } from "./src/services/comments";
import { getAllUsers, getUserById,loginRoute } from "./src/services/users";
import { getProductById, updateProduct } from "./src/services/products";
import { getUserProductById, updateUserProduct } from "./src/services/user_products";
import {registerRoute} from './src/services/register';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//An example of using the checkIfAuthenticated function.
app.route('/users')
    .get(checkIfAuthenticated, getAllUsers);

// default route
app.get('/', function (_req, res) {
  return res.send({ error: false, message: 'Connected!!!' })
});

// login route
app.post('/login', loginRoute);


// Comment route
app.get('/comment/:id', getCommentById);
app.put('/updateComment', updateComment);

// Users route
// app.get("/users", getAllUsers);
app.get("/users/:id", getUserById);
app.post("/createUser",registerRoute)

// User_product route
app.get('/userProduct/:id', getUserProductById);
app.put('/updateUserProduct', updateUserProduct);

// Product route
app.get('/product/:id', getProductById);
app.put('/updateProduct', updateProduct);

//run server 
app.listen(port, () => {
  console.log("Server running at port: " + port);
});

module.exports = app;