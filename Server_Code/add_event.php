<html>
   <body>
      <?php
         include 'SECRETS.php';
         // SECRETS.php defines $dbhost, $dbuser, $dbpass, and $dbname
         $mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

        // check connection
        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        }

        echo $mysqli->host_info . "\n";

        echo $description."\n";

        if(! ($stmt = $mysqli->prepare("INSERT INTO Data(Run, Location, EventType, EventDescription) VALUES (?, ?, ?, ?)"))){echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;}
        echo 'Prepare worked!'."\n";
        if(! ($stmt->bind_param('ssss', $run, $location, $type, $description))){echo 'Binding failed!';}
        echo 'Prepare and bind worked!'."\n";

        // execute prepared statement
        $run = "GettingThere";
        $location = "Mother";
        $type = htmlspecialchars($_POST["event_type"]);
        $description = htmlspecialchars($_POST["event_description"]);
        $stmt->execute();

        printf("%d Row inserted.\n", $stmt->affected_rows);

        // close statement and connection
        $stmt->close();
        $mysqli->close();

        echo '<br>Bye!';
        ?>

        <button type="button"
        onclick="window.open('', '_self', ''); window.close();">Close window</button>
   </body>
</html>
