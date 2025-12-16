<?php
ini_set('session.use_strict_mode', 1);
ini_set('session.use_only_cookies', 1);

session_name('G1SESSID');

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    // IMPORTANT: remove domain completely
    // Let PHP auto-handle it
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();
