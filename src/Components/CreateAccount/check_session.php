<?php
require_once __DIR__ . '/db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["authenticated" => false]);
    exit;
}

$stmt = $conn->prepare("
    SELECT id, full_name, email
    FROM users
    WHERE id = ?
");
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    session_destroy();
    http_response_code(401);
    echo json_encode(["authenticated" => false]);
    exit;
}

$user = $result->fetch_assoc();

echo json_encode([
    "authenticated" => true,
    "user" => $user
]);

$stmt->close();
$conn->close();
