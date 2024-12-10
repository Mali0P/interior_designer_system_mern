<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the configuration file
include('config.php');  // Ensure this file contains $conn setup

// CORS headers for multiple origins
$allowedOrigins = ["http://localhost:5173", "http://localhost:5172"];
$origin = $_SERVER['HTTP_ORIGIN'];

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Retrieve user ID from the request body
$data = json_decode(file_get_contents("php://input"), true);
$userId = isset($data['Userid']) ? intval($data['Userid']) : 0;

if ($userId > 0) {
    error_log("Deleting user with ID: " . $userId);  // Log for debugging

    $stmt = $conn->prepare("DELETE FROM user WHERE Userid = ?");
    $stmt->bind_param("i", $userId);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'User deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error deleting user']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid user ID']);
}

// Close the connection
$conn->close();
?>
