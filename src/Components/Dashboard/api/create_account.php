<?php
header('Content-Type: application/json');

ini_set('display_errors', '0');
error_reporting(E_ALL);

/* =========================
   Global Error Handlers
========================= */
set_exception_handler(function ($e) {
    http_response_code(500);
    error_log("Exception: " . $e->getMessage());
    echo json_encode(["error" => "Server exception"]);
    exit;
});

register_shutdown_function(function () {
    $err = error_get_last();
    if ($err) {
        http_response_code(500);
        error_log("Fatal error: " . $err['message']);
        echo json_encode(["error" => "Fatal server error"]);
        exit;
    }
});

/* =========================
   DB CONFIG (Hostinger)
========================= */
$servername = "localhost";
$username   = "u517155263_g1realtydbuser";
$password   = "JayVerma@2001145";
$dbname     = "u517155263_g1realtydb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}

/* =========================
   CREATE USERS TABLE
========================= */
$tableSql = "
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email_verified TINYINT(1) DEFAULT 0,
    otp_code VARCHAR(10),
    otp_expires DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (!$conn->query($tableSql)) {
    http_response_code(500);
    echo json_encode(["error" => "Table creation failed"]);
    exit;
}

/* =========================
   INPUT SANITIZATION
========================= */
$fullName = trim($_POST['name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

/* =========================
   VALIDATION
========================= */
if (strlen($fullName) < 3) {
    http_response_code(400);
    echo json_encode(["error" => "Name too short"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email"]);
    exit;
}

if (
    !preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/', $password)
) {
    http_response_code(400);
    echo json_encode([
        "error" => "Password must be 8+ chars, include upper, lower, number & symbol"
    ]);
    exit;
}

/* =========================
   CHECK EXISTING USER
========================= */
$checkStmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["error" => "Account already exists"]);
    exit;
}
$checkStmt->close();

/* =========================
   PASSWORD HASH + OTP
========================= */
$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$otpCode      = random_int(100000, 999999);
$otpExpires  = date('Y-m-d H:i:s', time() + (10 * 60));

/* =========================
   INSERT USER
========================= */
$insertSql = "
INSERT INTO users (full_name, email, password_hash, otp_code, otp_expires)
VALUES (?, ?, ?, ?, ?)
";

$stmt = $conn->prepare($insertSql);
$stmt->bind_param(
    "sssss",
    $fullName,
    $email,
    $passwordHash,
    $otpCode,
    $otpExpires
);

if (!$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["error" => "Account creation failed"]);
    exit;
}

/* =========================
   SEND OTP EMAIL
========================= */
$phpmailer_path = __DIR__ . '/PHPMailer/src/';
require_once $phpmailer_path . 'Exception.php';
require_once $phpmailer_path . 'PHPMailer.php';
require_once $phpmailer_path . 'SMTP.php';

$mailSent = false;
$mailError = "";

try {
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

    $mail->isSMTP();
    $mail->Host       = 'cloudpgt.synology.me';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'v.patel@g-1sg.com';
    $mail->Password   = 'Vp@1856';
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom('v.patel@g-1sg.com', 'Account Verification');
    $mail->addAddress($email, $fullName);

    $mail->isHTML(true);
    $mail->Subject = 'Verify your account';

    $mail->Body = "
        <h2>Verify Your Email</h2>
        <p>Hello <b>" . htmlspecialchars($fullName) . "</b>,</p>
        <p>Your verification code is:</p>
        <h1 style='letter-spacing:3px;'>$otpCode</h1>
        <p>This code expires in 10 minutes.</p>
    ";

    $mail->AltBody = "Your verification code is: $otpCode";

    $mail->send();
    $mailSent = true;

} catch (\Throwable $e) {
    $mailError = $e->getMessage();
    error_log("Mail error: " . $mailError);
}

/* =========================
   RESPONSE
========================= */
echo json_encode([
    "success"   => true,
    "message"   => "Account created. OTP sent to email.",
    "mailSent"  => $mailSent,
    "mailError" => $mailError
]);

$stmt->close();
$conn->close();
?>
