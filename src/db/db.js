import { Dexie } from 'dexie';

const db = new Dexie('todoList');
db.version(1).stores({
  todos: '++id, task, complete, categorie',
  categories: '++id, categorieName, counter',
  // categories: ['All', 'Home', 'Garden', 'Morning'],
});
export default db;
