<?php
/* Database connection settings */
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'sofgen';
$mysqli = new mysqli($host,$user,$pass,$db) or die($mysqli->error);
