<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../db.php';

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $conn->prepare("
    SELECT id, name, password_hash, role
    FROM admins
    WHERE email = ?
");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid login"]);
    exit;
}

$admin = $result->fetch_assoc();

if (!password_verify($password, $admin['password_hash'])) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid login"]);
    exit;
}

$_SESSION['admin_id'] = $admin['id'];
$_SESSION['admin_role'] = $admin['role'];

echo json_encode(["success" => true]);
