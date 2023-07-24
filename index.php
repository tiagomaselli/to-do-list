<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista de Tarefas</title>
  <link rel="stylesheet" type="text/css" href="./design/style.css">
</head>
<body>
  <header class="teste">
    <h1>Lista de Tarefas</h1>
  </header>

  <main>
    <section id="new-task">
      <h2 id="h2-new-task">Nova Tarefa</h2>      
      <h2 id="h2-edit-task">Editando Tarefa</h2>

      <form id="form-task">
        <input type="hidden" id="id" name="id">
        <label for="title">Título: </label>
        <input type="text" name="title" id="title" maxlength="80">
        <br>
        <label for="description">Descrição: </label>
        <textarea name="description" id="description" maxlength="256"></textarea>
        <br>
        <button id="btn-add-task">Incluir Tarefa</button>
        <button id="btn-update-task">Confirmar Alteração</button>
        <button id="btn-cancel-task">Cancelar</button>
      </form>
    </section>

    <section id="tasks">
      <div id="messages"></div>
    </section>

  </main>

  <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script> 
  <script src="js/main.js" type="module"></script> 
</body>
</html>