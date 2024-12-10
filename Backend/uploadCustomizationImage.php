<?php
// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root"; // Change to your database username
$password = ""; // Change to your database password
$dbname = "interiordesignersystem"; // Change to your database name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the file and requestId are set
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK && isset($_POST['requestId'])) {
    $image = $_FILES['image'];
    $requestId = $_POST['requestId'];

    // Ensure the file is an image (basic check)
    if (getimagesize($image['tmp_name']) !== false) {
        // Set upload directory
        $uploadDir = 'customization_images/'; // Make sure the 'uploads' directory exists and is writable
        $uploadFile = $uploadDir . basename($image['name']);

        // Move the uploaded file to the destination folder
        if (move_uploaded_file($image['tmp_name'], $uploadFile)) {
            // Store the customization details in the database
            // Get the customization details (UserId, DesignerId, etc.) associated with this request
            $stmt = $conn->prepare("SELECT UserId, DesignerId, Width, Height, Color, Price, Description FROM customization WHERE Id = ?");
            $stmt->bind_param("i", $requestId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $userId = $row['UserId'];
                $designerId = $row['DesignerId'];
                $width = $row['Width'];
                $height = $row['Height'];
                $color = $row['Color'];
                $price = $row['Price'];
                $description = $row['Description'];

                // Insert the customization history details along with the image
                $insertStmt = $conn->prepare("INSERT INTO customization_history (UserId, DesignerId, Width, Height, Color, Price, Description, imageName) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
                $insertStmt->bind_param("iiissdss", $userId, $designerId, $width, $height, $color, $price, $description, $image['name']);
                $insertStmt->execute();

                // Delete the customization request from the 'customization' table after image upload
                $deleteStmt = $conn->prepare("DELETE FROM customization WHERE Id = ?");
                $deleteStmt->bind_param("i", $requestId);
                $deleteStmt->execute();

                echo json_encode(["status" => "success", "message" => "Image uploaded and customization history recorded successfully, request deleted"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Customization request not found"]);
            }

            $stmt->close();
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to move uploaded file"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "File is not a valid image"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "No file uploaded or missing request ID", "error_details" => isset($_FILES['image']) ? $_FILES['image']['error'] : "No image file found"]);
}

$conn->close();
?>
