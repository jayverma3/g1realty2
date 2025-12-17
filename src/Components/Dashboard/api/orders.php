<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../db.php';

if (!isset($_SESSION['admin_id'])) {
    http_response_code(401);
    exit;
}

$result = $conn->query("
    SELECT o.*, u.email
    FROM orders o
    JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
");

echo json_encode(["orders" => $result->fetch_all(MYSQLI_ASSOC)]);
