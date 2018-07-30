<?php
    include ('db.php');
    $currentDate = date('Y-m-d');
    $tryID = $_POST["my_id"]; //PARAMETER FROM AJAX.
    $sqlTrys = "UPDATE loginlist SET num_of_trys = num_of_trys + 1 WHERE email_id = '$tryID'";
    $mysqli->query($sqlTrys);
    echo "User $tryID upvoted!";
?>
