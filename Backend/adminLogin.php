<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start the session
session_start();

// Allow cross-origin requests (CORS) for multiple origins
$allowed_origins = ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174"];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Return success for preflight
    exit();
}

// Connect to the MySQL database
$db_conn = mysqli_connect("localhost", "root", "", "interiordesignersystem");
if ($db_conn === false) {
    die(json_encode(['success' => false, 'error' => 'Database connection failed']));  // Return error if DB connection fails
}

// Get the HTTP method (POST, GET, etc.)
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        // Parse the JSON payload
        $adminData = json_decode(file_get_contents("php://input"));

        // Validate if email and password are provided
        if (isset($adminData->email, $adminData->password)) {
            // Sanitize inputs
            $email = mysqli_real_escape_string($db_conn, $adminData->email);
            $password = mysqli_real_escape_string($db_conn, $adminData->password);

            // Fetch admin by email
            $stmt = $db_conn->prepare("SELECT * FROM admin WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($row = $result->fetch_assoc()) {
                // Check if password matches
                if ($password === $row['password']) {
                    // Store admin data in session
                    $_SESSION['admin_email'] = $row['email'];

                    // Send success response with admin data
                    echo json_encode([
                        "success" => true,
                        "message" => "Login successful",
                        "admin_email" => $_SESSION['admin_email'],
                    ]);
                } else {
                    echo json_encode(["success" => false, "error" => "Invalid credentials"]);
                }
            } else {
                echo json_encode(["success" => false, "error" => "Admin not found"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "error" => "Email and password are required"]);
        }
        break;

    default:
        echo json_encode(["success" => false, "error" => "Method not supported"]);
        break;
}

// Close the database connection
mysqli_close($db_conn);
?>
