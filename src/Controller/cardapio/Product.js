import db from "../../database/index.js";
import firebaseApp from "../../Services/firebase.js";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export const cardapioCreateProduct = async (req, res) => {
  const { title, descripition, price, user_id } = req.body;

  try {
    db.cardapio.products.insert(
      {
        title,
        descripition,
        price,
        user_id,
        created_at: new Date(),
        removed: false,
      },
      (err, doc) => {
        res.json(doc);
      }
    );
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
