<?php
	require 'PHPMailerAutoload.php';
	$mail = new PHPMailer;
	$mail->isSMTP();
	$mail->SMTPDebug = 1;
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = 'ssl';
	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 465;
	$mail->IsHTML(true);
	$mail->Username = "comp422gcc@gmail.com";
	$mail->Password = "drwolfe1234";
	$mail->SetFrom('krazy4quizzing@gmail.com', 'Bilbo Baggins');
	$mail->AddReplyTo('krazy4quizzing@gmail.com', 'Bilbo Baggins');
	$mail->Subject = "Level.Effort Mailer";
	$msg = "test";
	if($_SERVER["REQUEST_METHOD"] == "POST") {
		$msg = $_POST['emailContent'];
	}
	
	
	$mail->Body = $msg;
	
	$address = "krazy4quizzing@gmail.com";
	$mail->AddAddress($address);
	if(!$mail->Send()) {
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		echo "Message sent!";
	}
	
	//ini_set("SMTP","ssl://smtp.gmail.com");
	//ini_set("smtp_port", "587");
	/*$headers = 'From: krazy4quizzing@gmail.com' . "\r\n" . 'Reply-To: krazy4quizzing@gmail.com';
	$msg = "test";
	if($_SERVER["REQUEST_METHOD"] == "POST") {
		$msg = $_POST["emailContent"];
	}

//Send mail
mail("krazy4quizzing@gmail.com", "PHP Test", $msg, $headers);*/

?>