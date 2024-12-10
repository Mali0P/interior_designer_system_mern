<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// List of allowed origins
$allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174"
];

// Check if the incoming origin is in the list of allowed origins
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

// CORS Headers
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "interiordesignersystem";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Read the input data
$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['Id'])) {
    $designId = $conn->real_escape_string($input['Id']);

    // Delete design query
    $sql = "DELETE FROM design WHERE Id = '$designId'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success', 'message' => 'Design deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error deleting design: ' . $conn->error]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Design ID not provided']);
}

$conn->close();
?>
    