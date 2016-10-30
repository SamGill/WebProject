function addRow(name, date, estimate, progress) {

	var nameHtml = "<div>Name: <span class = 'taskName'>" + String(name) + "</span>" + "<input class='task-input' val='" + String(name) + "'/></div>";
	var dateHtml = "<div>Due: <span class = 'taskDate'>" + String(date) + "</span>" + "<input class='task-input' val='" + String(date) + "'/></div>";
	var estimateHtml = "<div>Time: <span class = 'taskEstimate'>" + String(estimate) + "</span>" + "<input class='task-input' val='" + String(estimate) + "'/></div>";
	var progressHtml = "<div>Progress: <span class = 'taskProgress'>" + String(progress) + "</span>" + "<input class='task-input' val='" + String(progress) + "'/></div>";

	var sideButtons = "<button>X</button>" + "<br/>" + "<button>Check</button>";

	var html = "<tr class='taskRow'>" + "<td>" + nameHtml + dateHtml + estimateHtml + progressHtml + "</td>" + "<td>" + sideButtons + "</td>" + "</tr>";

	$("#tasksTable").append(html);
}