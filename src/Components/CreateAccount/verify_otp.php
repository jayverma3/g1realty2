<?php
require_once __DIR__ . '/db.php';

$email = trim($_POST['email'] ?? '');
$otp   = trim($_POST['otp'] ?? '');

if (!$email || !$otp) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
    exit;
}

$stmt = $conn->prepare("
    SELECT id, otp_code, otp_expires
    FROM users
    WHERE email = ?
");
$stmt->bind_param("s", $email);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();

if (!$user || $user['otp_code'] !== $otp || strtotime($user['otp_expires']) < time()) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or expired OTP"]);
    exit;
}

$update = $conn->prepare("
    UPDATE users
    SET email_verified = 1, otp_code = NULL, otp_expires = NULL
    WHERE id = ?
");
$update->bind_param("i", $user['id']);
$update->execute();

echo json_encode([
    "success" => true,
    "message" => "Email verified successfully"
]);

$update->close();
$stmt->close();
$conn->close();
