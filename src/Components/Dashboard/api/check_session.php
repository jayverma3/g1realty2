<?php
header('Content-Type: application/json');

ini_set('session.use_strict_mode', 1);
ini_set('session.use_only_cookies', 1);

session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'domain'   => '.global1realty.com',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();
require_once __DIR__ . '/db.php';

if (empty($_SESSION['user_id'])) {
    echo json_encode(["authenticated" => false]);
    exit;
}

$stmt = $conn->prepare("
    SELECT id, full_name, email
    FROM users
    WHERE id = ?
    LIMIT 1
");
$stmt->bind_param("i", $_SESSION['user_id']);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    session_destroy();
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
