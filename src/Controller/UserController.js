import db from "../database/index.js";

// createUser
export const createUser = (req, res) => {
  const data = {
    ...req.body,
    id: Date.now().toString(),
    cratedAt: Date.now(),
    lastModified: Date.now(),
  };

  db.users.findOne({ email: data.email }, (err, d) => {
    if (d === null) {
      db.users.insert(data, (err, doc) => {
        if (err) {
          throw err;
        }
        res.json(doc);
      });
    } else {
      res.status(409).json({ msg: "email existente" });
    }
  });
};

// login
export const login = (req, res) => {
  const { email, pass } = req.body;

  db.users.findOne({ email, pass }, (err, doc) => {
    if (err) throw err;

    res.json(doc);
  });
};

// getUser
export const getUser = (req, res) => {
  db.users.findOne({ id: req.params.id }, (err, doc) => {
    res.json(doc);
  });
};

// updateUser
export const updateUser = (req, res) => {
  const { companyName, user } = req.body;
  db.users.update(
    { id: user },
    { $set: { companyName } },
    (err, numReplaced) => {
      res.json({ sucess: numReplaced > 0 });
    }
  );
};
