const MongoClient = require("mongodb").MongoClient;
const dboper = require("./operations");

// url const is for setting up url to access to the mongo db server
const url = "mongodb://localhost:27017/";
// dbname is name of database we want to connect to
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected correctly to server.");

    const db = client.db(dbname);

    // next is just to get rid of the test db data we entered earlier. in db's we use the term drop instead of delete
    db.dropCollection("campsites")
      .then((result) => {
        console.log("Dropped collection", result);
      })
      .catch((err) => console.log("no collection to drop."));

    dboper
      .insertDocument(
        db,
        { name: "Breadcrumb Trail Campground", description: "Test" },
        "campsites"
      )
      .then((result) => {
        console.log("Insert Document:", result.ops);

        return dboper.findDocuments(db, "campsites");
      })
      .then((docs) => {
        console.log("Found Documents:", docs);

        return dboper.updateDocument(
          db,
          { name: "Breadcrumb Trail Campground " },
          { description: "Updated Test Description" },
          "campsites"
        );
      })
      .then((result) => {
        console.log("Updated Document Count:", result.result.nModified);

        return dboper.findDocuments(db, "campsites");
      })
      .then((docs) => {
        console.log("Found Documents:", docs);

        return dboper.removeDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          "campsites"
        );
      })
      .then((result) => {
        console.log("Deleted Document Count:", result.deletedCount);

        return client.close();
      })
      .catch((err) => {
        console.log(err);
        client.close();
      });
  })
  .catch((err) => console.log(err));
