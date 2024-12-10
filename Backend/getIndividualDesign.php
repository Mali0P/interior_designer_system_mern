<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS Headers
$allowedOrigins = [
    "http://localhost:5174",
    "http://localhost:5173",
    "http://localhost:5172"
];

// Check if the request origin is in the allowed list
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
} else {
    // Default fallback or restrict if origin is not allowed
    header("Access-Control-Allow-Origin: null");
}

header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Check if 'id' parameter is provided in the query string
if (!isset($_GET['id'])) {
    echo json_encode(['status' => 'error', 'message' => 'No design ID provided']);
    exit();
}

$designId = intval($_GET['id']); // Sanitize input by converting to integer

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

// Query to fetch the individual design by ID (including Category, Pattern, Color, and DesignerId)
$sql = "SELECT Id, Name, Height, Width, Description, image, Price, Category, Pattern, Color, DesignerId FROM design WHERE Id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $designId);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $design = $result->fetch_assoc();
    echo json_encode(['status' => 'success', 'design' => $design]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Design not found']);
}

$stmt->close();
$conn->close(); // Close the database connection
?>
