<?php
// chatbot_handler.php
// Accepts POST requests with action=session-start | message-log | query
// Stores data to DB and (optionally) emails query notifications via Synology SMTP (PHPMailer).

// --- Basic config: edit these ---
$db_server   = "localhost";
$db_user     = "u517155263_zigi_g1";
$db_pass     = "JayVerma@2001145";
$db_name     = "u517155263_g1sevicedb";

// PHPMailer path (edit to where you uploaded PHPMailer)
$phpmailer_path = __DIR__ . '/PHPMailer/src/';

// SMTP settings for optional notification email (edit)
$smtp_enabled = true; // set to false to disable sending emails on query
$smtp_host    = 'cloudpgt.synology.me';
$smtp_port    = 587;
$smtp_user    = 'j.verma@arqadiangroup.com';
$smtp_pass    = 'JayVerma@2001';
$smtp_secure  = 'tls';  // 'tls' or 'ssl'
$notify_to    = 'j.verma@arqadiangroup.com';
$notify_from  = $smtp_user; // must match authenticated mailbox to avoid rejection
// --- End config ---

// Ensure JSON response always
header('Content-Type: application/json; charset=utf-8');

// Turn off displaying errors to client, but log them
ini_set('display_errors', '0');
error_reporting(E_ALL);

// Exception/shutdown handlers to always return JSON on fatal errors
set_exception_handler(function ($e) {
    http_response_code(500);
    error_log("Exception: " . $e->getMessage());
    echo json_encode(['error' => 'Exception: ' . $e->getMessage()]);
    exit;
});
register_shutdown_function(function () {
    $err = error_get_last();
    if ($err && in_array($err['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        http_response_code(500);
        error_log("Shutdown error: " . ($err['message'] ?? 'Unknown'));
        echo json_encode(['error' => 'Fatal error: ' . ($err['message'] ?? 'Unknown')]);
        exit;
    }
});

// Helper: get input (form-data or raw json)
function get_input_data() {
    $data = $_POST;
    if (empty($data)) {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) $data = $decoded;
    }
    return $data;
}

// Connect to DB (mysqli)
$conn = new mysqli($db_server, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'DB connect failed']);
    exit;
}
$conn->set_charset('utf8mb4');

// Create necessary tables if not present
$create_sessions = "CREATE TABLE IF NOT EXISTS chatbot_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(45),
    city VARCHAR(100),
    region VARCHAR(100),
    country VARCHAR(100),
    isp VARCHAR(255),
    timezone VARCHAR(100),
    user_agent TEXT,
    metadata JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4";

$create_messages = "CREATE TABLE IF NOT EXISTS chatbot_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NULL,
    sender ENUM('user','bot') NOT NULL,
    message TEXT NOT NULL,
    step INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (session_id),
    FOREIGN KEY (session_id) REFERENCES chatbot_sessions(id) ON DELETE SET NULL
) CHARACTER SET utf8mb4";

$create_queries = "CREATE TABLE IF NOT EXISTS chatbot_queries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NULL,
    name VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    service VARCHAR(255) NULL,
    query TEXT NOT NULL,
    metadata JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX (session_id),
    FOREIGN KEY (session_id) REFERENCES chatbot_sessions(id) ON DELETE SET NULL
) CHARACTER SET utf8mb4";

$conn->query($create_sessions);
$conn->query($create_messages);
$conn->query($create_queries);

// Get input
$input = get_input_data();
$action = trim($input['action'] ?? $_GET['action'] ?? '');

// Basic client metadata helper
function client_meta() {
    return [
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'server_ts' => (new DateTime())->format(DATE_ISO8601)
    ];
}

