<?php
error_reporting(E_ALL);
ini_set("display_errors", 0);
ini_set("log_errors", 1);
ini_set("error_log", __DIR__ . "/error_log.txt");

header("Content-Type: application/json");

// === Logging ===
file_put_contents(__DIR__ . "/php_debug_log.txt", "=== Script Started: " . date("Y-m-d H:i:s") . " ===\n", FILE_APPEND);

// === Database Config (adjust as needed) ===
$servername = "localhost";
$username   = "u517155263_g1realtydbuser";          // your DB username
$password   = "JayVerma@2001145";         // your DB password
$dbname     = "u517155263_g1realtydb";    // your DB name

// === Database Connection ===
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// === Create Table if Not Exists ===
$tableSql = "CREATE TABLE IF NOT EXISTS openhouse_submissions (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    contactMethod VARCHAR(50),

    isBuying VARCHAR(10),
    homeType VARCHAR(50),
    budget VARCHAR(50),
    moveInTimeline VARCHAR(50),

    isSelling VARCHAR(10),
    sellAddress VARCHAR(255),
    sellValue VARCHAR(50),
    sellTimeline VARCHAR(50),

    preApproved VARCHAR(10),
    lender VARCHAR(150),

    referralSource VARCHAR(100),
    features TEXT,
    comments TEXT,

    consent TINYINT(1) DEFAULT 0,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if ($conn->query($tableSql) === FALSE) {
    http_response_code(500);
    echo json_encode(["error" => "Error creating table"]);
    exit;
}

// === Read POST Data ===
// We expect JSON (since React will send JSON via fetch)
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing JSON body"]);
    exit;
}

// Flatten values
$fullName        = $conn->real_escape_string($data["contact"]["fullName"] ?? "");
$phone           = $conn->real_escape_string($data["contact"]["phone"] ?? "");
$email           = $conn->real_escape_string($data["contact"]["email"] ?? "");
$contactMethod   = $conn->real_escape_string($data["contact"]["contactMethod"] ?? "");

$isBuying        = $conn->real_escape_string($data["buying"]["isBuying"] ?? "No");
$homeType        = $conn->real_escape_string($data["buying"]["homeType"] ?? "");
$budget          = $conn->real_escape_string($data["buying"]["budget"] ?? "");
$moveInTimeline  = $conn->real_escape_string($data["buying"]["moveInTimeline"] ?? "");

$isSelling       = $conn->real_escape_string($data["selling"]["isSelling"] ?? "No");
$sellAddress     = $conn->real_escape_string($data["selling"]["sellAddress"] ?? "");
$sellValue       = $conn->real_escape_string($data["selling"]["sellValue"] ?? "");
$sellTimeline    = $conn->real_escape_string($data["selling"]["sellTimeline"] ?? "");

$preApproved     = $conn->real_escape_string($data["financing"]["preApproved"] ?? "No");
$lender          = $conn->real_escape_string($data["financing"]["lender"] ?? "");

$referralSource  = $conn->real_escape_string($data["additional"]["referralSource"] ?? "");
$features        = $conn->real_escape_string($data["additional"]["features"] ?? "");
$comments        = $conn->real_escape_string($data["additional"]["comments"] ?? "");

$consent         = !empty($data["consent"]) ? 1 : 0;

// === Validation ===
if (empty($fullName) || empty($phone) || empty($email)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required contact info"]);
    exit;
}

// === Insert Into Database ===
$insertSql = "INSERT INTO openhouse_submissions 
(fullName, phone, email, contactMethod, 
 isBuying, homeType, budget, moveInTimeline, 
 isSelling, sellAddress, sellValue, sellTimeline, 
 preApproved, lender, 
 referralSource, features, comments, consent) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($insertSql);
if ($stmt === false) {
    http_response_code(500);
    echo json_encode(["error" => "Prepare failed"]);
    exit;
}
$stmt->bind_param(
    "sssssssssssssssssi",
    $fullName, $phone, $email, $contactMethod,
    $isBuying, $homeType, $budget, $moveInTimeline,
    $isSelling, $sellAddress, $sellValue, $sellTimeline,
    $preApproved, $lender,
    $referralSource, $features, $comments, $consent
);

if ($stmt->execute()) {
    echo json_encode(["success" => "Data inserted successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Insert failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
