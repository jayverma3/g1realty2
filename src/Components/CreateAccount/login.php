<?php
require_once __DIR__ . '/db.php';

/* =========================
   INPUT
========================= */
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 8) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid credentials"]);
    exit;
}

/* =========================
   FETCH USER
========================= */
$stmt = $conn->prepare("
    SELECT id, full_name, password_hash, email_verified
    FROM users
    WHERE email = ?
");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows !== 1) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid email or password"]);
    exit;
}

$user = $result->fetch_assoc();

/* =========================
   VERIFY PASSWORD
========================= */
if (!password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(["error" => "Invalid email or password"]);
    exit;
}

if (!$user['email_verified']) {
    http_response_code(403);
    echo json_encode(["error" => "Email not verified"]);
    exit;
}

/* =========================
   SESSION
========================= */
$_SESSION['user_id'] = $user['id'];

echo json_encode([
    "success" => true,
    "user" => [
        "id"    => $user['id'],
        "name"  => $user['full_name'],
        "email" => $email
    ]
]);

$stmt->close();
$conn->close();
