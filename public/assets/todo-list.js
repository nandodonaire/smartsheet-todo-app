$(document).ready(function(){

  // This is where we set the event handler for when the 'new-task-form' is submitted
  $('#new-task-form').on('submit', function(event){
      event.preventDefault()
      // here we are setting the 'toDoText', 'status', and 'dueDate' to equal the values that are on the 'new-task-form'
      let toDoText = $('#task-name-input').val()
      let status = $('#task-status-input').val()
      let dueDate = $('#task-duedate-input').val()
      // we then define a 'todo' with the values from the 'new-task-form'.
      let todo = {
        toDoText: toDoText,
        status: status,
        dueDate: dueDate
      }

      // We then send a POST ajax request with the 'todo' that we defined above as the 'data'
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
  // This is the event handler for when the 'Delete' button is clicked on a row
  $('.delete-button').on('click', function(event){
    event.preventDefault()
    // we define 'rowId' as the 'id' of the row whose 'Delete' button was clicke.
    let rowId = $(this).data('row-id')
    // set 'todo' to be an object with the 'id'/'rowId' key-value pair
    let todo = {
      id: rowId
    }
    // send a DELETE ajax request with the 'todo' as the 'data'
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
