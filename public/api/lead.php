<?php
/**
 * JB3Ai lead + OTP mailer.
 * Deploys to public_html/api/lead.php via the Vite build (public/ folder).
 *
 * Receives: POST JSON { name, email, intent, mode, newsletter, code }
 * Sends:    1) notification email to the site owner
 *           2) the 6-digit access/confirmation code to the visitor
 * Returns:  JSON { success, owner, visitor }
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

/* ---- Configuration ---- */
$OWNER_TO = 'jono@jonoblackburn.com';
$OWNER_CC = 'hi@jb3ai.com';
$FROM     = 'no-reply@jonoblackburn.com'; // must match the hosting domain for SPF/deliverability
/* ----------------------- */

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

function clean($v, $max = 200) {
    return substr(trim(preg_replace('/[\r\n]+/', ' ', (string)$v)), 0, $max);
}

$name       = clean($data['name'] ?? '');
$email      = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$intent     = clean($data['intent'] ?? '', 40);
$mode       = clean($data['mode'] ?? 'access', 20);
$phone      = clean($data['phone'] ?? '', 40);
$newsletter = (!empty($data['newsletter']) && $data['newsletter'] !== 'false') ? 'Yes' : 'No';
$code       = clean($data['code'] ?? '', 10);

if (!$email || $name === '') {
    http_response_code(422);
    echo json_encode(['success' => false, 'error' => 'Invalid name or email']);
    exit;
}

/* 1) Owner notification */
$subject = ($mode === 'news')
    ? "[JB3Ai] New newsletter signup: $name"
    : "[JB3Ai] Access request: $name ($intent)";

$lines = [
    'New submission from jonoblackburn.com',
    '',
    "Name: $name",
    "Email: $email",
    "Mode: $mode",
];
if ($mode !== 'news') {
    $lines[] = "Access type: $intent";
}
$lines[] = "Newsletter opt-in: $newsletter";
if ($phone !== '') {
    $lines[] = "Phone: $phone";
}
if ($code !== '') {
    $lines[] = "OTP issued: $code";
}
$lines[] = '';
$lines[] = 'Time (server): ' . date('Y-m-d H:i:s');
$lines[] = 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');

$ownerHeaders = "From: JB3Ai Website <$FROM>\r\n"
    . "Reply-To: $email\r\n"
    . "Cc: $OWNER_CC\r\n"
    . "Content-Type: text/plain; charset=UTF-8";

$sentOwner = @mail($OWNER_TO, $subject, implode("\n", $lines), $ownerHeaders);

/* 2) Visitor code email */
$sentVisitor = false;
if ($code !== '') {
    $vSubject = ($mode === 'news')
        ? 'Your JB3Ai confirmation code'
        : 'Your JB3Ai access code';
    $vBody = "Hi $name,\n\n"
        . (($mode === 'news')
            ? 'Thanks for signing up for JB3Ai news. Your confirmation code is:'
            : 'Your private access code for jonoblackburn.com is:')
        . "\n\n    $code\n\n"
        . "This code expires in 10 minutes.\n\n"
        . "- Jonathan Blackburn\nJB3Ai";
    $vHeaders = "From: JB3Ai <$FROM>\r\n"
        . "Content-Type: text/plain; charset=UTF-8";
    $sentVisitor = @mail($email, $vSubject, $vBody, $vHeaders);
}

echo json_encode([
    'success' => ($sentOwner || $sentVisitor),
    'owner'   => $sentOwner,
    'visitor' => $sentVisitor,
]);
