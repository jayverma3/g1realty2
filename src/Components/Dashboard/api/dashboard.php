<?php
header('Content-Type: application/json');

require_once __DIR__ . '/session_bootstrap.php';
require_once __DIR__ . '/db.php';

if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid session"]);
    exit;
}

$stmt = $conn->prepare(
    "SELECT id, full_name, email, created_at
     FROM users WHERE id = ? LIMIT 1"
);
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

if (!$user) {
    session_destroy();
    http_response_code(401);
    echo json_encode(["error" => "Session expired"]);
    exit;
}

echo json_encode(["user" => $user]);
exit;
