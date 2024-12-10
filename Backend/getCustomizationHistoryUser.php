<?php
header('Content-Type: application/json');

// Allowed origins (for development, add more as needed)
$allowedOrigins = [
    'http://localhost:5173',  // React development server
];

// Get the origin of the request
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
} else {
    // Handle unexpected origins
    header("HTTP/1.1 403 Forbidden");
    echo json_encode(["status" => "fail", "message" => "Origin not allowed"]);
    exit();
}

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
include('db_connection.php');

if (isset($_GET['UserId'])) {
    $userId = intval($_GET['UserId']);

    // Fetch required fields only
    $sql = "SELECT Width, Height, Color, Price, Description FROM customization WHERE UserId = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(["status" => "error", "message" => "Query preparation failed: " . $conn->error]);
        exit();
    }
    
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

// Close connection
$stmt->close();
$conn->close();
?>