// Route actions
if ($action === 'session-start') {
    // Expected: various metadata fields (ip, city, region, country, isp, timezone, userAgent)
    $ip = $conn->real_escape_string($input['ip'] ?? ($input['ip'] ?? $_SERVER['REMOTE_ADDR'] ?? ''));
    $city = $conn->real_escape_string($input['city'] ?? '');
    $region = $conn->real_escape_string($input['region'] ?? '');
    $country = $conn->real_escape_string($input['country'] ?? '');
    $isp = $conn->real_escape_string($input['isp'] ?? '');
    $timezone = $conn->real_escape_string($input['timezone'] ?? '');
    $userAgent = $conn->real_escape_string($input['userAgent'] ?? ($_SERVER['HTTP_USER_AGENT'] ?? ''));
    $metadata = json_encode(array_merge($input, client_meta()));

    $stmt = $conn->prepare("INSERT INTO chatbot_sessions (ip, city, region, country, isp, timezone, user_agent, metadata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param('ssssssss', $ip, $city, $region, $country, $isp, $timezone, $userAgent, $metadata);
    if ($stmt->execute()) {
        $session_id = $stmt->insert_id;
        echo json_encode(['success' => true, 'session_id' => $session_id]);
        $stmt->close();
        $conn->close();
        exit;
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create session']);
        $stmt->close();
        $conn->close();
        exit;
    }
} elseif ($action === 'message-log') {
    // Expected: session_id (optional), sender ('user'|'bot'), message, step (optional)
    $session_id = !empty($input['session_id']) ? (int)$input['session_id'] : null;
    $sender = $conn->real_escape_string($input['sender'] ?? 'user');
    $message = $conn->real_escape_string($input['message'] ?? '');
    $step = isset($input['step']) ? (int)$input['step'] : null;

    if (empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'Message is required']);
        $conn->close();
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO chatbot_messages (session_id, sender, message, step) VALUES (?, ?, ?, ?)");
    if ($session_id === null) {
        // bind null as i (integer) but pass null -> use NULL in query
        $stmt = $conn->prepare("INSERT INTO chatbot_messages (session_id, sender, message, step) VALUES (NULL, ?, ?, ?)");
        $stmt->bind_param('ssi', $sender, $message, $step);
    } else {
        $stmt->bind_param('issi', $session_id, $sender, $message, $step);
    }

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message_id' => $stmt->insert_id]);
        $stmt->close();
        $conn->close();
        exit;
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to log message']);
        $stmt->close();
        $conn->close();
        exit;
    }
} elseif ($action === 'query') {
    // Expected: session_id (optional), name, email, service, query, plus optional metadata
    $session_id = !empty($input['session_id']) ? (int)$input['session_id'] : null;
    $name = $conn->real_escape_string($input['name'] ?? '');
    $email = $conn->real_escape_string($input['email'] ?? '');
    $service = $conn->real_escape_string($input['service'] ?? '');
    $query = $conn->real_escape_string($input['query'] ?? $input['message'] ?? '');
    $metadata = json_encode($input);

    if (empty($query) || empty($email)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and query are required']);
        $conn->close();
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO chatbot_queries (session_id, name, email, service, query, metadata) VALUES (?, ?, ?, ?, ?, ?)");
    if ($session_id === null) {
        $stmt = $conn->prepare("INSERT INTO chatbot_queries (session_id, name, email, service, query, metadata) VALUES (NULL, ?, ?, ?, ?, ?)");
        $stmt->bind_param('sssss', $name, $email, $service, $query, $metadata);
    } else {
        $stmt->bind_param('isssss', $session_id, $name, $email, $service, $query, $metadata);
    }

    if (!$stmt->execute()) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save query']);
        $stmt->close();
        $conn->close();
        exit;
    }

    $query_id = $stmt->insert_id;
    $stmt->close();

    // Optionally send notification email with query details
    $mailSent = false;
    $mailError = '';

    if ($smtp_enabled) {
        // Ensure PHPMailer exists
        if (!file_exists($phpmailer_path . 'PHPMailer.php')) {
            error_log("PHPMailer not found at $phpmailer_path");
        } else {
            require_once $phpmailer_path . 'Exception.php';
            require_once $phpmailer_path . 'PHPMailer.php';
            require_once $phpmailer_path . 'SMTP.php';

            try {
                $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
                $mail->isSMTP();
                $mail->Host = $smtp_host;
                $mail->SMTPAuth = true;
                $mail->Username = $smtp_user;
                $mail->Password = $smtp_pass;
                $mail->SMTPSecure = $smtp_secure;
                $mail->Port = $smtp_port;
                $mail->CharSet = 'UTF-8';

                // IMPORTANT: use authenticated mailbox as From to avoid rejection
                $mail->setFrom($smtp_user, 'G-1 Services Chatbot');
                $mail->addAddress($notify_to);

                // Reply-to the user who submitted the chat (so staff can reply)
                $mail->addReplyTo($email, $name);

                $mail->isHTML(true);
                $mail->Subject = "New Chatbot Query from {$name} ({$email})";

                $html  = "<h3>New Chatbot Query</h3>";
                $html .= "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
                $html .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
                $html .= "<p><strong>Service:</strong> " . htmlspecialchars($service) . "</p>";
                $html .= "<p><strong>Query:</strong><br>" . nl2br(htmlspecialchars($query)) . "</p>";
                $html .= "<p><strong>Session ID:</strong> " . ($session_id ?? 'N/A') . "</p>";
                $html .= "<pre>" . json_encode($input, JSON_PRETTY_PRINT) . "</pre>";

                $mail->Body = $html;
                $mail->AltBody = "New Chatbot Query\nName: $name\nEmail: $email\nService: $service\n\n$query\n\nSession ID: " . ($session_id ?? 'N/A');

                $mail->send();
                $mailSent = true;
            } catch (\PHPMailer\PHPMailer\Exception $e) {
                $mailError = $e->getMessage();
                error_log("PHPMailer error while sending chatbot notification: " . $mailError);
            } catch (\Throwable $t) {
                $mailError = $t->getMessage();
                error_log("Mailing error: " . $mailError);
            }
        }
    }

    echo json_encode(['success' => true, 'query_id' => $query_id, 'mailSent' => $mailSent, 'mailError' => $mailError]);
    $conn->close();
    exit;
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Unknown or missing action']);
    $conn->close();
    exit;
}
?>
