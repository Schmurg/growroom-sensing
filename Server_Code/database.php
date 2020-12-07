<?php
//Include variables for db connection
include '../misc/SECRETS.php';

$days = $_POST['nr_days'];
$type = $_POST['type'];

//db connection
$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

//error handling
if (!$conn) {
 die("Connection failed: " . mysqli_error());
}

//sql statements to run
$sql_pH = "SELECT Time, pH FROM pHs WHERE Time >= DATE_SUB(NOW(), INTERVAL ".$days." DAY);";
$sql_Temperature = "SELECT Time, Temperature FROM Temperatures WHERE Time >= DATE_SUB(NOW(), INTERVAL ".$days." DAY);";
$sql_Humidity = "SELECT Time, Humidity FROM Humidities WHERE Time >= DATE_SUB(NOW(), INTERVAL ".$days." DAY);";


switch($type){
    case "pH":
        $sql = $sql_pH;
    break;
    case "Temperature":
        $sql = $sql_Temperature;
    break;
    case "Humidity":
        $sql = $sql_Humidity;
    break;
    default:
        die("No data type.");     
}

//run sql query and store into variable
$result = mysqli_query($conn,$sql);
$data = array();

foreach ($result as $row) {
 $data[] = $row;
}

//free memory and close db connection
mysqli_close($conn);

// IMPORTANT, output to json
echo json_encode($data);
?>
