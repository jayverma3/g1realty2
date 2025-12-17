<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../db.php';

if (!isset($_SESSION['admin_id'])) exit;

$id = intval($_POST['id']);
$status = $_POST['status'];

$stmt = $conn->prepare("
    UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?
");
$stmt->bind_param("si", $status, $id);
$stmt->execute();

echo json_encode(["success" => true]);
