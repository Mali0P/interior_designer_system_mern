<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow cross-origin requests
$allowed_origins = ["http://localhost:5174", "http://localhost:5173", "http://localhost:5172"];
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : "";
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: http://localhost:5174");  // Default fallback
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database credentials
$servername = "localhost";
$username = "root";      // Adjust to your database username
$password = "";          // Adjust to your database password
$dbname = "interiordesignersystem"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get POST data
$input = json_decode(file_get_contents("php://input"), true);  // Decode JSON request body
$designerId = isset($input['designerId']) ? $input['designerId'] : null;

if (!$designerId) {
    echo json_encode(['status' => 'error', 'message' => 'Designer ID is required']);
    exit;
}

// Debugging: Log the received designerId
error_log("Designer ID: " . $designerId);

// SQL query to fetch customization requests for the given designer ID
$query = "SELECT Id, UserId, DesignerId, Width, Height, Color, Price, Description FROM customization WHERE DesignerId = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $designerId);  // Bind the designerId as an integer
$stmt->execute();
$result = $stmt->get_result();

$requests = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;  // Add each row to the requests array
    }
    echo json_encode(['status' => 'success', 'requests' => $requests]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No customization requests found']);
}

// Close the connection
$conn->close();
?>
