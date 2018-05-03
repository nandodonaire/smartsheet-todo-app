$(document).ready(function(){

  $('#new-task-form').on('submit', function(event){
      event.preventDefault()
      // var item = $('form input');
      // var todo = {item: item.val()};
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
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  })

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
