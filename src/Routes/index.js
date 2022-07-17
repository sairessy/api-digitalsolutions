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
} from "../Controller/stock/StockController.js";
import {
  createMusic,
  getMusics,
  searchMusics,
} from "../Controller/music-spot/MusicSpotController.js";

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
app.get("/stock/:user/search/:text", searchProduct);
app.get("/stock/user/:id/limit/:limit", getStock);
app.post("/stock/sell", sellStock);
app.get("/stock/sell/total/user/:id", getTotal);

// MusicSpot
app.post("/music_spot/music/create", createMusic);
app.get("/music_spot/musics", getMusics);
app.get("/music_spot/musics/search/:text", searchMusics);

export default app;
