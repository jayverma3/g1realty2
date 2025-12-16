<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$conn = new mysqli(
    "localhost",
    "u517155263_g1realtydbuser",
    "JayVerma@2001145",
    "u517155263_g1realtydb"
);

$conn->set_charset("utf8mb4");
