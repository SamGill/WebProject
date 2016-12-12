var greenBackground = "#558C89 !important";
var otherBackground = "#D2B48C !important";

function changeBackground() {
	$('.greenBackground').each(function(index) {
		$(this).removeClass('greenBackground');
		$(this).addClass('otherBackground');
	});
}

function setBackground(color) {
	if (color === "green") {
		$('.modal-header, .modal-footer').each(function(index) {
			$(this).addClass('greenBackground');
			$(this).removeClass('otherBackground');
		});
	}
}

function showAboutModal() {
	$("#AboutModal").show();
	$("#about-modal-body").html("<center>This web app was created by some passionate developers, just for you!</center>" + "<center id=\"ctr-name\">Sam Gill</center><center id=\"ctr-name\">Jonathan Worobey</center>" + "<center id=\"ctr-name\">Garth Murray</center>");
}

function closeAboutModal() {
	$("#about-modal-body").html("<center>This web app was created by some passionate developers, just for you!</center>" + "<center id=\"ctr-name\">Sam Gill</center><center id=\"ctr-name\">Jonathan Worobey</center>" + "<center id=\"ctr-name\">Garth Murray</center>");

	$("#btn-cancel-contact").hide();
	$("#btn-submit-contact").hide();
	$("#btn-contact").show();
	$("#AboutModal").hide();
}


$(document).ready(function() {
	
	//THIS IS TO SOLVE AN ANNOYING BUG WHERE JQUERY.LOAD CACHES DATA AND
	//THE CHANGES YOU MAKE DON'T APPEAR
	$.ajaxSetup({
		cache : false
	});

	$(window).on('resize', setTaskBarHeight);

	$("#mainSection").load("mainSection.html", function() {

		$("#btn-toggleTasks").on("click", function() {
			openNav();
		});

		//Toggle "Calendar" Modal
		$("#btn-calendar").on("click", function() {
			$("#CalendarModal").css({
				display : "block"
			});
		});

		//Toggle "About" Modal
		$("#btn-about").on("click", function() {
			showAboutModal();
		});

		$("#closeContact").on("click", function() {
			closeAboutModal();
		});

		$("#closeCalendar").on("click", function() {
			$("#CalendarModal").hide();
		});

		$("#closeDate").on("click", function() {
			$("#DateModal").hide();
		});

		$(".body").on("click", function() {
			$("#AboutModal").css({
				display : "none"
			});

			$("#CalendarModal").css({
				display : "none"
			});

			$("#DateModal").css({
				display : "none"
			});
		});

		//Modal "Contact Us" button
		$("#btn-contact").on("click", function() {
			$("#about-modal-body").fadeOut('slow', function() {
				$("#about-modal-body").html("<form id=\"emailForm\" method=\"POST\" action =\"email.php\"<div class=\"form-group\"><textarea class=\"form-control\" name=\"emailContent\" rows=\"10\">");
				$("#about-modal-body").fadeIn('slow').slideDown('slow');
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
		$("#btn-cancel-contact, #closeContact").on("click", function() {
			$("#about-modal-body").fadeOut('slow', function() {
				$("#about-modal-body").html("<center>This web app was created by some passionate developers, just for you!</center><center id=\"ctr-name\">Sam Gill</center><center id=\"ctr-name\">Jonathan Worobey</center><center id=\"ctr-name\">Garth Murray</center>");
				$("#about-modal-body").fadeIn('slow');
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
			$(this).hide();
			$('#btn-cancel-contact').hide();
			$.ajax({
				url : "email.php",
				type : 'POST',
				data : $("#emailForm").serialize(),

				success : function(data) {
					$("#about-modal-body").fadeOut(function() {
						$("#about-modal-body").html("<center>Message sent successfuly!</center>");
						$("#about-modal-body").fadeIn('slow');
					});
					$("#btn-cancel-contact").fadeOut(function() {
						$("#btn-cancel-contact").css({
							display : "none"
						});
					});
					$("#btn-submit-contact").fadeOut(function() {
						$("#btn-submit-contact").css({
							display : "none"
						});
					});
				}
			});
		});

		$("#chart_controls_prev").on("click", function() {
			if (weekNum > 0)
				goBackOneWeek();
		});

		$("#chart_controls_next").on("click", function() {
			advanceOneWeek();
		});

		setTaskBarHeight();

		//updateGraph();
		getTasks();
		//updateLegend();
	});
	$("#tasksBar").load("tasksBar.html", function() {
		runTaskBarEventHandlers();
	});
	$("#accountPage").load("accountPage.php", function() {
		runAccountPageEventHandlers();
	});
	$("#chartInfoModal").load("chartInfoModal.html", function() {
		runChartInfoEventHandlers();
	});

});
