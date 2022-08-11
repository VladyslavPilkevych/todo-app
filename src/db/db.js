import { Dexie } from 'dexie';

const db = new Dexie('todoList');
db.version(1).stores({
  todos: '++id, task, complete',
});
export default db;
