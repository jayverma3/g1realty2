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
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid OTP"]);
    exit;
}

$user = $result->fetch_assoc();

/* =========================
   OTP VALIDATION
========================= */
if (
    $user['otp_code'] !== $otp ||
    strtotime($user['otp_expires']) < time()
) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or expired OTP"]);
    exit;
}

/* =========================
   UPDATE USER
========================= */
$update = $conn->prepare("
    UPDATE users
    SET email_verified = 1,
        otp_code = NULL,
        otp_expires = NULL
    WHERE id = ?
");
$update->bind_param("i", $user['id']);

if (!$update->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Verification failed"]);
    exit;
}

echo json_encode([
    "success" => true,
    "message" => "Email verified successfully"
]);

error_log("OTP verified for user ID: " . $user['id']);

$update->close();
$stmt->close();
$conn->close();
