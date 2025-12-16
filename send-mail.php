<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$name    = trim($_POST["name"] ?? "");
$email   = trim($_POST["email"] ?? "");
$subject = trim($_POST["subject"] ?? "");
$message = trim($_POST["message"] ?? "");

if (!$name || !$email || !$subject || !$message) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email address"]);
    exit;
}

$to = "umaralishaikhdeveloper@gmail.com";
$mailSubject = "New Contact Form: $subject";

$body = "Name: $name\nEmail: $email\n\n$message";
$headers = "From: $email\r\nReply-To: $email\r\n";

if (mail($to, $mailSubject, $body, $headers)) {
    echo json_encode([
        "status" => "success",
        "message" => "Message sent successfully!"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Mail server error. Try again later."
    ]);
}
