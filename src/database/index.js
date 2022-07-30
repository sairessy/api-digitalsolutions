import Datastore from "nedb";

const db = {
  users: new Datastore("./src/database/collections/users.db"),
  // Todo
  todo: {
    tasks: new Datastore("./src/database/collections/todos/tasks.db"),
  },
  // Stock
  stock: {
    stock: new Datastore("./src/database/collections/stock/stock.db"),
    sell: new Datastore("./src/database/collections/stock/sell.db"),
  },
  musicSpot: {
    musics: new Datastore("./src/database/collections/music-spot/musics.db"),
  },

  w: {
    users: new Datastore("./src/database/collections/w/users.db"),
    posts: new Datastore("./src/database/collections/w/posts.db"),
  },
};

db.users.loadDatabase();
db.todo.tasks.loadDatabase();
db.stock.stock.loadDatabase();
db.stock.sell.loadDatabase();
db.musicSpot.musics.loadDatabase();

db.w.users.loadDatabase();
db.w.posts.loadDatabase();
export default db;
