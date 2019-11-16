CREATE TABLE flights (
index INT PRIMARY KEY,
datetime DATE,
airport_code TEXT,
city TEXT,
flight_number INT,	 	
departure_delay decimal,
cancellation TEXT
);

CREATE TABLE weather (
index INT PRIMARY KEY,
datetime DATE,
atlanta TEXT,
chicago TEXT,
kansas_city TEXT,
new_york TEXT,
san_francisco TEXT
);
