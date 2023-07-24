<?php 
require_once 'conect.php';

$id = $_GET["id"];

try {

  $statement = $pdo->prepare('DELETE FROM task WHERE id = :id');
  $statement->bindParam(':id', $id);
  $statement->execute();

  echo $statement->rowCount();

} catch(PDOException $e) {
  echo 'Error: ' . $e->getMessage();
}
?>