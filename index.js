const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

// url const is for setting up url to access to the mongo db server
const url = 'mongodb://localhost:27017/';
// dbname is name of database we want to connect to
const dbname = 'nucampsite';


MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    assert.strictEqual(err, null);

    console.log('Connected correctly to server.');

    const db = client.db(dbname);

// next is just to get rid of the test db data we entered earlier. in db's we use the term drop instead of delete
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped collection', result);

// now we are going to create a collection
        const collection = db.collection('campsites');
// example of inserting a document with the collection object we just created. Use JSON string for argument for insertOne() method. Second argument is a callback function that takes two params err and result
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) =>{
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);
// ops is property short for operations. depending on method contains dif values. in this case it will contain an array with the document that was inserted
// next we will find all the documents by leaving an empty param list.
            collection.find().toArray((err, docs) => {
//we use the assert core module to stop things if an error occurs.
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);
// next closes the server for the client.
                client.close();
// this callback nesting is bad practice, but they taught us this way anyway...
            });
        });
    });
});