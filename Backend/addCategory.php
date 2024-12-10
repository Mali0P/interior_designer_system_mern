<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allowed Origins Array
$allowed_origins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Decode the JSON input
$data = json_decode(file_get_contents("php://input"));
$category = trim($data->category ?? ''); // Ensure it's not null and remove whitespace

// Validate input
if (empty($category)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Category name is required']);
    exit();
}

// Database connection
$servername = "localhost";
$username = "root";  // Your database username
$password = "";      // Your database password
$dbname = "interiordesignersystem";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Use prepared statement to insert data securely
$sql = "INSERT INTO category (Category) VALUES (?)";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Error preparing statement']);
    exit();
}

$stmt->bind_param("s", $category);  // Bind the category parameter

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Category added successfully']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Error adding category: ' . $stmt->error]);
}

// Close resources
$stmt->close();
$conn->close();
?>
