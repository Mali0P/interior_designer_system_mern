<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Allow CORS for your frontend origin
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// Include your database connection
include('db_connection.php'); // Ensure db_connection.php is set up with your database credentials

// Check if UserId is passed via GET request
if (isset($_GET['UserId'])) {
    $userId = $_GET['UserId'];

    // Fetch customization history from the database for the given UserId
    $sql = "SELECT Id, UserId, DesignerId, Width, Height, Color, Price, Description, imageName FROM customization_history WHERE UserId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId); // Bind the UserId
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $history = [];
        while ($row = $result->fetch_assoc()) {
            $history[] = $row;
        }
        // Return the customization history in JSON format
        echo json_encode(["status" => "success", "history" => $history]);
    } else {
        // No data found
        echo json_encode(["status" => "fail", "message" => "No customizations found"]);
    }

    $conn->close();
} else {
    // UserId not provided
    echo json_encode(["status" => "fail", "message" => "UserId not provided"]);
}
?>
