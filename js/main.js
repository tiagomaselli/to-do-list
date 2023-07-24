import { renderTasks, writeMessages } from "./manipulate-dom.js";

//Confirmar alteração
$("#btn-update-task").on("click", function (ev) {
  ev.preventDefault();

  if ($("#title").val().trim() !== "") {
    $.post( "db/update.php", $( "#form-task" ).serialize())
    .done(function(count) {
      if (count > 0) {
        //Se alterou, carrega novamente os campos na tela
        $("#tasks").children(":not(#messages)").remove();
        $("#id").val("");
        $("#title").val("");
        $("#description").val("");

        $("#btn-update-task").hide();
        $("#btn-cancel-task").hide();
        $("#btn-add-task").show();

        $("#h2-new-task").show();
        $("#h2-edit-task").hide();
        
        getTasks();

        writeMessages("Tarefa alterada com sucesso.", "withDelay", "messagePositive");

      } else {
        writeMessages("Não foi possível alterar a tarefa. Verificar com responsável.", "withoutDelay", "messageNegative");
      }
    })
    .fail(function() {
      writeMessages("Erro na requisição. Verificar com responsável.", "withoutDelay", "messageNegative");    
    })  
  } else {
    writeMessages("É necessário pelo menos o título da tarefa.", "withoutDelay", "messageNegative");
    $("#title").trigger("focus");
  }

})

//Cancelar alteração
$("#btn-cancel-task").on("click", function (ev) {
  ev.preventDefault();
  $('#id').val("");
  $('#title').val("");
  $('#description').val("");

  $("#btn-update-task").hide();
  $("#btn-cancel-task").hide();
  $("#btn-add-task").show();

  $("#h2-new-task").show();
  $("#h2-edit-task").hide();
})

//Incluir nova tarefa
$("#btn-add-task").on("click", function (ev) {
  ev.preventDefault();

  if ($("#title").val().trim() !== "") {
    $.post( "db/insert.php", $( "#form-task" ).serialize())
    .done(function(count) {
      if (count > 0) {
        //Se inseriu, carrega novamente os campos na tela
        $("#tasks").children(":not(#messages)").remove();
        $("#title").val("");
        $("#description").val("");
        getTasks();

        writeMessages("Tarefa incluída com sucesso.", "withDelay", "messagePositive");

      } else {
        writeMessages("Não foi possível incluir a tarefa. Verificar com responsável.", "withoutDelay", "messageNegative");
      }
    })
    .fail(function() {
      writeMessages("Erro na requisição. Verificar com responsável.", "withoutDelay", "messageNegative");
    })  
  } else {
    writeMessages("É necessário pelo menos o título da tarefa.", "withoutDelay", "messageNegative");
    $("#title").trigger("focus");
  }

})

//Selecionar todas as tarefas
function getTasks() {
  $.getJSON("db/select.php")
  .done(function(response) {
    if (response.length > 0) {
      let arrResponse = [...response]
      arrResponse.forEach(renderTasks);
    } else {
      writeMessages("Ainda não existem tarefas.", "withoutDelay", "messagePositive");
    }
  })
  .fail(function() {
    writeMessages("Erro na requisição. Verificar com responsável.", "withoutDelay", "messageNegative");
  })
}

//Executa quando carrega o documento
document.addEventListener('DOMContentLoaded', () => {
  getTasks();

  $("#btn-update-task").hide();
  $("#btn-cancel-task").hide();
  $("#h2-edit-task").hide();
})