<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->password) && !empty($data->role)) {
    
    $table = '';
    $id_field = '';
    
    switch($data->role) {
        case 'farmer':
        case 'buyer':
            $table = 'users';
            $id_field = 'user_id';
            break;
        case 'admin':
            $table = 'admins';
            $id_field = 'admin_id';
            break;
        case 'driver':
            $table = 'drivers';
            $id_field = 'driver_id';
            break;
        default:
            http_response_code(400);
            echo json_encode(array("message" => "Invalid role"));
            exit();
    }
    
    $query = "SELECT * FROM " . $table . " WHERE email = :email LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Verify password - supports both plain text (for demo) and hashed passwords
        $password_valid = false;
        if (password_verify($data->password, $row['password'])) {
            $password_valid = true;
        } elseif ($data->password === $row['password']) {
            // Fallback for plain text passwords (development only)
            $password_valid = true;
        }
        
        if ($password_valid) {
            
            // For users table, check role matches
            if ($table === 'users' && isset($row['role'])) {
                if ($row['role'] !== $data->role) {
                    http_response_code(401);
                    echo json_encode(array("message" => "Invalid credentials"));
                    exit();
                }
            }
            
            // Log admin activity
            if ($table === 'admins') {
                $activity_query = "INSERT INTO admin_activity (admin_id, action_type, description) VALUES (:admin_id, 'login', 'Admin logged in')";
                $activity_stmt = $db->prepare($activity_query);
                $activity_stmt->bindParam(':admin_id', $row[$id_field]);
                $activity_stmt->execute();
            }
            
            // Create simple token (In production, use JWT)
            $token_data = array(
                "user_id" => $row[$id_field],
                "email" => $row['email'],
                "role" => $data->role,
                "name" => $row['name']
            );
            
            $token = base64_encode(json_encode($token_data));
            
            http_response_code(200);
            echo json_encode(array(
                "message" => "Login successful",
                "token" => $token,
                "user" => array(
                    "id" => $row[$id_field],
                    "name" => $row['name'],
                    "email" => $row['email'],
                    "role" => $data->role
                )
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Invalid credentials"));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "User not found"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Incomplete data"));
}
?>
