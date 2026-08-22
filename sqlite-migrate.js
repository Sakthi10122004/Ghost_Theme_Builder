const Database = require('better-sqlite3');
const db = new Database('dev.db');

try {
  db.exec(`ALTER TABLE Project ADD COLUMN customSettings TEXT NOT NULL DEFAULT '[]'`);
  console.log("Added customSettings to Project");
} catch (e) { console.log(e.message); }

try {
  db.exec(`ALTER TABLE Project ADD COLUMN routing TEXT NOT NULL DEFAULT '{}'`);
  console.log("Added routing to Project");
} catch (e) { console.log(e.message); }

try {
  db.exec(`ALTER TABLE Page ADD COLUMN isCollection INTEGER NOT NULL DEFAULT 0`);
  console.log("Added isCollection to Page");
} catch (e) { console.log(e.message); }

try {
  db.exec(`ALTER TABLE Page ADD COLUMN collectionFilter TEXT NOT NULL DEFAULT ''`);
  console.log("Added collectionFilter to Page");
} catch (e) { console.log(e.message); }

db.close();
