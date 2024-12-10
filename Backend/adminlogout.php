<?php
// Enable error reporting for debugging (optional)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start the session
session_start();

// Allow cross-origin requests (CORS) for specific origins
$allowed_origins = ["http://localhost:5174", "http://localhost:3000"];  // Add your frontend origins here
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  // Allow necessary methods

// Handle OPTIONS request for preflight check (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Return success for preflight
    exit();
}

// Check if the user is logged in as admin
if (isset($_SESSION['role']) && $_SESSION['role'] === 'admin') {
    // Destroy the session
    session_destroy();

    // Expire the session cookie (if it's being used)
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
    }

    // Return a success response
    echo json_encode(['status' => 'success', 'message' => 'Admin logged out successfully']);
} else {
    // If not logged in as admin, return an error response
    echo json_encode(['status' => 'error', 'message' => 'Not logged in as admin']);
}
?>
