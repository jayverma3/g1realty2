<?php
header('Content-Type: application/json');
ini_set('display_errors', '0');
error_reporting(E_ALL);

/* =========================
   ERROR HANDLERS
========================= */
set_exception_handler(function ($e) {
    http_response_code(500);
    error_log($e->getMessage());
    echo json_encode(["error" => "Server exception"]);
    exit;
});

register_shutdown_function(function () {
    $err = error_get_last();
    if ($err) {
        http_response_code(500);
        error_log($err['message']);
        echo json_encode(["error" => "Fatal server error"]);
        exit;
    }
});

/* =========================
   SESSION CONFIG
========================= */
session_start([
    'cookie_httponly' => true,
    'use_strict_mode' => true,
    'cookie_samesite' => 'Lax'
]);

/* =========================
   DB CONFIG
========================= */
$conn = new mysqli(
    "localhost",
    "u517155263_g1realtydbuser",
    "JayVerma@2001145",
    "u517155263_g1realtydb"
);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "DB connection failed"]);
    exit;
}
