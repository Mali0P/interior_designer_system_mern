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
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection settings
$servername = "localhost";
$username = "root"; // Your database username
$password = "";     // Your database password
$dbname = "interiordesignersystem";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Fetch counts for users, designers, and designs
$userCount = $conn->query("SELECT COUNT(*) AS count FROM user")->fetch_assoc()['count'];
$designerCount = $conn->query("SELECT COUNT(*) AS count FROM user WHERE role='designer'")->fetch_assoc()['count'];
$designCount = $conn->query("SELECT COUNT(*) AS count FROM design")->fetch_assoc()['count'];

echo json_encode([
    'status' => 'success',
    'counts' => [
        'users' => $userCount,
        'designers' => $designerCount,
        'designs' => $designCount
    ]
]);

$conn->close(); // Close the database connection
?>
