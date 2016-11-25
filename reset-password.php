<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leveleffort";
$errors = array();
if (sizeof($errors) == 0) {
	//get the user's info
	//Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn -> connect_error) {
		die("Connection failed: " . $conn -> connect_error);
	}
	$sql = "SELECT * FROM accounts WHERE username='" . $_SESSION['username'] . "'";
	$result = $conn -> query($sql);
	if ($result === FALSE) {
		array_push($errors, "Failed to connect to the database");
	}
	if ($result -> num_rows == 0) {
		array_push($errors, "Something went wrong. Try again later.");
	} else {
		$row = $result -> fetch_assoc();
		if (!password_verify($_POST['old-password'], $row['password'])) {//check if the passwords match
			array_push($errors, "Please enter in old password.");
		}
		if ($_POST['new-password'] != $_POST['confirm-new-password']) {
			array_push($errors, "Passwords did not match");
		}
		if (strlen($_POST['new-password']) < 8) {
			array_push($errors, "Password too short, must be at least 8 characters long.");
		}
		if (!mb_detect_encoding($_POST['new-password'], 'ASCII', true)) {
			array_push($errors, "Password field contains non-ASCII character.");
		}
	}

	if (sizeof($errors) == 0) {
		$hashedNewPassword = password_hash($_POST['new-password'], PASSWORD_DEFAULT);
		$sql = "UPDATE `accounts` SET `password`='" . $hashedNewPassword . "' WHERE `user_id`='" . $_SESSION['user_id'] . "'";

		if ($conn -> query($sql) === FALSE) {
			array_push($errors, "Something went wrong");
		}
	}

	if (sizeof($errors) == 0) {
		echo('<div class="alert alert-success">');
		echo('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');
		echo('<strong>Success:</strong> Password updated');
		echo('</div>');
	} else {
		foreach ($errors as &$value) {
			echo('<div class="alert alert-danger">');
			echo('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');
			echo('<strong>Error: </strong>');
			echo($value);
			echo('</div>');
		}
	}
}
?>