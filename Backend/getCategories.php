<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allowed Origins Array
$allowed_origins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
    http_response_code(403);  // Forbidden if origin not allowed
    echo json_encode(['status' => 'error', 'message' => 'Origin not allowed']);
    exit();
}

header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "interiordesignersystem";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// SQL query to select categories
$sql = "SELECT CategoryId, Category FROM category";
$result = $conn->query($sql);

// Fetch data if query is successful
if ($result) {
    if ($result->num_rows > 0) {
        $categories = [];
        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }
        echo json_encode(['status' => 'success', 'categories' => $categories]);
    } else {
        http_response_code(404);  // Not found
        echo json_encode(['status' => 'error', 'message' => 'No categories found']);
    }
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Query error: ' . $conn->error]);
}

// Close the database connection
$conn->close();
?>
