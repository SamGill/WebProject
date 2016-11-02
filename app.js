$(document).ready(function() {
	$("#mainSection").load("mainSection.html", function() {
		$("#btn-toggleTasks").on("click", function() {
			$("#tasksBar").toggle("fast");
		});

		var data = {
			// A labels array that can contain any sort of values
			labels : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
			// Our series array that contains series objects or in this case series data arrays
			series : [[5, 2, 4, 2, 0]]
		};

		// Create a new line chart object where as first parameter we pass in a selector
		// that is resolving to our chart container element. The Second parameter
		// is the actual data object.
		new Chartist.Line('.ct-chart', data);
	});
	$("#tasksBar").load("tasksBar.html", function() {
		addRow("TestRow", new Date().toDateString(), "2.0 Hours", "1 Hour");

		$("#tasksTable").on("click", ".taskName, .taskDate, .taskEstimate, .taskProgress", function(event) {
			showInputField(event, $(this));
		});

		$("#tasksTable").on("keydown", ".task-input", function(event) {
			handleTextInput(event, $(this));
		});

		//stops the textfield from disappearing when the user clicks on it
		$(".task-input").on("click", function(event) {
			event.stopPropagation();
		});

		//hide the textfield if anywhere is clicked
		$("body").on("click", function() {
			hideTextInput();
		});
		
		$( "#f-date" ).datepicker();
		$(".date-input").datepicker();
		
		$("#btn-addTask").on("click", function() {
			$("#addTaskDialog").dialog("open");
		});
		
		$("#addTaskDialog").dialog({
			autoOpen : true,
			modal : true,
			buttons : {
				"Add Task" : function() {
					addTask();
					$(this).dialog("close");
				},
				Cancel : function() {
					$(this).dialog("close");
				}
			},
			close : function() {
				clearAddTask();				
			}
		});
		
		
	});
});
