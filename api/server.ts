import express from 'express';
import { getCommentById, updateComment } from "./src/services/comments";
import { getAllUsers, getUserById } from "./src/services/users";
import { getProductById, updateProduct } from "./src/services/products";
import { getUserProductById, updateUserProduct } from "./src/services/user_products";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// default route
app.get('/', function (_req, res) {
  return res.send({ error: false, message: 'Connected!!!' })
});
// Comment route
app.get('/comment/:id', getCommentById);
app.put('/updateComment', updateComment);

// Users route
app.get("/users", getAllUsers);
app.get("/users/:id", getUserById);

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