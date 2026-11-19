<?php
// Contact form handler for ZEMOYA CODES portfolio.
// 1) Set $to to your email address. 2) Upload this file next to index.html.
// 3) On InfinityFree, mail() may be restricted: if messages don't arrive, use
//    your host's SMTP (e.g. PHPMailer) or the WhatsApp/email buttons instead.
$to = 'zemoyacodes@gmail.com';

header('Content-Type: application/json; charset=utf-8');

function out($ok, $code = 200) { http_response_code($code); echo json_encode(['ok' => $ok]); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(false, 405);
if (!empty($_POST['website'])) out(true); // honeypot: bots fill this in

$clean = function ($k) { return trim(strip_tags($_POST[$k] ?? '')); };
$name = $clean('name'); $email = trim($_POST['email'] ?? '');
$type = $clean('type'); $budget = $clean('budget'); $msg = $clean('message');

if ($name === '' || $msg === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) out(false, 422);

$name = str_replace(["\r", "\n"], ' ', $name); // block header injection
$body = "Name: $name\nEmail: $email\nProject type: $type\nBudget: $budget\n\n$msg";
$headers = "From: Portfolio <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'localhost') . ">\r\n"
         . "Reply-To: $email\r\nContent-Type: text/plain; charset=utf-8";

if ($to === "" || !filter_var($to, FILTER_VALIDATE_EMAIL)) out(false, 503);
out(@mail($to, "New project enquiry from $name", $body, $headers), 200);
