<?php
header('Content-Type: application/json');

require_once __DIR__ . '/session_bootstrap.php';

$_SESSION = [];
session_destroy();

setcookie(session_name(), '', time() - 3600, '/');

echo json_encode(["success" => true]);
exit;
