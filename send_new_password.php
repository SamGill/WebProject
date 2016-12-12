<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leveleffort";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn -> connect_error) {
	die("Connection failed: " . $conn -> connect_error);
}
$sql = "SELECT * FROM accounts WHERE email='" . $_POST['email'] . "'";
$result = $conn -> query($sql);

if ($result === FALSE) {
	echo("<p>Could not connect. Try again later</p>");
}

//If the email exists then we change the password
if ($result -> num_rows != 0) {
	$hashedNewPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
	$sql = "UPDATE `accounts` SET `password`='" . $hashedNewPassword . "' WHERE `email`='" . $_POST['email'] . "'";
	if ($conn -> query($sql) === FALSE) {
		echo("<p>Something went wrong. Could not update password correctly</p>");
	}
}

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
	$mail->SetFrom('LevelTeam@gmail.com', 'Level.Effort');
	$mail->Subject = "Level.Effort Mailer";
	if($_SERVER["REQUEST_METHOD"] == "POST") {
		$msg = 'Hello from the Level.Effort!<br/><br/>Your new password is: <strong>' . 
		$_POST["password"] . '</strong><br/><br/>If you didn\'t initiate the password recovery something fishy is going on.<br/><br/>' .
		'You probs should get on that. Just saying\'<br/><br/>' .
		'Sincerely,<br/><br/>The Level.Effort Team';
	}
	
	
	$mail->Body = $msg;
	
	$address = $_POST["email"];
	$mail->AddAddress($address);
	if(!$mail->Send()) {
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		echo "Message sent!";
	}
?>