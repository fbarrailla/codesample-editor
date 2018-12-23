import idb from 'idb';

const dbPromise = idb.open('bgImage-store', 1, upgradeDB => {
  upgradeDB.createObjectStore('bgImage');
});

const bgImageStore = {
  get(key) {
    return dbPromise.then(db => {
      return db
        .transaction('bgImage')
        .objectStore('bgImage')
        .get(key);
    });
  },
  set(key, val) {
    return dbPromise.then(db => {
      const tx = db.transaction('bgImage', 'readwrite');
      tx.objectStore('bgImage').put(val, key);
      return tx.complete;
    });
  },
};

export const setBgImage = (id, bgImage) => bgImageStore.set(id, bgImage);

export const getBgImage = id => bgImageStore.get(id);
