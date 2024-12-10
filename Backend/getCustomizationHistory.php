<?php 
// getCustomizationHistory.php
header('Content-Type: application/json');

// Allow multiple origins
$allowedOrigins = [
    'http://localhost:5173',  // React development server
    'http://localhost:5174',  // Another allowed origin
    'http://localhost:5175'   // Additional allowed origin
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");
} else {
    header("Access-Control-Allow-Origin: null");
}

include('db_connection.php'); // Ensure this includes your database connection setup

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(); // Exit early for pre-flight requests
}

if (isset($_GET['UserId'])) {
    $userId = $_GET['UserId'];

    // Correct query with valid column names
    $sql = "SELECT Id, UserId, DesignerId, Width, Height, Color, Price, Description, Date FROM customization WHERE UserId = ? ORDER BY Date DESC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $history = [];
        while ($row = $result->fetch_assoc()) {
            $history[] = $row;
        }
        echo json_encode(["status" => "success", "history" => $history]);
    } else {
        echo json_encode(["status" => "fail", "message" => "No customizations found"]);
    }
} else {
    echo json_encode(["status" => "fail", "message" => "UserId not provided"]);
}

$conn->close();
?>
