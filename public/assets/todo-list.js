$(document).ready(function(){

  $('#new-task-form').on('submit', function(event){
      event.preventDefault()
      let toDoText = $('#task-name-input').val()
      let status = $('#task-status-input').val()
      let dueDate = $('#task-duedate-input').val()

      let todo = {
        toDoText: toDoText,
        status: status,
        dueDate: dueDate
      }

      console.log('to do text is ', toDoText)
      console.log('to do status is ', status)
      console.log('Due date is ', dueDate);

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          location.reload();
        }
      });

      return false;

  })

  $('.delete-button').on('click', function(event){
    event.preventDefault()
    let rowId = $(this).data('row-id')
    let todo = {
      id: rowId
    }

    $.ajax({
      type: 'DELETE',
      url: '/todo/' + rowId,
      data: todo,
      success: function(data){
        location.reload();
      }
    });
  });

});
