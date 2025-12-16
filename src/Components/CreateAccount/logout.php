<?php
require_once __DIR__ . '/db.php';

$_SESSION = [];
session_destroy();

echo json_encode([
    "success" => true,
    "message" => "Logged out"
]);
