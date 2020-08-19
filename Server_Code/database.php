<?php
//Declare variables for database connection. The database 'SensorData' contains the table 'Data' that stores the data.
$servername = "localhost:3306";
$username = "datasource";
$password = "DBPASSWORD";
$dbname = "SensorData";

//DB connection
$conn = new mysqli($servername, $username, $password, $dbname);

//Error handling
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
} 

//SQL statement to run. The table 'Data' stores the sensing data. 
$sql = "SELECT Temperature, Time, Run, BME_Temperature, BME_Humidity, BME_Pressure FROM Data;";

//Run SQL query and store in result variable.
$result = mysqli_query($conn,$sql);
$data = array();

// Put result in array $data.
foreach ($result as $row) {
 $data[] = $row;
}

//Free memory and close DB connection
$result->close();
$conn->close();

// IMPORTANT, output the content of $data in JSON
echo json_encode($data);
?>
