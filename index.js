const MongoClient = require("mongodb").MongoClient;
const assert = require("assert").strict;
const dboper = require("./operations");

// url const is for setting up url to access to the mongo db server
const url = "mongodb://localhost:27017/";
// dbname is name of database we want to connect to
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null);

  console.log("Connected correctly to server.");

  const db = client.db(dbname);

  // next is just to get rid of the test db data we entered earlier. in db's we use the term drop instead of delete
  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log("Dropped collection", result);

    dboper.insertDocument(
      db,
      { name: "Breadcrumb Trail Campground", description: "Test" },
      "campsites",
      (result) => {
        console.log("Insert Document:", result.ops);

        dboper.findDocuments(db, "campsites", (docs) => {
          console.log("Found Documents:", docs);

          dboper.updateDocument(
            db,
            { name: "Breadcrumb Trail Campground " },
            { description: "Updated Test Description" },
            "campsites",
            (result) => {
              console.log("Updated Document Count:", result.result.nModified);

              dboper.findDocuments(db, "campsites", (docs) => {
                console.log("Found Documents:", docs);

                dboper.removeDocument(
                  db,
                  { name: "Breadcrumb Trail Campground" },
                  "campsites",
                  (result) => {
                    console.log("Deleted Document Count:", result.deletedCount);

                    client.close();
                  }
                );
              });
            }
          );
        });
      }
    );
  });
});
