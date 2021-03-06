/* Set the width of the side navigation to 250px */
function openNav() {
	var windowWidth = $(window).width();
	if (windowWidth < 800) {
		document.getElementById("tasksBar").style.width = "75%";
	} else {
		document.getElementById("tasksBar").style.width = "33%";
	}
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById("tasksBar").style.width = "0";
}

function setTaskBarHeight() {
	var h = $(".sidenav").height() - $("#tasksBar table thead").height();
	$("#tasksBar table tbody").height(h);
}

function addRow(name, date, estimate, progress, id) {

	var nameHtml = "<div><span class = 'taskName'>" + String(name) + "</span></div>";
	var dateHtml = "<div>Due: <span class = 'taskDate'>" + String(date) + "</span></div>";
	var estimateHtml = "<div>Time: <span class = 'taskEstimate'>" + String(estimate) + "</span></div>";
	var progressHtml = "<div>Progress: <span class = 'taskProgress'>" + String(progress) + "</span></div>";
	var hiddenData = "<p hidden id='id'>" + id + "</p>";


	var sideButtons = "<button onclick='deleteTask(event, this)' class='btn btn-danger btn-circle removeTaskBtn'>" +  
	'<i class="glyphicon glyphicon-remove"></i>'
	+ "</button>" + 
	"<br/>" + 
	"<button onclick='checkTask(event, this)' class='btn btn-success btn-circle checkTaskBtn'>&#10004</button>";

	var html = "<tr class='taskRow'>" + "<td class='info'>" + nameHtml + "<div class='small-spacing'>" + dateHtml + estimateHtml + progressHtml + "</div>" + hiddenData + "</td>" + "<td>" + sideButtons + "</td></tr>";

	$("#tasksTable tbody").append(html);
}

function handleTextInput(event, el) {
	if (event.which == 13 || event.which == 27) {
		// ENTER or ESCAPE key
		var input = el;
		var content = el.siblings("span");
		// TODO: set content correctly

		if (event.which == 13) {
			// ENTER was pressed

			// TODO: set the content from the input
			content.text(input.val());
		}
		input.hide();
		content.show();
	}
}

function hideTextInput() {
	$(".task-input").each(function() {
		$(this).hide();
		$(this).siblings("span").show();
	});
}

function showInputField(event, el) {
	event.stopPropagation();
	var input = el.siblings(".task-input");
	input.show();
	input.val(el.text());
	el.hide();
}

function addTask() {
 	var name = $("#f-name").val();
	var date = $("#f-date").val();
	var time = $("#f-time").val();

	pushTask(name, parseInt(time), new Date(), new Date(date));
}

function clearAddTask() {
	$("#f-name").val("");
	$("#f-date").val("");
	$("#f-time").val("");
}

function toggleAdvancedEditing() {
	var isVisible = $("#extraEdit").is(":visible");

	$("#extraEdit").toggle();
	var buttonText = "";
	if (isVisible) {
		buttonText = "SHOW MORE";
	} else {
		buttonText = "SHOW LESS";
	}
	$("#showMore").text(buttonText);
}

function updateTasksTable(){
	$("#tasksTable tbody").html("");
	for(var i = 0; i < tasks.length; i++)
	{
		//addRow(tasks[i].getDaysLeft(new Date()), easyReadingFormattedDate(tasks[i].goal_date), tasks[i].total_hours, tasks[i].progress_hours, tasks[i].task_id);
		addRow(tasks[i].title, easyReadingFormattedDate(tasks[i].goal_date), tasks[i].total_hours, tasks[i].progress_hours, tasks[i].task_id);

	}
}

function runTaskBarEventHandlers() {
	/*$("#tasksTable").on("click", ".taskName, .taskDate, .taskEstimate, .taskProgress", function(event) {
	showInputField(event, $(this));
	});

	$("#tasksTable").on("keydown", ".task-input", function(event) {
	handleTextInput(event, $(this));
	});*/

	//stops the textfield from disappearing when the user clicks on it
	$("#tasksTable").on("click", ".task-input", function(event) {
		event.stopPropagation();
	});

	//hide the textfield if anywhere is clicked
	$("body").on("click", function() {
		hideTextInput();
	});

	$("#f-date").datepicker({
		minDate: 0
	});
	
	$("#update-f-date").datepicker({
		minDate: 0
	});
	
	$(".date-input").datepicker({
		minDate: 0
	});

	$("#btn-addTask").on("click", function() {
		if(tasks.length < 26) {
			$("#addTaskDialog").dialog("open");
		}
		else {
			$("#taskErrorDialog").dialog("open");
		}
	});	
	
	$("#addTaskDialog").dialog({
		autoOpen : false,
		modal : true,
		close : function() {
			clearAddTask();
		}
	});
	
	$("#taskErrorDialog").dialog({
		autoOpen : false,
		modal : true,
		/*close : function() {
			clearAddTask();
		}*/
	});

	var offset = $("#extraEdit").height();
	$("#updateTaskDialog").dialog({
		autoOpen : false,
		modal : true,
		position : {
			my : "center",
			at : "top+" + String(offset) + "px",
			of : window,
		}
	});
	$("#extraEdit").hide();

	$("#tasksTable").on("click", "tbody > tr", function(event) {
		$("#updateTaskDialog").dialog("open");
		var name = $(this).find(".taskName").text();
		var goal_date = $(this).find(".taskDate").text();
		var time = $(this).find(".taskEstimate").text();
		var hours_completed = $(this).find(".taskProgress").text();
		
		var test = $(this).closest('tr');
		var test2 = $(test).find('p')
		lastTaskClicked = $(test2)[0].innerHTML;
		
		$("#update-f-name").val(name);
		$("#update-f-date").val(goal_date);
		$("#update-f-time").val(time);
		$("#update-f-progress").val(hours_completed);
		
		$("#update-f-progress").max(hours_completed);	
	});

	$("#btn-closeAddTask").on("click", function() {
		$("#addTaskDialog").dialog("close");
	});

	$("#btn-submitAddTask").on("click", function() {
		addTask();
		$("#addTaskDialog").dialog("close");
	});
	
	$("#btn-submitUpdateTask").on("click", function() {
		var name = $("#update-f-name").val();
		var goal_date = $("#update-f-date").val();
		var time = $("#update-f-time").val();
		var hours_completed = $("#update-f-progress").val();		
		var task_id = lastTaskClicked;
		
		
		var result = $.grep(tasks, function(e){ return e.task_id == task_id; });
		
		var entry_date = result[0].entry_date;
		
		updateTask(name, time, entry_date, goal_date, task_id, hours_completed);
		
		$("#updateTaskDialog").dialog("close");
	});
}
