<?php
/* User login process, checks if user exists and password is correct */

//Constant Variables
$stateWon = 1;
$maxTrys = 3;
$currentDate = date('Y-m-d');
$resetTrys = 0;

// Escape email to protect against SQL injections
$email = $mysqli->escape_string($_POST['email']);

//QUERIES
//Result to find Existing ID
$result = $mysqli->query("SELECT * FROM loginlist WHERE email_id='$email'");
//Result to find out the Maximum winners for today
$result2 = $mysqli->query("SELECT * FROM loginlist WHERE (state_won = '$stateWon') AND (last_played = '$currentDate') ");
//Update Date and number of trys

if ( $result->num_rows == 0 ){ // User doesn't exist
    $_SESSION['message'] = "User with that email doesn't exist!";
    header("location: error.php");
}
elseif ( $result2->num_rows >= 3 ) {
  $_SESSION['message'] = "Opps! Looks like we have reached the maximum number of winners today. Try again tomorrow eh!";
  header("location: error.php");
}
else { // User exists
    $user = $result->fetch_assoc();
    //Run checks
    if ( $user['state_won'] == $stateWon ) {
        $_SESSION['message'] = "You have already won! Thank you for playing";
        header("location: error.php");
    }
    elseif ( $user['num_of_trys'] >= $maxTrys && $user['last_played'] == $currentDate ) {
        $_SESSION['message'] = "You have reached your maximum tries. Please try again tomorrow!";
        header("location: error.php");
    }
    elseif ( $user['last_played'] < $currentDate ) {

        // this person has already played yesterday and has t be reset today
        $mysqli->query("UPDATE loginlist SET num_of_trys = '$resetTrys', last_played = '$currentDate'
           WHERE email_id = '$email'");

        $_SESSION['email_id'] = $user['email_id'];
        $_SESSION['state_won'] = $user['state_won'];
        $_SESSION['last_played'] = $user['last_played'];
        $_SESSION['num_of_trys'] = $user['num_of_trys'];

        // This is how we'll know the user is logged in
        $_SESSION['logged_in'] = true;
        header("location: game.php");
      }
    else {
        $_SESSION['email_id'] = $user['email_id'];
        $_SESSION['state_won'] = $user['state_won'];
        $_SESSION['last_played'] = $user['last_played'];
        $_SESSION['num_of_trys'] = $user['num_of_trys'];

        // This is how we'll know the user is logged in
        $_SESSION['logged_in'] = true;
        header("location: game.php");
      }
}
