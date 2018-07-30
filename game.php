<?php
/* Displays user information and some useful messages */
session_start();

// Check if user is logged in using the session variable
if ( $_SESSION['logged_in'] != 1 ) {
  $_SESSION['message'] = "You must log in before playing the jackpot!";
  header("location: error.php");
}
else {
    // Makes it easier to read
    $email_id = $_SESSION['email_id']; //RANDOM EMAIL ID.
}
?>
<!DOCTYPE html>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type = "text/javascript">
function my_button ( email_id ) //RANDOM EMAIL ID. //ZUBAIR
{ $.ajax( { type    : "POST",
            data    : { "my_id" : email_id }, //RANDOM EMAIL ID.
            url     : "update_value.php",
            success : function ( data )
                      { alert( data );
                      },
            error   : function ( xhr )
                      { alert( "error" );
                      }
        } );
}//Run every time spin is clicked
    </script>
  </head>
  <body>
    <button onclick="my_button('<?php echo $email_id;?>')"> <!-- RANDOM EMAIL ID -->
            Increase my Tries!</button> <!--ZUBAIR-->
    <p><a href="logout.php">Head to logout Page!</a></p>
  </body>
</html>
