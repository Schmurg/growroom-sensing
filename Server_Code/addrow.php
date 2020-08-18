<!-- This script adds a row to the data table. It is called 'hamilton/addrow.php?Temperature=22&Run=GettingThere' -->

<html>
   <head>
      <title>Selecting Table in MySQLi Server</title>
   </head>

   <body>
      <?php
         $dbhost = 'localhost:3306';
         $dbuser = 'datasource';
         $dbpass = 'k9Iis8G6P0l';
         $dbname = 'SensorData';
         $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
   
         if(! $conn ) {
            die('Could not connect: ' . mysqli_error());
         }
         echo 'Connected successfully<br>';
         $TEMPERATURE = $_GET["Temperature"];
         $RUN = $_GET["Run"];
         $BME_TEMPERATURE = $_GET["BME_Temperature"];
         $BME_HUMIDITY = $_GET["BME_Humidity"];
         $BME_PRESSURE = $_GET["BME_Pressure"];
         $sql = 'INSERT INTO Data(Temperature, Run, BME_Temperature, BME_Humidity, BME_Pressure) VALUES ('.$TEMPERATURE.',\''.$RUN.'\','.$BME_TEMPERATURE.','.$BME_HUMIDITY.','.$BME_PRESSURE.');';
         $result = mysqli_query($conn, $sql);
         if ($result === TRUE){echo 'Values inserted into database';}
         if ($result === FALSE){echo 'Values NOT inserted into database';}   
         mysqli_close($conn);
      ?>
   </body>
</html>
