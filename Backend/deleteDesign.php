<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS Headers
$allowed_origins = ["http://localhost:5174", "http://localhost:5173", "http://localhost:5172"];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : "";

// Check if the origin is allowed
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: http://localhost:5174");  // Fallback to a default origin if not allowed
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// If it's a preflight request (OPTIONS), allow it to continue
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$servername = "localhost";
$username = "root"; // Database username
$password = ""; // Database password
$dbname = "interiordesignersystem"; // Database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Read the incoming data (JSON)
$data = json_decode(file_get_contents('php://input'), true);

// Get the design ID from the request data
$designId = $data['id']; // Assuming you're sending the 'id' in the POST request body

// Ensure that the design ID is provided
if (isset($designId) && !empty($designId)) {
    // Prepare the DELETE query
    $sql = "DELETE FROM design WHERE Id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $designId); // Bind the integer parameter for the ID
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Design deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Design not found or already deleted']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Design ID is missing']);
}

$conn->close();
?>
