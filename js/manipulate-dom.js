function createTaskContainer(id) {
  const div = $("<div></div>");
  div.addClass('tasks');
  div.attr("id", `task-${id}`);
  return div;
}

function createTaskTitle(title) {
  const span = $("<span></span><br>");
  span.addClass('tasks-title');
  span.text(title);
  return span;
}

function createTaskDescription(description) {
  const span = $("<span></span>");
  span.addClass('tasks-description');
  span.text(description);
  return span;
}

//Preparando botões para edição - usando os próprios inputs do insert
function prepareEdit(tasks) {
  $('#title').trigger("focus");
  $('#id').val(tasks.id);
  $('#title').val(tasks.title);
  $('#description').val(tasks.description);

  $("#btn-add-task").hide();
  $("#btn-update-task").show();
  $("#btn-cancel-task").show();

  $("#h2-new-task").hide();
  $("#h2-edit-task").show();
}

//Botão edit
function createEditTaskBtn(tasks) {
  const editBtn = $("<button></button>");
  editBtn.addClass('edit-btn');
  editBtn.text('Editar');
  editBtn.on("click", () => {
    prepareEdit(tasks);
  })
  return editBtn;
}

//Botão excluir + funcionalidade/requisição
function createDeleteTaskBtn(id) {
  const deleteBtn = $("<button></button>");
  deleteBtn.addClass('delete-btn');
  deleteBtn.text('Excluir');
  deleteBtn.on("click", () => {

    $.ajax({
      url: "db/delete.php?id=" + id,
      type: "DELETE"
    })
    .done(function(count) {
      if (count > 0) {
        //Se deletou, exclui o elemento na tela
        $(`#task-${id}`).remove();
        writeMessages("Tarefa excluída com sucesso.", "withDelay", "messagePositive");
      } else {
        writeMessages("Não foi possível excluir a tarefa. Verificar com responsável.", "withoutDelay", "messageNegative");
      }
    })
    .fail(function() {
      writeMessages("Erro na requisição. Verificar com responsável.", "withoutDelay", "messageNegative");
    })

  })
  return deleteBtn;
}

export function writeMessages(msg, type, fontClass) {
  switch (type) {  
    case "withDelay":
      $("#messages").text("");
      $("#messages").text(msg);
      $("#messages").removeClass("messagePositive messageNegative");
      $("#messages").addClass(fontClass);
      setTimeout(function() {
        $("#messages").empty();
      }, 2000); //2 segundos
      break;
  
    case "withoutDelay":
      $("#messages").text("");
      $("#messages").text(msg);
      $("#messages").removeClass("messagePositive messageNegative");
      $("#messages").addClass(fontClass);
      break; 

    default:
      alert("Tipo inexistente - função writeMessages");
      break;
  }
}

export function renderTasks(tasks) {
  const container = createTaskContainer(tasks.id)
  const title = createTaskTitle(tasks.title)
  const description = createTaskDescription(tasks.description)
  const editBtn = createEditTaskBtn(tasks)
  const deleteBtn = createDeleteTaskBtn(tasks.id)

  $("#tasks").append(container)
  container.append(title, description, editBtn, deleteBtn)
  //container.append(title, description, editBtn, deleteBtn)
}