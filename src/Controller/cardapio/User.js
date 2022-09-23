import db from "../../database/index.js";
import firebaseApp from "../../Services/firebase.js";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export const cardapioCreateUser = async (req, res) => {
  const { email, pass, nome = "" } = req.body;

  try {
    db.cardapio.users.insert(
      { email, pass, activated: true, nome },
      (err, doc) => {
        res.json({});
      }
    );
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

export const cardapioUserLogin = async (req, res) => {
  const { email, pass } = req.body;

  try {
    db.cardapio.users.findOne({ email, pass }, (err, doc) => {
      res.json(doc);
    });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};

export const cardapioGetUsers = async (req, res) => {
  const id = req.params.id;

  db.cardapio.users.find({}, (err, docs) => {
    res.json(docs);
  });
};

export const cardapioGetUserHomeProducts = async (req, res) => {
  const id = req.params.id;

  db.cardapio.products.find({ user_id: id }, (err, docs) => {
    res.json(docs);
  });
};

export const cardapioGetUserProducts = async (req, res) => {
  const id = req.params.id;

  db.cardapio.products.find({ user_id: id }, (err, docs) => {
    res.json(docs);
  });
};
