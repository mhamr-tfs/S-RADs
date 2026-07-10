-- Migration number: 0001 	 2026-07-10T05:42:58.622Z
CREATE TABLE IF NOT EXISTS reservations (
	id INTEGER PRIMARY KEY AUTOINCREMENT,

	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	phone TEXT,
	email TEXT,

	shuttle_date TEXT NOT NULL,
	expected_takeout_time TEXT,

	launch_site TEXT NOT NULL,
	takeout_site TEXT NOT NULL,

	vehicle_year TEXT,
	vehicle_make TEXT,
	vehicle_model TEXT,
	vehicle_color TEXT,
	license_plate TEXT,
	license_county TEXT,
	license_state TEXT,

	key_location TEXT,
	key_location_other TEXT,
	special_instructions TEXT,

	is_two_rivers_guest TEXT DEFAULT 'No',
	two_rivers_direct_booking TEXT DEFAULT 'No',
	is_guide TEXT DEFAULT 'No',

	price REAL,

	payment_method TEXT,
	payment_status TEXT DEFAULT 'Pending',
	payment_reason TEXT,
	cash_location TEXT,

	driver TEXT DEFAULT 'Unassigned',
	vehicle_used TEXT DEFAULT 'Unassigned',
	status TEXT DEFAULT 'Scheduled',

	vehicle_photo_url TEXT,

	requested_at TEXT DEFAULT CURRENT_TIMESTAMP,
	completed_at TEXT
);
CREATE TABLE IF NOT EXISTS routes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	launch_site TEXT NOT NULL,
	takeout_site TEXT NOT NULL,
	price REAL NOT NULL,
	active TEXT DEFAULT 'Yes'
);