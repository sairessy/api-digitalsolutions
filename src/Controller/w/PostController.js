import db from "../../database/index.js";

export const w_createPost = (req, res) => {
  const data = {
    ...req.body,
    id: Date.now().toString(),
    cratedAt: Date.now(),
    lastModified: Date.now(),
    removed: false,
  };

  db.w.posts.insert(data, (err, doc) => {
    res.json(doc);
  });
};

export const w_getUserPosts = (req, res) => {
  db.w.posts.find({ user: req.params.id }, (err, docs) => {
    res.json(docs);
  });
};
