function getTasksCompleted() {
	var getRequest = $.get("accountPageGetInfo.php", function (data) {
		var obj = JSON.parse(data);
		
		$("#tasks-completed").html("You've completed " + String(obj.numberTasks) + " tasks.");
		
		var htmlInfo = "";
		if (Number(obj.numberTasks) >= 15) {
			htmlInfo = "Status: <strong>Gold</strong>. Thanks for using our Website!";	
		} else {
			htmlInfo = "Status: <strong>Normal</strong>. Complete " + String(15 - obj.numberTasks) + " more tasks to become gold!";  
		}
		$("#account-gold-section").html(htmlInfo);
	})
	.fail(function(data) {
		$("#tasks-completed").html(data);
	});
}

function clearPasswordReset() {
	$("#old-password").val("");
	$("#new-password").val("");
	$("#confirm-new-password").val("");
}

function resetPassword() {
	var old_password = $("#old-password").val();
	var new_password = $("#new-password").val();
	var confirm_new_password = $("#confirm-new-password").val();

	var jsonData = {
		"old-password" : old_password,
		"new-password" : new_password,
		"confirm-new-password" : confirm_new_password
	};
	$.post("reset-password.php", jsonData).done(function(data) {
		$("#errors-location").html(data);
		clearPasswordReset();
	});
}

function runAccountPageEventHandlers() {
	$("#btn-account").on("click", function() {
		$("#accountModal").show();
		$("#accountInfo").show();
		$("#resetPasswordInfo").hide();
		getTasksCompleted();
	});
	$(".closeAccount").on("click", function() {
		$("#accountModal").hide();
	});
	$("#changePasswordLink").on("click", function() {
		$("#accountInfo").hide();
		$("#resetPasswordInfo").show();
	});

	$("#btn-cancel-reset-password").on("click", function() {
		$("#accountInfo").show();
		$("#resetPasswordInfo").hide();
	});

	$("#btn-cancel-reset-password, .closeAccount").on("click", function() {
		$("#errors-location").html("");
		clearPasswordReset();
	});
	
	getTasksCompleted();
}