<!-- This script adds a row to the data table. It is called 'hamilton/addrow.php?Temperature=22&Run=GettingThere' -->

<html>
   <body>
      <?php
         include 'SECRETS.php';
         // SECRETS.php defines $dbhost, $dbuser, $dbpass, and $dbname

         $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
   
         if(! $conn ) {
            die('Could not connect: ' . mysqli_error());
         }
         echo 'Connected successfully<br>';
         $RUN = $_GET["Run"];
         $BME_TEMPERATURE = $_GET["BME_Temperature"];
         $BME_HUMIDITY = $_GET["BME_Humidity"];
         $BME_PRESSURE = $_GET["BME_Pressure"];
         $sql = 'INSERT INTO Data(Run, BME_Temperature, BME_Humidity, BME_Pressure) VALUES (\''.$RUN.'\','.$BME_TEMPERATURE.','.$BME_HUMIDITY.','.$BME_PRESSURE.');';
         $result = mysqli_query($conn, $sql);
         
         mysqli_close($conn);
      ?>
   </body>
</html>
