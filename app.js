class Task {
	constructor(name, finishDate, time, id) {
		this.name = name;
		this.finishDate = finishDate;
		this.time = time;
		this.id = id;
	}
	getDaysLeft(fromHere) {
		//returns the number of hours to work each day based on fromHere and finishDate.
		var timeDiff = Math.abs(this.finishDate.getTime() - fromHere.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		return diffDays;
	}
	getDailyTime(fromHere) {
		return this.time / this.getDaysLeft(fromHere);
	}
	getTime() {
		return this.time;
	}
}

var tasks = [];

//testing
function getTasks() {
	var testDate = new Date(2016, 10, 20, 0, 0, 0, 1);
	var testTask = new Task("test", testDate, 8);

	var testDate2 = new Date(2016, 10, 23, 0, 0, 0, 1);
	var testTask2 = new Task("test2", testDate2, 16);

	var tasks = [];
	tasks[0] = testTask;
	tasks[1] = testTask2;
	tasks[2] = testTask;
	return tasks;
}

function updateGraph() {
	//gives us the current time (used multiple places below)
	var now = new Date();

	//sort the tasks based on finishDate
	tasks.sort(function(a, b) {
		return (a.getDaysLeft(now) > b.getDaysLeft(now)) ? 1 : ((b.getDaysLeft(now) > a.getDaysLeft(now)) ? -1 : 0);
	});

	data = {
		labels : [],
		series : []
	}

	//initialize the task series
	for (var i = 0; i < tasks.length; i++) {
		data.series[i] = [];
	}

	//setting up the date legend
	for (var i = 0; i < 14; i++) {
		var tempDate = new Date();
		tempDate.setDate(now.getDate() + i);
		data.labels[i] = (tempDate.getMonth() + 1) + "/" + tempDate.getDate();
	}

	//setting the bars
	for (var i = 0; i < tasks.length; i++) {
		for (var j = 0; j < 14; j++) {
			data.series[i][j] = tasks[i].getTime() - (tasks[i].getDailyTime(now) * j);
			if (data.series[i][j] < 0) {
				data.series[i][j] = 0;
			}
		}
	}

	options = {
		stackBars : true,
		axisY : {
			labelInterpolationFnc : function(value) {
				return value;
			},
			onlyInteger : true
		}
	}
	//new Chartist.Line('.ct-chart', data);
	new Chartist.Bar('.ct-chart', data, options).on('draw', function(data) {
		if (data.type === 'bar') {
			data.element.attr({
				style : 'stroke-width: 5%'
			});
		}
	});
}

function setTaskBarHeight() {
	/*var windowHeight = $(window).innerHeight();

	var navHeight = $("#navContainer").height();
	var tasksBarHeight = windowHeight - navHeight - 2;
	$("#tasksBar").height(tasksBarHeight);
	$("#tasksBar table").height(tasksBarHeight);
	
	var bodyHeight = tasksBarHeight - $("#tasksBar table thead").height();
	
	$("#tasksBar table tbody").height(bodyHeight);*/
	
	var h = $(".sidenav").height() - $("#tasksBar table thead").height();
	$("#tasksBar table tbody").height(h);	
}


$(document).ready(function() {
	for (var i=0; i < 10; i++) {
	  	addRow("dummy", "blah", "2", "2", 2);
	};
	
	$(window).on('resize', setTaskBarHeight);
	
	$("#mainSection").load("mainSection.html", function() {
		$("#btn-toggleTasks").on("click", function() {
			openNav();
			/*var isVisible = $("#tasksBar").css("visibility") == "visible";
			if (isVisible) {
				$("#tasksBar").css('visibility', 'hidden');
			} else {
				$("#tasksBar").css('visibility', 'visible');
			}*/
		});

		//Toggle "About" Modal
		$("#btn-about").on("click", function() {
			$("#AboutModal").css({
				display : "block"
			});
		});

		$(".close").on("click", function() {
			$("#AboutModal").css({
				display : "none"
			});
			$(".modal-body").replaceWith("<div class=\"modal-body\"><center>This web app was created by some passionate developers, just for you!</center><center id=\"ctr-name\">Sam Gill</center><center id=\"ctr-name\">Jonathan Worobey</center><center id=\"ctr-name\">Garth Murray</center></div>");

			$("#btn-cancel-contact").css({
				display : "none"
			});
			$("#btn-submit-contact").css({
				display : "none"
			});
			$("#btn-contact").css({
				display : "block"
			});

		});

		$(".body").on("click", function() {
			$("#AboutModal").css({
				display : "none"
			});
		});

		//Modal "Contact Us" button
		$("#btn-contact").on("click", function() {
			$(".modal-body").fadeOut('slow', function() {
				$(".modal-body").replaceWith("<div class=\"modal-body\"><form id=\"emailForm\" method=\"POST\" action =\"email.php\"<div class=\"form-group\"><textarea class=\"form-control\" name=\"emailContent\" rows=\"10\">");
				$(".modal-body").fadeIn('slow').slideDown('slow');
				//Sets timeout so textbox can appear before focusing
				setTimeout(function() {
					$(".form-control").focus();
				}, 0);
			});

			$("#btn-cancel-contact").fadeIn('slow', function() {
				$("#btn-cancel-contact").css({
					display : "block"
				});
			});
			$("#btn-submit-contact").fadeIn('slow', function() {
				$("#btn-submit-contact").css({
					display : "block"
				});
			});
			$("#btn-contact").fadeOut('slow', function() {
				$("#btn-contact").css({
					display : "none"
				});
			});
		});

		//Modal Cancel Button
		$("#btn-cancel-contact").on("click", function() {
			$(".modal-body").fadeOut('slow', function() {
				$(".modal-body").replaceWith("<div class=\"modal-body\"><center>This web app was created by some passionate developers, just for you!</center><center id=\"ctr-name\">Sam Gill</center><center id=\"ctr-name\">Jonathan Worobey</center><center id=\"ctr-name\">Garth Murray</center></div>");
				$(".modal-body").fadeIn('slow');
			});
			$("#btn-cancel-contact").fadeOut('slow', function() {
				$("#btn-cancel-contact").css({
					display : "none"
				});
			});
			$("#btn-submit-contact").fadeOut('slow', function() {
				$("#btn-submit-contact").css({
					display : "none"
				});
			});
			$("#btn-contact").fadeIn('slow', function() {
				$("#btn-contact").css({
					display : "block"
				});
			});
		});

		//Modal submit button
		$("#btn-submit-contact").on("click", function() {
			//$("#emailForm").submit();
			$.ajax({
				url : "email.php",
				type : 'POST',
				data : $("#emailForm").serialize(),

				success : function(data) {
					$(".modal-body").fadeOut('slow', function() {
						$(".modal-body").replaceWith("<div class=\"modal-body\"><center>Message sent successfuly!</center></div>");
						$(".modal-body").fadeIn('slow');
					});
					$("#btn-cancel-contact").fadeOut('slow', function() {
						$("#btn-cancel-contact").css({
							display : "none"
						});
					});
					$("#btn-submit-contact").fadeOut('slow', function() {
						$("#btn-submit-contact").css({
							display : "none"
						});
					});
				}
			});
		});

		updateGraph(getTasks());

		setTaskBarHeight();

	});

	$("#tasksTable").on("click", ".taskName, .taskDate, .taskEstimate, .taskProgress", function(event) {
		showInputField(event, $(this));
	});

	$("#tasksTable").on("keydown", ".task-input", function(event) {
		handleTextInput(event, $(this));
	});

	//stops the textfield from disappearing when the user clicks on it
	$("#tasksTable").on("click", ".task-input", function(event) {
		event.stopPropagation();
	});

	//hide the textfield if anywhere is clicked
	$("body").on("click", function() {
		hideTextInput();
	});

	$("#f-date").datepicker();
	$(".date-input").datepicker();

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

	$("#btn-closeAddTask").on("click", function() {
		$("#addTaskDialog").dialog("close");
	});

	$("#btn-submitAddTask").on("click", function() {
		addTask();
		$("#addTaskDialog").dialog("close");
	});
});
