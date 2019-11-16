CREATE TABLE flights (
datetime DATE PRIMARY KEY,
airport_code TEXT,
city TEXT,
flight_number INT,	 	
departure_delay decimal,
cancellation TEXT
);

CREATE TABLE weather (
datetime DATE PRIMARY KEY,
atlanta TEXT,
chicago TEXT,
kansas_city TEXT,
new_york TEXT,
san_francisco TEXT
);