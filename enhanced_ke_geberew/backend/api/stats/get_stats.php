<?php
include_once '../../config/cors.php';
include_once '../../config/database.php';

$database = new Database();
$db = $database->getConnection();

try {
    // Get total users count
    $users_query = "SELECT COUNT(*) as count FROM users";
    $users_stmt = $db->prepare($users_query);
    $users_stmt->execute();
    $users_count = $users_stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Get total products count
    $products_query = "SELECT COUNT(*) as count FROM products WHERE status = 'active'";
    $products_stmt = $db->prepare($products_query);
    $products_stmt->execute();
    $products_count = $products_stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Get total orders count
    $orders_query = "SELECT COUNT(*) as count FROM orders";
    $orders_stmt = $db->prepare($orders_query);
    $orders_stmt->execute();
    $orders_count = $orders_stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Get total deliveries count
    $deliveries_query = "SELECT COUNT(*) as count FROM deliveries WHERE current_status = 'delivered'";
    $deliveries_stmt = $db->prepare($deliveries_query);
    $deliveries_stmt->execute();
    $deliveries_count = $deliveries_stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Get pending orders count
    $pending_query = "SELECT COUNT(*) as count FROM orders WHERE status = 'pending'";
    $pending_stmt = $db->prepare($pending_query);
    $pending_stmt->execute();
    $pending_count = $pending_stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    http_response_code(200);
    echo json_encode(array(
        "totalUsers" => (int)$users_count,
        "totalProducts" => (int)$products_count,
        "totalOrders" => (int)$orders_count,
        "totalDeliveries" => (int)$deliveries_count,
        "pendingOrders" => (int)$pending_count
    ));
    
} catch(Exception $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Error fetching statistics", "error" => $e->getMessage()));
}
?>
