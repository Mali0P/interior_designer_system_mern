<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS Headers - Allowing multiple origins
$allowedOrigins = [
    "http://localhost:5174", // React app running locally
    "http://localhost:5173", // Add more origins if needed
    "http://localhost:5172" // Add more origins if needed
];

$origin = $_SERVER['HTTP_ORIGIN'];
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

// Ensure image is uploaded
if (!isset($_FILES["image"])) {
    echo json_encode(['status' => 'error', 'message' => 'No image uploaded']);
    exit();
}

// Define target directory
$target_dir = "DesignImage/";
$target_file = $target_dir . basename($_FILES["image"]["name"]);

// Validate image
$check = getimagesize($_FILES["image"]["tmp_name"]);
if ($check === false) {
    echo json_encode(['status' => 'error', 'message' => 'File is not an image']);
    exit();
}

// Move uploaded file
if (!move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    echo json_encode(['status' => 'error', 'message' => 'Error uploading file']);
    exit();
}

// Connect to the database
$conn = new mysqli("localhost", "root", "", "interiordesignersystem");

// Check connection
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Sanitize and validate inputs
$designerId = intval($_POST['DesignerId']);
$name = $conn->real_escape_string(trim($_POST['Name']));
$height = floatval($_POST['Height']);
$width = floatval($_POST['Width']);
$description = $conn->real_escape_string(trim($_POST['Description']));
$image = $conn->real_escape_string(basename($_FILES["image"]["name"]));
$price = floatval($_POST['Price']);
$color = $conn->real_escape_string(trim($_POST['Color']));
$pattern = $conn->real_escape_string(trim($_POST['Pattern']));
$categories = $conn->real_escape_string($_POST['Category']); // Categories as a string of names (comma-separated)

// Insert design data into the database
$sql = "INSERT INTO design (DesignerId, Name, Height, Width, Description, image, Price, Color, Pattern, Category) 
        VALUES ('$designerId', '$name', '$height', '$width', '$description', '$image', '$price', '$color', '$pattern', '$categories')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success', 'message' => 'Design uploaded successfully!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $conn->error]);
}

// Close connection
$conn->close();
?>
