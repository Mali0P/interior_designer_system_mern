<?php
header('Access-Control-Allow-Origin: *'); // Allow all origins (or specify your React app URL)
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allowed headers

header('Content-Type: application/json'); // Ensure the response is JSON
$conn = new mysqli('localhost', 'root', '', 'interiordesignersystem');

// Check for connection errors
if ($conn->connect_error) {
  die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$sql = "SELECT Id, UserId, DesignerId, Width, Height, Color, Price, Description FROM customization";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $customizations = [];
  while ($row = $result->fetch_assoc()) {
    $customizations[] = $row;
  }
  echo json_encode($customizations);
} else {
  echo json_encode([]);
}

$conn->close();
?>
