<?php
$servername = "localhost";
$username = "root";        // Adjust to your database username
$password = "";            // Adjust to your database password
$dbname = "interiordesignersystem";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}
?>
