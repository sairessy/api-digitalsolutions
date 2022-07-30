import db from "../../database/index.js";

export const createStock = (req, res) => {
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

export const getAllStock = (req, res) => {
  const user = req.params.id;
  db.stock.stock.find({ user, removed: false }, (err, docs) => {
    res.json(docs);
  });
};

export const editStock = (req, res) => {
  const { name, price, _id } = req.body;
  db.stock.stock.update(
    { _id },
    { $set: { name, price } },
    (err, numReplaced) => {
      res.json({ sucess: numReplaced > 0 });
    }
  );
};

export const getStock = (req, res) => {
  const { user, rowsPerPage, currentPage } = req.body;

  db.stock.stock.find({ user, removed: false }).exec((err, docs) => {
    db.stock.stock.count({ user, removed: false }, (err, num) => {
      let count = 0;
      const finalData = [];
      for (let i = parseInt(currentPage) - 1; i < docs.length; i++) {
        const doc = docs[i];
        if (count < rowsPerPage) {
          finalData.push(doc);
        }
        count++;
      }
      res.json({ docs: finalData, total: num });
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

export const deleteStock = (req, res) => {
  const _id = req.params.id;
  db.stock.stock.update(
    { _id },
    { $set: { removed: true } },
    (err, numReplaced) => {
      res.json({ sucess: numReplaced > 0 });
    }
  );
};

export const getProduct = (req, res) => {
  db.stock.stock.findOne({ _id: req.params.id }, (err, doc) => {
    res.json(doc);
  });
};
