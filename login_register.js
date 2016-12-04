function make_new_password()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return String(text);
}

function send_recovery_email(){
	var post = $.post("send_new_password.php", { email: String($("#recovery-field").val()), password: make_new_password() });
	
	post.done(function(data){
		var newtext = "<p>New Password sent!</p>";
		$("#new-password-main-info").hide();
		$("#reset-successful-info").show();
	});
}

$(function() {
	$('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
		$("#register-form").fadeOut(100);
		$("#password-recovery-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
		$("#login-form").fadeOut(100);
		$("#password-recovery-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('a.forgot-password').click(function(e) {
		$("#password-recovery-form").delay(100).fadeIn(100);
		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		
		$("#new-password-main-info").show();
		$("#reset-successful-info").hide();
		$("#recovery-field").val("");
		e.preventDefault();
	});
});
