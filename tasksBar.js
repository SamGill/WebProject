function addRow(name, date, estimate, progress) {

	var nameHtml = "<div>Name: <span class = 'taskName'>" + String(name) + "</span>" + "<input class='task-input' val='" + String(name) + "'/></div>";
	var dateHtml = "<div>Due: <span class = 'taskDate'>" + String(date) + "</span>" + "<input class='task-input' val='" + String(date) + "'/></div>";
	var estimateHtml = "<div>Time: <span class = 'taskEstimate'>" + String(estimate) + "</span>" + "<input class='task-input' val='" + String(estimate) + "'/></div>";
	var progressHtml = "<div>Progress: <span class = 'taskProgress'>" + String(progress) + "</span>" + "<input class='task-input' val='" + String(progress) + "'/></div>";

	var sideButtons = "<button>X</button>" + "<br/>" + "<button>Check</button>";

	var html = "<tr class='taskRow'>" + "<td>" + nameHtml + dateHtml + estimateHtml + progressHtml + "</td>" + "<td>" + sideButtons + "</td>" + "</tr>";

	$("#tasksTable").append(html);
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
