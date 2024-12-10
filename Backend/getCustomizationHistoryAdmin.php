<?php
header('Access-Control-Allow-Origin: *'); // Adjust this to your frontend URL in production
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'interiordesignersystem');

if ($conn->connect_error) {
  die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$sql = "SELECT UserId, DesignerId, Width, Height, Color, Price, Description, imageName FROM customization_history";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $history = [];
  while ($row = $result->fetch_assoc()) {
    $history[] = $row;
  }
  echo json_encode($history);
} else {
  echo json_encode([]);
}

$conn->close();
?>
