-- https://gitlab.com/williamyaoh/haskell-web-stack/-/blob/master/tables.sql
-- Returning assigned ID http://www.sqlines.com/postgresql/datatypes/serial

DROP TABLE IF EXISTS Temperatures; DROP TABLE IF EXISTS Pressures; DROP TABLE IF EXISTS Humidities; DROP TABLE IF EXISTS pHs; DROP TABLE IF EXISTS ECs; DROP TABLE IF EXISTS pHminus_additions; DROP TABLE IF EXISTS fertiliser_additions; DROP TABLE IF EXISTS Runs; DROP TABLE IF EXISTS Locations;

CREATE TABLE Runs (
    Run VARCHAR(30) NOT NULL,
    Start_date DATE,
    End_date DATE,
    Yield INT,
    Note TEXT,
    PRIMARY KEY (Run)
);

INSERT INTO Runs (Run) VALUES ('GettingThere');

CREATE TABLE Locations (
    Location VARCHAR(30) NOT NULL,
    PRIMARY KEY (Location)
);

INSERT INTO Locations VALUES ('mama'),('babies'),('girls');

CREATE TABLE Temperatures (
    Temperature FLOAT NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Run VARCHAR(30),
    Location VARCHAR(30),
    Medium ENUM('air','water','rockwool') NOT NULL,
    FOREIGN KEY (Run) REFERENCES Runs(Run),
    FOREIGN KEY (Location) REFERENCES Locations(Location)
);

CREATE TABLE Pressures (
    Pressure INT NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Run VARCHAR(30) NOT NULL,
    Location VARCHAR(30) NOT NULL,
    FOREIGN KEY (Run) REFERENCES Runs(Run),
    FOREIGN KEY (Location) REFERENCES Locations(Location)
);

CREATE TABLE Humidities (
    Humidity FLOAT NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Run VARCHAR(30) NOT NULL,
    Location VARCHAR(30) NOT NULL,
    FOREIGN KEY (Run) REFERENCES Runs(Run),
    FOREIGN KEY (Location) REFERENCES Locations(Location)
);

CREATE TABLE pHs (
    pH FLOAT NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    Run VARCHAR(30) NOT NULL,
    Location VARCHAR(30) NOT NULL,
    Probe ENUM('blue','black') NOT NULL,
    FOREIGN KEY (Run) REFERENCES Runs(Run),
    FOREIGN KEY (Location) REFERENCES Locations(Location)
);

CREATE TABLE ECs (
    EC FLOAT NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    Run VARCHAR(30) NOT NULL,
    Location VARCHAR(30) NOT NULL,
    FOREIGN KEY (Run) REFERENCES Runs(Run),
    FOREIGN KEY (Location) REFERENCES Locations(Location)
);

-- The amounts of pH- and fertiliser additions are given in ml/10l
CREATE TABLE pHminus_additions (
    Amount FLOAT NOT NULL,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    Run VARCHAR(30) NOT NULL,
    Location VARCHAR(30) NOT NULL,
    FOREIGN KEY (Run) REFERENCES Runs(Run),
    FOREIGN KEY (Location) REFERENCES Locations(Location)
);

CREATE TABLE fertiliser_additions (
    Micro FLOAT,
    Grow FLOAT,
    Bloom FLOAT,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
    Run VARCHAR(30) NOT NULL,
    Location VARCHAR(30) NOT NULL,
    FOREIGN KEY (Run) REFERENCES Runs(Run),
    FOREIGN KEY (Location) REFERENCES Locations(Location)
);