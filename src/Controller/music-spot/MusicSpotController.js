import db from "../../database/index.js";
import firebaseApp from "../../Services/firebase.js";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

export const createMusic = (req, res) => {
  const { ext, dataUrl, size, user, title, price, desc } = req.body;
  const id = Date.now();

  const storage = getStorage();

  try {
    const storageRef = ref(
      storage,
      `/musicspot/musics/${id.toString()}.${ext}`
    );
    uploadString(storageRef, dataUrl, "data_url").then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        db.musicSpot.musics.insert(
          {
            ext,
            size,
            user,
            title,
            price,
            desc,
            url,
            createdAt: id,
          },
          (err, doc) => {
            if (err) {
              console.log("Erro ao inserir na DB", err);
              return res.status(400).json({});
            } else {
              console.log(doc);
              return res.status(200).json(doc);
            }
          }
        );
      });
    });
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({ error });
  }
};

export const getMusics = (req, res) => {
  db.musicSpot.musics.find({}, (err, docs) => {
    res.json(docs);
  });
};

export const searchMusics = (req, res) => {
  db.musicSpot.musics.find({}, (err, data) => {
    const text = req.params.text;

    const docs = data.filter(({ title }) =>
      title.toLowerCase().includes(text.toLowerCase())
    );
    res.json(docs);
  });
};

export const getUserMusics = (req, res) => {
  const user = req.params.user;
  db.musicSpot.musics.find({ user }, (err, data) => {
    res.json(data);
  });
};
