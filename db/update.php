<?php

require_once 'conect.php';

$id = $_POST['id'];
$title = $_POST['title'];
$description = $_POST['description'];

try {
      // Preparar a declaração SQL para o INSERT
      $statement = $pdo->prepare('UPDATE task SET title = :title, description = :description WHERE id = :id');

      // Executar a declaração com os valores
      $statement->execute(array(
        ':id'   => $id,
        ':title' => $title,
        ':description' => $description
      ));

      echo $statement->rowCount();

} catch (PDOException $e) {

  echo "Erro ao tentar inserir no banco de dados: ".$e->getMessage();

}

?>
