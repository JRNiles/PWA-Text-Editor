import { openDB } from 'idb';

const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        const store = db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        store.createIndex('content', 'content');
        console.log('jate database created');
      } else {
        console.log('jate database already exists');
      }
    },
  });
  return db;
};

// Method to add content to the database
export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.add({ content });
  await tx.done;
  console.log('Content added to database:', content);
};

// Method to get all content from the database
export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const content = await store.getAll();
  await tx.done;
  console.log('Content retrieved from database:', content);
  return content;
};

initdb(); // Initialize database when the module is loaded

// Usage examples:
// putDb('Hello, World!');
// getDb();