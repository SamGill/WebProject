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
			event.stopPropagation();
			var input = $(this).siblings(".task-input");
			input.show();
			input.val($(this).text());
			$(this).hide();
		});
		$("#tasksTable").on("keydown", ".task-input", function(event) {
			if (event.which == 13 || event.which == 27) {
				// ENTER or ESCAPE key
				var input = $(this);
				var content = $(this).siblings("span");
				// TODO: set content correctly

				if (event.which == 13) {
					// ENTER was pressed

					// TODO: set the content from the input
					content.text(input.val());
				}
				input.hide();
				content.show();
			}
		});
		
		$(".task-input").on("click", function(event) {
			event.stopPropagation();
		});
		
		$("body").on("click", function() {
			$(".task-input").each(function() {
				$(this).hide();
				$(this).siblings("span").show();
			});
		});
	});
});
