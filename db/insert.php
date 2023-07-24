<?php

require_once 'conect.php';

$title = $_POST['title'];
$description = $_POST['description'];

try {

      // Preparar a declaração SQL para o INSERT
      $statement = $pdo->prepare('INSERT INTO task (title, description) VALUES (?, ?)');

      // Executar a declaração com os valores
      $statement->execute([$title, $description]);

      echo $statement->rowCount();

} catch (PDOException $e) {

  echo "Erro ao tentar inserir no banco de dados: ".$e->getMessage();

}

?>
