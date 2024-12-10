<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get the origin of the request
$allowed_origins = ["http://localhost:5174", "http://localhost:5173", "http://localhost:5172"];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : "";

// Check if the origin is allowed
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: http://localhost:5174");  // Default fallback
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);  // Pre-flight request; exit if OPTIONS
}

// Get raw POST data (JSON)
$inputData = json_decode(file_get_contents('php://input'), true);

// Check if designerId is provided
if (!isset($inputData['designerId'])) {
    echo json_encode(['status' => 'error', 'message' => 'Designer ID is required']);
    exit();
}

$designerId = $inputData['designerId'];

// Database credentials
$servername = "localhost";
$username = "root";      // Adjust to your database username
$password = "";          // Adjust to your database password
$dbname = "interiordesignersystem";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// SQL query to fetch designs for the logged-in designer
$query = "SELECT Id, DesignerId, Name, Height, Width, Color, Pattern, Category, Description, image, Price FROM design WHERE DesignerId = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $designerId); // Bind the designerId parameter
$stmt->execute();
$result = $stmt->get_result();

$designs = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $designs[] = $row;  // Add each row to the designs array
    }
    echo json_encode(['status' => 'success', 'designs' => $designs]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No designs found for this designer']);
}

// Close the connection
$conn->close();
?>
