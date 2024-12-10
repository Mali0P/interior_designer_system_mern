<?php
// recommendationAlgorithm.php

// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:5173");  // Frontend origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Allowed methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Allowed headers
header("Access-Control-Allow-Credentials: true");  // If credentials are needed

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;  
}


include('db_connection.php');


if (isset($_GET['UserId'])) {
    $userId = $_GET['UserId'];

    
    $sql = "SELECT * FROM customization WHERE UserId = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $customizations = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $customizations[] = $row;
        }


        echo json_encode(["status" => "success", "recommendations" => $customizations]);
    } else {
        echo json_encode(["status" => "fail", "message" => "No customizations found"]);
    }

} else {
    echo json_encode(["status" => "fail", "message" => "UserId not provided"]);
}

$conn->close();
?>
