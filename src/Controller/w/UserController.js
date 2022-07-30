import db from "../../database/index.js";

// createUser
export const w_createUser = (req, res) => {
  const data = {
    ...req.body,
    id: Date.now().toString(),
    cratedAt: Date.now(),
    lastModified: Date.now(),
  };

  db.w.users.findOne({ email: data.email }, (err, d) => {
    if (d === null) {
      db.w.users.insert(data, (err, doc) => {
        return res.status(200).json(doc);
      });
    } else {
      return res
        .status(409)
        .json({ msg: `O email ${data.email} está em uso!` });
    }
  });
};

// login
export const w_login = (req, res) => {
  const { email, pass } = req.body;

  console.log(email, pass);

  db.w.users.findOne({ email, pass }, (err, doc) => {
    console.log(doc);

    res.json(doc);
  });
};

// getUser
export const w_getUser = (req, res) => {
  db.users.findOne({ id: req.params.id }, (err, doc) => {
    res.json(doc);
  });
};

// updateUser
export const w_updateUser = (req, res) => {
  const { companyName, user } = req.body;
  db.users.update(
    { id: user },
    { $set: { companyName } },
    (err, numReplaced) => {
      res.json({ sucess: numReplaced > 0 });
    }
  );
};
