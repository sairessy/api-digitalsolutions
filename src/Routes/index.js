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

const app = express();
app.use(express.json({ limit: "7mb" }));
app.use(cors({ origin: "*" }));
app.use(express.static("public"));

// Routes

// All
app.post("/user/login", login);
app.post("/user/edit", updateUser);
app.get("/user/:id", getUser);

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
app.get("/stock/sells_per_month/:year", getSellsPerMounth);
app.get("/qrcode/:code", getQrCode);
app.get("/stock-vendas-por-producto", getVendasPorProducto);

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

export default app;
