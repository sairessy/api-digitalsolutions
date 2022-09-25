import express from "express";
import cors from "cors";

// Controllers
import {
  createUser,
  updateUser,
  login,
  getUser,
} from "../Controller/UserController.js";
import {
  createTodo,
  deleteTodo,
  doneTodo,
  getUserTodos,
} from "../Controller/Todo/TodoController.js";
import {
  createStock,
  getStock,
  searchProduct,
  sellStock,
  getTotal,
  deleteStock,
  getProduct,
  editStock,
  getAllStock,
  getSellsPerMounth,
  getQrCode,
  getVendasPorProducto,
  getFacturas,
} from "../Controller/stock/StockController.js";
import {
  createMusic,
  getMusics,
  getUserMusics,
  searchMusics,
} from "../Controller/music-spot/MusicSpotController.js";
import {
  w_createUser,
  w_login,
  w_updateUser,
  w_getUser,
} from "../Controller/w/UserController.js";
import {
  w_createPost,
  w_getUserPosts,
} from "../Controller/w/PostController.js";
import {
  cardapioCreateUser,
  cardapioGetUserHomeProducts,
  cardapioGetUserProducts,
  cardapioGetUsers,
  cardapioUserLogin,
} from "../Controller/cardapio/User.js";
import { cardapioCreateProduct } from "../Controller/cardapio/Product.js";
import {
  aprovarPedido,
  concretizarPedido,
  criarPedido,
  desaprovarPedido,
  getPedido,
  getPedidos,
} from "../Controller/cardapio/Pedido.js";

const app = express();
app.use(express.json({ limit: "7mb" }));
app.use(cors({ origin: "*" }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to DIGITAL SOLUTIONS api",
  });
});

// All
app.post("/user/login", login);
app.post("/user/edit", updateUser);
app.get("/user/:id", getUser);
app.post("/user/create", createUser);

// Todo
app.post("/todo/tasks/create", createTodo);
app.get("/todo/tasks/user/:user", getUserTodos);
app.delete("/todo/task/delete/:id", deleteTodo);
app.post("/todo/task/done", doneTodo);

// Stock
app.post("/stock/create", createStock);
app.post("/stock/edit", editStock);
app.get("/stock/:id", getProduct);
app.get("/stock/:user/search/:text", searchProduct);
app.post("/stock", getStock);
app.get("/stock/user/:id", getAllStock);
app.post("/stock/sell", sellStock);
app.post("/stock/delete/:id", deleteStock);
app.get("/stock/sell/total/user/:id", getTotal);
app.get("/stock/sells_per_month/:year/:user", getSellsPerMounth);
app.get("/qrcode/:code", getQrCode);
app.get("/stock-vendas-por-producto/:user", getVendasPorProducto);
app.get("/facturas/:user", getFacturas);

// MusicSpot
app.post("/music_spot/music/create", createMusic);
app.get("/music_spot/musics", getMusics);
app.get("/music_spot/musics/search/:text", searchMusics);
app.get("/music_spot/musics/user/:user", getUserMusics);

// w
app.post("/w/user/login", w_login);
app.post("/w/user/update", w_updateUser);
app.post("/w/user/create", w_createUser);
app.get("/user/:id", w_getUser);
app.post("/w/post/create", w_createPost);
app.get("/w/posts/user/:id", w_getUserPosts);

// cardapio
app.post("/cardapio/user/create", cardapioCreateUser);
app.post("/cardapio/user/login", cardapioUserLogin);
app.post("/cardapio/product/create", cardapioCreateProduct);
app.get("/cardapio/products/user/:id", cardapioGetUserProducts);
app.get("/cardapio/users", cardapioGetUsers);
app.get("/cardapio/products/home/user/:id", cardapioGetUserHomeProducts);
app.post("/cardapio/pedido/create", criarPedido);
// app.get("/cardapio/pedidos/user:/id", getPedidos);
app.get("/cardapio/pedidos/:id", getPedidos);
app.get("/cardapio/pedido/:id", getPedido);
app.post("/cardapio/pedido/desaprovar", desaprovarPedido);
app.post("/cardapio/pedido/aprovar", aprovarPedido);
app.post("/cardapio/pedido/concretizar", concretizarPedido);

export default app;
