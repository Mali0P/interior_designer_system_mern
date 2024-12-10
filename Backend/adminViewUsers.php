<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers for multiple origins
$allowedOrigins = ["http://localhost:5173", "http://localhost:5172"];
$origin = $_SERVER['HTTP_ORIGIN'];

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}
header("Content-Type: application/json");

// Include the configuration file
include('config.php');

// Fetch users from the database
$query = "SELECT Userid, username, email, role FROM user";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode(['status' => 'success', 'users' => $users]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No users found or query failed']);
}

// Close connection
$conn->close();
?>
