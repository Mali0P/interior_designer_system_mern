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
        // Parse the JSON payload for login or registration
        $userData = json_decode(file_get_contents("php://input"));

        // Handle login if email and password are provided
        if (isset($userData->email, $userData->password) && !isset($userData->username)) {
            // Fetch user by email
            $stmt = $db_conn->prepare("SELECT * FROM user WHERE email = ?");
            $stmt->bind_param("s", $userData->email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($row = $result->fetch_assoc()) {
                // Directly compare passwords (for now, this is not recommended, consider hashing)
                if ($userData->password === $row['password']) {
                    // Store user data in the session
                    $_SESSION['user_id'] = $row['Userid'];
                    $_SESSION['user_email'] = $row['email'];
                    $_SESSION['user_role'] = $row['role'];
                    $_SESSION['username'] = $row['username']; // Ensure the username is saved
                    $_SESSION['address'] = $row['address']; // Store the address

                    // Send response with user data
                    echo json_encode([
                        "success" => true,
                        "message" => "Login successful",
                        "user_id" => $_SESSION['user_id'],
                        "user_email" => $_SESSION['user_email'],
                        "user_role" => $_SESSION['user_role'],
                        "username" => $_SESSION['username'],
                        "address" => $_SESSION['address']
                    ]);
                } else {
                    echo json_encode(["success" => false, "error" => "Invalid credentials"]);
                }
            } else {
                echo json_encode(["success" => false, "error" => "User not found"]);
            }
            $stmt->close();
        } 
        // Handle user registration
        else if (isset($userData->username, $userData->email, $userData->address, $userData->role, $userData->password)) {
            // Check if email already exists
            $stmt = $db_conn->prepare("SELECT * FROM user WHERE email = ?");
            $stmt->bind_param("s", $userData->email);
            $stmt->execute();
            if ($stmt->get_result()->num_rows > 0) {
                echo json_encode(["success" => false, "error" => "Email already exists"]);
                $stmt->close();
                break;
            }
            $stmt->close();

            // Insert new user without hashing the password (not secure: do not use in production)
            $stmt = $db_conn->prepare("INSERT INTO user (username, email, address, role, password) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("sssss", $userData->username, $userData->email, $userData->address, $userData->role, $userData->password);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "User added successfully"]);
            } else {
                echo json_encode(["success" => false, "error" => "Failed to add user"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "error" => "Missing required fields"]);
        }
        break;

    case "GET":
        // Check if the user is logged in and has the necessary role
        if (isset($_SESSION['user_role']) && $_SESSION['user_role'] === 'admin') {
            // Admin user can fetch all users
            $query = "SELECT Userid, username, email, role FROM user";
            $result = $db_conn->query($query);

            if ($result->num_rows > 0) {
                $users = [];
                while ($row = $result->fetch_assoc()) {
                    $users[] = $row;
                }
                echo json_encode($users);
            } else {
                echo json_encode(["success" => false, "error" => "No users found"]);
            }
        } else {
            // Return error if not an admin
            echo json_encode(["success" => false, "error" => "Unauthorized access"]);
        }
        break;

    default:
        echo json_encode(["success" => false, "error" => "Method not supported"]);
        break;
}

// Close the database connection
mysqli_close($db_conn);
?>
