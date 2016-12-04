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

		//Toggle "About" Modal
		$("#btn-about").on("click", function() {
			$("#AboutModal").css({
				display : "block"
			});
		});

		$("#closeContact").on("click", function() {

			$("#about-modal-body").replaceWith("<div class=\"modal-body\" id='about-modal-body'><center>This web app was created by some passionate developers, just for you!</center><center id=\"ctr-name\">Sam Gill</center><center id=\"ctr-name\">Jonathan Worobey</center><center id=\"ctr-name\">Garth Murray</center></div>");

			$("#btn-cancel-contact").css({
				display : "none"
			});
			$("#btn-submit-contact").css({
				display : "none"
			});
			$("#btn-contact").css({
				display : "block"
			});
			$("#AboutModal").hide();
		});

		$(".body").on("click", function() {
			$("#AboutModal").css({
				display : "none"
			});
		});

		//Modal "Contact Us" button
		$("#btn-contact").on("click", function() {
			$("#about-modal-body").fadeOut('slow', function() {
				$("#about-modal-body").replaceWith("<div class=\"modal-body\" id='about-modal-body'><form id=\"emailForm\" method=\"POST\" action =\"email.php\"<div class=\"form-group\"><textarea class=\"form-control\" name=\"emailContent\" rows=\"10\">");
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
		$("#btn-cancel-contact").on("click", function() {
			$("#about-modal-body").fadeOut('slow', function() {
				$("#about-modal-body").replaceWith("<div class=\"modal-body\"><center>This web app was created by some passionate developers, just for you!</center><center id=\"ctr-name\">Sam Gill</center><center id=\"ctr-name\">Jonathan Worobey</center><center id=\"ctr-name\">Garth Murray</center></div>");
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
		
		setTaskBarHeight();

		updateGraph();
		getTasks();
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
