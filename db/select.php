<?php 

require_once 'conect.php';

$statement = $pdo->query("SELECT id, title, description FROM task ORDER BY id DESC;");

$tasks = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($tasks);

?>