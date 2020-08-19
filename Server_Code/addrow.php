<!-- This script adds a row to the data table. It is called 'hamilton/addrow.php?Temperature=22&Run=GettingThere' -->

<html>
   <body>
      <?php
         $dbhost = 'localhost:3306';
         $dbuser = 'datasource';
         $dbpass = 'PASSWORD';
         $dbname = 'SensorData';
         $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
   
         if(! $conn ) {
            die('Could not connect: ' . mysqli_error());
         }
         echo 'Connected successfully<br>';
         // Get data from HTTP request and store in local variables
         $TEMPERATURE = $_GET["Temperature"];
         $RUN = $_GET["Run"];
         $BME_TEMPERATURE = $_GET["BME_Temperature"];
         $BME_HUMIDITY = $_GET["BME_Humidity"];
         $BME_PRESSURE = $_GET["BME_Pressure"];
         // Compose SQL query that inserts the data into the table 'Data'.
         $sql = 'INSERT INTO Data(Temperature, Run, BME_Temperature, BME_Humidity, BME_Pressure) VALUES ('.$TEMPERATURE.',\''.$RUN.'\','.$BME_TEMPERATURE.','.$BME_HUMIDITY.','.$BME_PRESSURE.');';
         //Execute SQL query against database 'SensorData'.
         $result = mysqli_query($conn, $sql);
         mysqli_close($conn);
      ?>
   </body>
</html>
