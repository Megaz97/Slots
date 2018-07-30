
<?php
/* Main page with two forms: sign up and log in */
require 'db.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if (isset($_POST['login'])) { //user logging in

        require 'login.php';

    }
}
?>
<!DOCTYPE html>
<html>
<head>
  <title>SOFGEN Jackpot</title>
  <?php include 'css/css.html'; ?>
</head>
<body>
  <div class="form">

      <ul class="tab-group">
        <li class="tab"><a href="#signup">Game Rules</a></li>
        <li class="tab active"><a href="#login">Start Playing</a></li>
      </ul>

      <div class="tab-content">

         <div id="login">
          <h1>SOFGEN Jackpot</h1>

          <form action="index.php" method="post" autocomplete="off">

            <div class="field-wrap">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="email" required autocomplete="off" name="email"/>
          </div>

          <button class="button button-block" name="login" />Enter!</button>

          </form>

        </div>

        <div id="signup">
          <h1>Game Rules</h1>

          <p class="rules">1. 3 Tries Per Day</p>
          <p class="rules">2. Maximum of 3 Prizes to be won daily</p>
          <p class="rules">3. Remaining Prizes will be awarded in Wildcard Draw</p>
          <p class="rules">4. Event will finish on 27th February.</p>

        </div>

      </div><!-- tab-content -->

</div> <!-- /form -->
  <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

    <script src="js/index.js"></script>

</body>
</html>
