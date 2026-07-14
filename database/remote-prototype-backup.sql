PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE reservations (id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name TEXT NOT NULL, phone TEXT, email TEXT, shuttle_date TEXT, shuttle_time TEXT, launch_site TEXT, takeout_site TEXT, passengers INTEGER, driver TEXT, vehicle TEXT, status TEXT DEFAULT 'Scheduled', notes TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "reservations" ("id","customer_name","phone","email","shuttle_date","shuttle_time","launch_site","takeout_site","passengers","driver","vehicle","status","notes","created_at") VALUES(1,'Test Customer','555-123-4567','test@example.com','2026-07-07','09:00','Wind River','Thermopolis Fly Shop',2,'Mike','Truck 1','Scheduled','First test reservation','2026-07-08 01:09:35');
CREATE TABLE IF NOT EXISTS "d1_migrations"(
		id         INTEGER PRIMARY KEY AUTOINCREMENT,
		name       TEXT UNIQUE,
		applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('reservations',1);
