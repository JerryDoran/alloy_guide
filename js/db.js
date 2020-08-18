// Offline data
db.enablePersistence().catch((err) => {
  if (err.code === 'failed-precondition') {
    // probably multiple tabs open
    console.log('persistence failed');
  } else if (err.code === 'unimplemented') {
    // lack of browser support
    console.log('persistence is not available');
  }
});

// Real-time listener
db.collection('ALLOYS').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === 'added') {
      // add document data to the web page
      renderAlloy(change.doc.data(), change.doc.id);
    }

    if (change.type === 'removed') {
      // remove document data from web page
    }
  });
});
