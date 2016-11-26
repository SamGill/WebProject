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

	var nameHtml = "<div>Name: <span class = 'taskName'>" + String(name) + "</span>" + "<input class='task-input' val='" + String(name) + "'/></div>";
	var dateHtml = "<div>Due: <span class = 'taskDate'>" + String(date) + "</span>" + "<input class='task-input date-input' val='" + String(date) + "'/></div>";
	var estimateHtml = "<div>Time: <span class = 'taskEstimate'>" + String(estimate) + "</span>" + "<input class='task-input' val='" + String(estimate) + "'/></div>";
	var progressHtml = "<div>Progress: <span class = 'taskProgress'>" + String(progress) + "</span>" + "<input class='task-input' val='" + String(progress) + "'/></div>";
	var hiddenData = "<p hidden id='id'>" + id + "</p>";

	var sideButtons = "<button onclick='removeTask(this)'>X</button>" + "<br/>" + "<button>Check</button>";

	var html = "<tr class='taskRow'>" + "<td>" + nameHtml + dateHtml + estimateHtml + progressHtml + hiddenData + "</td>" + "<td>" + sideButtons + "</td>" + "</tr>";

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
	//database stuff later probs
	var name = $("#f-name").val();
	var date = $("#f-date").val();
	var time = $("#f-time").val();

	pushTask(name, parseInt(time), new Date(), new Date(date));
	
	getTasks();
	
	//should be up to the server to create a task id
//	var d = new Date();
//	var id = d.getTime();

	
//	addRow(name, date, time, "0", id);
	

	//delete this later, this information should come from the database... I think
//	var t = new Task(name, new Date(date), parseInt(time), id);
//	tasks.push(t);
//	updateGraph();
}

function updateTask() {
	//TODO:
}

function clearAddTask() {
	$("#f-name").val("");
	$("#f-date").val("");
	$("#f-time").val("");
}

function removeTask(el) {
	//TODO:
	//probs need php eventually or something
	var id = el.closest(".taskRow").getElementsByTagName("p")[0].innerHTML;

	//for (var i = 0; i < tasks.length; i++) {
	//	if (tasks[i].id == id) {
	//		tasks.splice(i, 1);
	//		break;
	//	}
//	}

	removeTask(id);
	getTasks();

	
	//el.closest(".taskRow").remove();
	//updateGraph();
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
		console.log(tasks[i].title);
		addRow(tasks[i].title, tasks[i].goal_date, tasks[i].total_time, tasks[i].progress_time, tasks[i].id);
	}
	
	//addRow(name, date, time, "0", id);
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
	$(".date-input").datepicker({
		minDate: 0
	});

	$("#btn-addTask").on("click", function() {
		$("#addTaskDialog").dialog("open");
	});

	$("#addTaskDialog").dialog({
		autoOpen : false,
		modal : true,
		close : function() {
			clearAddTask();
		}
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
		//TODO: Idek
		//var id = $(this).getElementsByTagName("p")[0].innerHTML;
		
		//console.log(id);
		//I suppose this is fine...
		$("#updateTaskDialog").dialog("open");
		var name = $(this).find(".taskName").text();
		var date = $(this).find(".taskDate").text();
		var estimate = $(this).find(".taskEstimate").text();
		var progress = $(this).find(".taskProgress").text();
		
		
		$("#update-f-name").val(name);
		$("#update-f-date").val(date);
		$("#update-f-time").val(estimate);
		$("#update-f-progress").val(progress);
	});

	$("#btn-closeAddTask").on("click", function() {
		$("#addTaskDialog").dialog("close");
	});

	$("#btn-submitAddTask").on("click", function() {
		addTask();
		$("#addTaskDialog").dialog("close");
	});
	
	$("#btn-submitUpdateTask").on("click", function() {
		//updateTask();
		$("#addTaskDialog").dialog("close");
	});
}
