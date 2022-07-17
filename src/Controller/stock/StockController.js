import db from "../../database/index.js";

export const createStock = (req, res) => {
  console.log(req.body);
  db.stock.stock.insert(
    {
      ...req.body,
      removed: false,
      createdAt: new Date(),
    },
    (err, doc) => {
      res.json(doc);
    }
  );
};

export const getStock = (req, res) => {
  const user = req.params.id;
  const limit = req.params.limit;
  db.stock.stock.find({ user, removed: false }).exec((err, docs) => {
    db.stock.stock.count({ user, removed: false }, (err, num) => {
      res.json({ docs, total: num });
    });
  });
};

export const sellStock = (req, res) => {
  const data = req.body;
  db.stock.sell.insert(
    {
      ...data,
      createdAt: new Date(),
    },
    (err, doc) => {
      res.json(doc);
    }
  );
};

export const getTotal = (req, res) => {
  const user = req.params.id;
  db.stock.sell.find({ user }, (err, docs) => {
    let tt = 0;

    for (let i = 0; i < docs.length; i++) {
      tt += docs[i].total;
    }
    res.json({ total: tt });
  });
};

export const searchProduct = (req, res) => {
  const user = req.params.user;
  const text = req.params.text;

  db.stock.stock.find({ user, removed: false }).exec((err, docs) => {
    res.json({
      docs: docs.filter((o) => o.name.toLowerCase().includes(text)),
      total: 0,
    });
  });
};
