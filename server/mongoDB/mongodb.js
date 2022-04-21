import { MongoClient } from "mongodb";
let url = "mongodb://localhost:27017/test";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log("Database created");
  db.close();
});
