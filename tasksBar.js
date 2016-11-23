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
	
	//should be up to the server to create a task id
	var d = new Date();
	var id = d.getTime();
	
	addRow(name, date, time, "0", id);
	
	//delete this later, this information should come from the database... I think
	var t = new Task(name, new Date(date), parseInt(time), id);
	tasks.push(t);
	updateGraph();
}

function clearAddTask() {
	$("#f-name").val("");
	$("#f-date").val("");
	$("#f-time").val("");
}

function removeTask(el) {
	//probs need php eventually or something
	var id = el.closest(".taskRow").getElementsByTagName("p")[0].innerHTML;
	
	//$(e1).closest()
	
	for(var i = 0; i < tasks.length; i++){
		if(tasks[i].id == id){
			tasks.splice(i,1);
			break;
		}
	}
	
	el.closest(".taskRow").remove();
	updateGraph();
}
