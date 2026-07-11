CREATE TABLE IF NOT EXISTS routes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	launch_site TEXT NOT NULL,
	takeout_site TEXT NOT NULL,
	price REAL NOT NULL,
	active TEXT DEFAULT 'Yes'
);

DELETE FROM routes;

INSERT INTO routes (launch_site, takeout_site, price, active) VALUES
('Wedding of the Waters', '8th Street Bridge', 30.00, 'Yes'),
('Wedding of the Waters', 'Broadway Bridge', 35.00, 'Yes'),
('Wedding of the Waters', 'Hot Springs State Park', 40.00, 'Yes'),
('Wedding of the Waters', 'Kirby Ditch', 45.00, 'Yes'),
('8th Street Bridge', 'Hot Springs State Park', 25.00, 'Yes'),
('8th Street Bridge', 'Kirby Ditch', 30.00, 'Yes'),
('Hot Springs State Park', 'Wakely Road', 30.00, 'Yes'),
('Kirby Ditch', 'Wakely Road', 40.00, 'Yes'),
('Wakely Road', 'Longwell', 30.00, 'Yes'),
('Wakely Road', 'Skelton', 40.00, 'Yes'),
('Longwell', 'Skelton', 40.00, 'Yes'),
('County Line Road', 'Shuttle', 50.00, 'Yes');