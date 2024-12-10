<?php
// Enable CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database configuration
$servername = "localhost";
$username = "root";  // Your MySQL username
$password = "";      // Your MySQL password
$dbname = "interiordesignersystem";  // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch designs from the database
$sql = "SELECT Id, Name, Category, image FROM design";  // Modify table and columns as per your database
$result = $conn->query($sql);

// Fetch categories from the database
$sql_categories = "SELECT DISTINCT Category FROM design";  // Modify as needed
$category_result = $conn->query($sql_categories);

// Initialize an array to store the design data
$designs = [];
$categories = [];

// Fetch designs
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $designs[] = [
            "id" => $row["Id"],
            "Name" => $row["Name"],
            "Category" => $row["Category"],
            "image" => $row["image"]
        ];
    }
} 

// Fetch categories
if ($category_result->num_rows > 0) {
    while($category_row = $category_result->fetch_assoc()) {
        $categories[] = $category_row["Category"];
    }
} else {
    $categories = ["No categories found"];
}

// Return the designs and categories as a JSON response
header('Content-Type: application/json');
echo json_encode([
    "designs" => $designs,
    "categories" => $categories
]);

// Close the connection
$conn->close();
?>
