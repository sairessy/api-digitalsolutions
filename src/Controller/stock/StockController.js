import db from "../../database/index.js";
import QRCode from "qrcode";

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
  const { user } = req.body;

  db.stock.stock.find({ user, removed: false }).exec((err, docs) => {
    res.json({ docs, total: docs.length });
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

export const getSellsPerMounth = async (req, res) => {
  const year = req.params.year;
  const user = req.params.user;

  db.stock.sell.find({ user }, (err, doc) => {
    const arr = [];

    for (let i = 0; i < 12; i++) {
      let tt = 0;
      const month = i;
      const aux = doc.filter(
        (d) =>
          new Date(d.createdAt).getMonth() === month &&
          new Date(d.createdAt).getFullYear() === parseInt(year)
      );
      for (const e of aux) {
        tt += e.total;
      }
      arr.push({ month, tt });
    }

    res.json(arr);
  });
};

export const getQrCode = async (req, res) => {
  const code = req.params.code;
  QRCode.toDataURL(code).then((url) => {
    res.send(`
      <body style='display: flex; align-items: center; justify-content: center;'>
        <img src='${url}'>
      </body>`);
  });
};

export const getVendasPorProducto = (request, response) => {
  const user = request.params.user;

  db.stock.sell.find({ user }, async (err, sells) => {
    const finalData = [];
    for (let i = 0; i < sells.length; i++) {
      const sell = sells[i];
      for (let j = 0; j < sell.data.length; j++) {
        const cart = sell.data[j];
        finalData.push(cart);
      }
    }

    const result = [];
    finalData.reduce((res, value) => {
      if (!res[value.id]) {
        res[value.id] = { id: value.id, quantity: 0 };
        result.push(res[value.id]);
      }
      res[value.id].quantity += value.quantity;
      return res;
    });

    for (let i = 0; i < result.length; i++) {
      result[i].name = await new Promise((resolve) => {
        db.stock.stock.findOne({ _id: result[i].id }, (err, p) => {
          resolve(p.name);
        });
      });
    }

    response.json(result);
  });
};

export const getFacturas = async (req, res) => {
  const user = req.params.user;

  db.stock.sell.find({ user }, (err, docs) => {
    res.json(docs);
  });
};
