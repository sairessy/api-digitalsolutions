import db from "../../database/index.js";

export const createTodo = (req, res) => {
  db.todo.tasks.insert(
    {
      ...req.body,
      done: false,
      removed: false,
      createdAt: new Date(),
    },
    (err, doc) => {
      res.json(doc);
    }
  );
};

export const getUserTodos = (req, res) => {
  db.todo.tasks
    .find({ user: req.params.user, removed: false })
    .sort({ createdAt: -1 })
    .exec((err, docs) => {
      res.json(docs);
    });
};

export const deleteTodo = (req, res) => {
  const { user } = req.body;
  const id = req.params.id;

  db.todo.tasks.update(
    { user, _id: id },
    { $set: { removed: true } },
    { multi: true },
    (err, nreplaced) => {
      res.json({ success: nreplaced > 0 });
    }
  );
};

export const doneTodo = (req, res) => {
  const { user, done, id } = req.body;

  db.todo.tasks.update(
    { user, _id: id },
    { $set: { done } },
    { multi: true },
    (err, nreplaced) => {
      res.json({ success: nreplaced > 0 });
    }
  );
};
