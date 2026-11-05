<?php
function verifyToken() {
    $headers = function_exists('getallheaders') ? getallheaders() : [];
    $authHeader = '';
    
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
    } elseif (isset($headers['authorization'])) {
        $authHeader = $headers['authorization'];
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }
    
    $token = trim(str_replace('Bearer ', '', $authHeader));
    if (empty($token)) {
        http_response_code(401);
        echo json_encode(array("message" => "Unauthorized"));
        exit();
    }
    return $token;
}

function getUserFromToken($token, $db = null) {
    $token_data = json_decode(base64_decode($token), true);
    if (!$token_data) {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid token"));
        exit();
    }
    return $token_data;
}
?>
