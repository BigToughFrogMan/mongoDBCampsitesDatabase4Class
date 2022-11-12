exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.insertOne(document);
};

exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find().toArray();
};

exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

// third parameter on updateOne is to pass in optional configurations, use null if you dont need them
exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};
