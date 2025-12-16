<?php
require_once __DIR__ . '/db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$stmt = $conn->prepare("
    SELECT full_name, email, created_at
    FROM users
    WHERE id = ?
");
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

echo json_encode([
    "success" => true,
    "dashboard" => [
        "name"       => $user['full_name'],
        "email"      => $user['email'],
        "joined"     => $user['created_at'],
        "role"       => "customer"
    ]
]);

$stmt->close();
$conn->close();
