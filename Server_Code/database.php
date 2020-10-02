<?php
//Include variables for db connection
include 'SECRETS.php';

//db connection
$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

//error handling
if ($conn->connect_error) {
 die("Connection failed: " . $conn->connect_error);
} 

//sql statement to run
$sql = "SELECT Time, Run, pH, Temperature, Humidity, Pressure FROM Data;";

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
