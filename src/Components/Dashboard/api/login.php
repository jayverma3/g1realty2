<?php
header('Content-Type: application/json');

require_once __DIR__ . '/session_bootstrap.php';
require_once __DIR__ . '/db.php';

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid credentials"]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT id, full_name, email, password_hash, email_verified
     FROM users WHERE email = ? LIMIT 1"
);
$stmt->bind_param("s", $email);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid email or password"]);
    exit;
}

if ((int)$user['email_verified'] !== 1) {
    http_response_code(403);
    echo json_encode(["error" => "Email not verified"]);
    exit;
}

session_regenerate_id(true);
$_SESSION['user_id'] = $user['id'];

echo json_encode([
    "success" => true,
    "user" => [
        "id" => $user['id'],
        "full_name" => $user['full_name'],
        "email" => $user['email']
    ]
]);
exit;
