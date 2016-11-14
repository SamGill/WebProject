$(document).ready(function() {
	$("#mainSection").load("mainSection.html", function() {
		$("#btn-toggleTasks").on("click", function() {
			$("#tasksBar").toggle("fast");
		});
		
		//Toggle "About" Modal
		$("#btn-about").on("click", function () {
			$("#AboutModal").css({display: "block"});
		});
		
		$(".close").on("click", function(){
			$("#AboutModal").css({display: "none"});
			$(".modal-body").replaceWith("<div class=\"modal-body\"><center>This web app was created by some passionate developers, just for you!</center><center id=\"ctr-name\">Sam Gill</center><center id=\"ctr-name\">Jonathan Worobey</center><center id=\"ctr-name\">Garth Murray</center></div>");

			$("#btn-cancel-contact").css({display: "none"});
			$("#btn-submit-contact").css({display: "none"});
			$("#btn-contact").css({display: "block"});
			
		});
		
		$(".body").on("click", function(){
			$("#AboutModal").css({display: "none"});
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
				$("#btn-cancel-contact").css({display: "block"});
			});
			$("#btn-submit-contact").fadeIn('slow', function() {
				$("#btn-submit-contact").css({display: "block"});
			});
			$("#btn-contact").fadeOut('slow', function() {
				$("#btn-contact").css({display: "none"});
			});
		});
		
		//Modal Cancel Button
		$("#btn-cancel-contact").on("click", function() {
			$(".modal-body").fadeOut('slow', function() {
				$(".modal-body").replaceWith("<div class=\"modal-body\"><center>This web app was created by some passionate developers, just for you!</center><center id=\"ctr-name\">Sam Gill</center><center id=\"ctr-name\">Jonathan Worobey</center><center id=\"ctr-name\">Garth Murray</center></div>");
				$(".modal-body").fadeIn('slow');
			});
			$("#btn-cancel-contact").fadeOut('slow', function() {
				$("#btn-cancel-contact").css({display: "none"});
			});
			$("#btn-submit-contact").fadeOut('slow', function() {
				$("#btn-submit-contact").css({display: "none"});
			});
			$("#btn-contact").fadeIn('slow', function() {
				$("#btn-contact").css({display: "block"});
			});
		});
		
		//Modal submit button
		$("#btn-submit-contact").on("click", function() {
			//$("#emailForm").submit();
			$.ajax({
				url: "email.php",
				type: 'POST',
				data: $("#emailForm").serialize(),

				success: function(data) {
					$(".modal-body").fadeOut('slow', function() {
					$(".modal-body").replaceWith("<div class=\"modal-body\"><center>Message sent successfuly!</center></div>");
					$(".modal-body").fadeIn('slow');
					});
					$("#btn-cancel-contact").fadeOut('slow', function() {
						$("#btn-cancel-contact").css({display: "none"});
					});
					$("#btn-submit-contact").fadeOut('slow', function() {
						$("#btn-submit-contact").css({display: "none"});
					});
				}
			});
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
