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

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection details
$servername = "localhost";
$username = "root";  // Your database username
$password = "";      // Your database password
$dbname = "interiordesignersystem";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Get data from the request
$data = json_decode(file_get_contents('php://input'), true);
$categoryId = $data['categoryId'] ?? null;

// Validate input
if (empty($categoryId)) {
    http_response_code(400);  // Bad request status
    echo json_encode(['status' => 'error', 'message' => 'Category ID is required']);
    exit();
}

// Prepare and execute DELETE query
$sql = "DELETE FROM category WHERE CategoryId = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement']);
    exit();
}

$stmt->bind_param("i", $categoryId);
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Category deleted successfully']);
    } else {
        http_response_code(404);  // Not found status
        echo json_encode(['status' => 'error', 'message' => 'Category not found or already deleted']);
    }
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Error deleting category: ' . $stmt->error]);
}

// Close resources
$stmt->close();
$conn->close();
?>
