<?php
//declare variables for db connection
$servername = "localhost:3306";
$username = "datasource";
$password = "DBPASSWORD";
$dbname = "SensorData";

//db connection
$conn = new mysqli($servername, $username, $password, $dbname);

//error handling
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
} 

//sql statement to run
$sql = "SELECT Temperature, Time, Run, BME_Temperature, BME_Humidity, BME_Pressure FROM Data;";

//run sql query and store into variable
$result = mysqli_query($conn,$sql);
$data = array();

foreach ($result as $row) {
 $data[] = $row;
}

//free memory and close db connection
$result->close();
$conn->close();

// IMPORTANT, output to json
echo json_encode($data);
?>
