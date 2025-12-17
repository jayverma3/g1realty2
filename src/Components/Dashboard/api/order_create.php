<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$title = trim($_POST['title'] ?? '');
$description = trim($_POST['description'] ?? '');
$amount = floatval($_POST['amount'] ?? 0);

if ($title === '') {
    http_response_code(400);
    echo json_encode(["error" => "Title required"]);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO orders (user_id, title, description, amount)
    VALUES (?, ?, ?, ?)
");
$stmt->bind_param("issd", $_SESSION['user_id'], $title, $description, $amount);
$stmt->execute();

echo json_encode(["success" => true]);
$stmt->close();
$conn->close();
