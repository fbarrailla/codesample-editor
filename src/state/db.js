import idb from 'idb';

const TABLE_NAME = 'bgImage';

const dbPromise = idb.open('bgImage-store', 1, upgradeDB => {
  upgradeDB.createObjectStore(TABLE_NAME);
});

const bgImageStore = {
  get(key) {
    return dbPromise.then(db => {
      return db
        .transaction(TABLE_NAME)
        .objectStore(TABLE_NAME)
        .get(key);
    });
  },
  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction(TABLE_NAME, 'readwrite');
      tx.objectStore(TABLE_NAME).put(val, key);
      return tx.complete;
    });
  },
  keys() {
    return dbPromise.then(db => {
      const tx = db.transaction(TABLE_NAME);
      const keys = [];
      const store = tx.objectStore(TABLE_NAME);
      (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) return;
        keys.push(cursor.key);
        cursor.continue();
      });
      return tx.complete.then(() => keys);
    });
  },
  delete(key) {
    return dbPromise.then(db => {
      const tx = db.transaction(TABLE_NAME, 'readwrite');
      tx.objectStore(TABLE_NAME).delete(key);
      return tx.complete;
    });
  },
};

export const setBgImage = (id, bgImage) => bgImageStore.set(id, bgImage);

export const getBgImage = id => bgImageStore.get(id);

export const getBgImages = async () => {
  const keys = await bgImageStore.keys();
  const results = [];
  for (const imgId of keys) {
    results.push({
      id: imgId,
      data: await getBgImage(imgId),
    });
  }
  return results;
};

export const deleteBgImage = id => bgImageStore.delete(id);
