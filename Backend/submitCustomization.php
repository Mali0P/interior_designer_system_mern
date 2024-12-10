<?php
// Allow CORS requests from any origin (adjust for production)
header("Access-Control-Allow-Origin: *"); // Replace '*' with your frontend URL for better security in production, e.g., "http://localhost:5173"
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Allow only POST and OPTIONS methods
header("Access-Control-Allow-Headers: Content-Type"); // Allow specific headers (Content-Type for JSON handling)

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "interiordesignersystem";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Retrieve JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['UserId'], $data['DesignerId'], $data['width'], $data['height'], $data['color'], $data['price'], $data['description'])) {
    echo json_encode(["status" => "error", "message" => "Incomplete data provided"]);
    exit;
}

// Sanitize input
$UserId = $conn->real_escape_string($data['UserId']);
$DesignerId = $conn->real_escape_string($data['DesignerId']);
$Width = $conn->real_escape_string($data['width']);
$Height = $conn->real_escape_string($data['height']);
$Color = $conn->real_escape_string($data['color']);
$Price = $conn->real_escape_string($data['price']);
$Description = $conn->real_escape_string($data['description']);

// Insert into database
$sql = "INSERT INTO customization (UserId, DesignerId, Width, Height, Color, Price, Description) 
        VALUES ('$UserId', '$DesignerId', '$Width', '$Height', '$Color', '$Price', '$Description')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Customization submitted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

// Close connection
$conn->close();
?>
