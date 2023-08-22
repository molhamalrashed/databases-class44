var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword'
});
 
connection.connect();

//Deleting the database so we can run it over and over
const deleteDatabase = `DROP DATABASE IF EXISTS meetup`;

connection.query(deleteDatabase, function(error){
    if(error) throw error;
    console.log("The database has been deleted");

//Creating database 
const createDatabase = `CREATE DATABASE IF NOT EXISTS meetup`;

connection.query(createDatabase, function(error){
    if(error) throw error;
    console.log("the database meetup has been created");



// create tables 
const createTables = `
CREATE TABLE IF NOT EXISTS Invitee (
invitee_no INT AUTO_INCREMENT PRIMARY KEY,
invitee_name VARCHAR(50),
invited_by VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Room (
room_no INT AUTO_INCREMENT PRIMARY KEY,
room_name VARCHAR(50),
floor_number INT
);

CREATE TABLE IF NOT EXISTS Meeting (
meeting_no INT AUTO_INCREMENT PRIMARY KEY,
meeting_title VARCHAR(100),
starting_time TIME,
end_time TIME,
room_no INT
);
`;

connection.query(createTables, function(error){
    if(error) throw error;
    console.log("the tables have been created");

// Insert to the tables   
const editTables = `
INSERT INTO Invitee (invitee_name, invited_by)
VALUES 
('Mike', 'Jerry'),
('Jorge', 'Jerry'),
('Tod', 'Arian'),
('Alice', 'Arian'),
('Sam','Arian');

INSERT INTO Room (room_name, floor_number)
VALUES
('Room green', 2),
('Room green', 2),
('Room red', 4),
('Room red', 4),
('Room blue', 2);

INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no)
VALUES
('first meeting', '09:00:00','11:00:00', 1 ),
('second meeting', '09:00:00','11:00:00', 2 ),
('third meeting', '09:00:00','11:00:00', 3 ),
('forth meeting', '09:00:00','11:00:00', 4 ),
('fifth meeting', '09:00:00','11:00:00', 5 );
`;

connection.query(editTables, function(error){
   if(error) throw error;
   console.log("the tables were edited ");

   connection.end();
});
});
});
});