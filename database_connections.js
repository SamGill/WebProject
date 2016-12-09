function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function anotherFormatterBecauseJavscriptSucks(string){
	var arr = string.split("-");
	return arr[1] + "/" + arr[2] + "/" + arr[0];
}

function easyReadingFormattedDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    
    if(month < 10)
    	return "0" + month + "/" + day + "/" + year;
    else
    	return month + "/" + day + "/" + year;
}

function pushTask(name, time, entry_date, goal_date){
	$.ajax({
	    url: 'create_task.php',
	    type: 'post',
	    data: { "title": name,
	    		"total_hours": time,
	    		"entry_date": formatDate(entry_date),
	    		"goal_date": formatDate(goal_date)},
	    success: function(response) { 
	    	console.log(response);
			getTasks();
	    },
	    failure: function(response) { alert("Could not connect to Server!");}
	});
}

function updateTask(name, time, entry_date, goal_date, task_id, hours_completed){
	$.ajax({
	    url: 'update_task.php',
	    type: 'post',
	    data: { "task_id": task_id,
	    		"title": name,
	    		"total_hours": time,
	    		"progress_hours": hours_completed,
	    		"entry_date": formatDate(entry_date),
	    		"goal_date": formatDate(goal_date)},
	    success: function(response) { 
	    	console.log(response);
			getTasks();
	    },
	    failure: function(response) { alert("Could not connect to Server!");}
	});
}

function getTasks(){
	tasks = [];
	$.getJSON( "get_tasks.php", function() {
	  console.log( "success" );
	})
	  .done(function(dataOut) {
	    $.each(dataOut, function(i, item){
	    	var t = new Task(item.task_id, new Date(anotherFormatterBecauseJavscriptSucks(item.entry_date)), new Date(anotherFormatterBecauseJavscriptSucks(item.goal_date)), item.title, parseInt(item.total_hours), parseInt(item.progress_hours));
	    	tasks.push(t);
	    });
		updateTasksTable();
		updateGraph();
	  })
	  .fail(function() {
	    console.log( "error" );
	  })
	  .always(function() {
	    console.log( "complete" );
	  });
}

function deleteTask(event, el) {
	event.stopPropagation();
	
	var test = $(el).closest('tr');
	var test2 = $(test).find('p')
	var id = $(test2)[0].innerHTML;

	$.ajax({
	    url: 'delete_task.php',
	    type: 'post',
	    data: { "task_id": id},
	    success: function(response) { 
	    	console.log(response);
			getTasks();
	    },
	    failure: function(response) { alert("Could not connect to Server!");}
	});
}

function checkTask(event, el) {
	event.stopPropagation();
	
	var test = $(el).closest('tr');
	var test2 = $(test).find('p')
	var id = $(test2)[0].innerHTML;

	$.ajax({
	    url: 'check_task.php',
	    type: 'post',
	    data: { "task_id": id},
	    success: function(response) { 
	    	console.log(response);
			getTasks();
	    },
	    failure: function(response) { alert("Could not connect to Server!");}
	});
}