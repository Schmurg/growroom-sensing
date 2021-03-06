<!-- This script adds a row to the data table. It is called 'hamilton/addrow.php?Temperature=22&Run=GettingThere' -->

<html>
   <body>
      <?php
         include '../misc/SECRETS.php';
         // SECRETS.php defines $dbhost, $dbuser, $dbpass, and $dbname

         $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
   
         if(! $conn ) {
            die('Could not connect: ' . mysqli_error());
         }
         echo 'Connected successfully<br>';
         if(isset($_GET["pH"])){
            $RUN = $_GET["Run"];
            $LOCATION = $_GET["Location"];
            $PROBE = $_GET["Probe"];
            $pH = $_GET["pH"];
            $sql = 'INSERT INTO pHs(Run, Location, Probe, pH) VALUES (\''.$RUN.'\',\''.$LOCATION.'\',\''.$PROBE.'\','.$pH.');';
            $result = mysqli_query($conn, $sql);
            mysqli_close($conn);
         }
         elseif(isset($_GET["EC"])){
            $RUN = $_GET["Run"];
            $LOCATION = $_GET["Location"];
            $EC = $_GET["EC"];
            $sql = 'INSERT INTO ECs(Run, Location, EC) VALUES (\''.$RUN.'\',\''.$LOCATION.'\','.$EC.');';
            $result = mysqli_query($conn, $sql);
            mysqli_close($conn);
         }
         elseif(isset($_GET["Temperature"])){
            $RUN = $_GET["Run"];
            $LOCATION = $_GET["Location"];
            $TEMPERATURE = $_GET["Temperature"];
            $HUMIDITY = $_GET["Humidity"];
            $PRESSURE = $_GET["Pressure"];
            //$sql = 'INSERT INTO Temperatures (Run, Location, Temperature, Humidity, Pressure) VALUES (\''.$RUN.'\',\''.$LOCATION.'\','.$TEMPERATURE.','.$HUMIDITY.','.$PRESSURE.');';
            $sql1 = 'INSERT INTO Temperatures (Run, Location, Temperature, Medium) VALUES (\''.$RUN.'\',\''.$LOCATION.'\','.$TEMPERATURE.', \'air\');';
            $sql2 = 'INSERT INTO Humidities (Run, Location, Humidity) VALUES (\''.$RUN.'\',\''.$LOCATION.'\','.$HUMIDITY.');';
            $sql3 = 'INSERT INTO Pressures (Run, Location, Pressure) VALUES (\''.$RUN.'\',\''.$LOCATION.'\','.$PRESSURE.');';
            $result = mysqli_query($conn, $sql1);
            mysqli_query($conn, $sql2);
            mysqli_query($conn, $sql3);
            mysqli_close($conn);
          }else{die('Required data not specified.');}
          if($result){echo 'Written to database.';}
          else{echo 'NOT written to database.';}
      ?>
   </body>
</html>
