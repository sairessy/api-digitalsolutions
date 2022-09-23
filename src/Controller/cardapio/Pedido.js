import db from "../../database/index.js";
import firebaseApp from "../../Services/firebase.js";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export const criarPedido = async (req, res) => {
  const data = req.body;
  db.cardapio.pedidos.insert(
    { ...data, created_at: new Date() },
    (err, doc) => {
      res.status(200).json(doc);
    }
  );
};

export const getPedidos = async (req, res) => {
  const id = req.params.id;
  db.cardapio.pedidos.find({ user: id }, (err, docs) => {
    res.status(200).json(docs);
  });
};

export const getPedido = async (req, res) => {};

export const desaprovarPedido = async (req, res) => {};

export const aprovarPedido = async (req, res) => {};

export const concretizarPedido = async (req, res) => {};
