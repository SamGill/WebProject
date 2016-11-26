<?php
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "leveleffort";
	
	if(!isset($_SESSION["user_id"])){//make sure they're logged in
		echo "Not logged in.";
		exit;
	}
	else if ($_SERVER['REQUEST_METHOD'] === 'POST') {//make sure it's a POST		
		//Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
		    die("Connection failed: " . $conn->connect_error);
		}
		
		//sanitize
		$task_id = filter_var($_POST["task_id"], FILTER_SANITIZE_STRING);
		
		$sql = "DELETE FROM `tasks` ";
		$sql .= "WHERE `task_id`='" . $task_id . "' AND ";
		$sql .= "`user_id`='" . $_SESSION["user_id"] . "';";
		
		//echo $sql;
		if ($conn->query($sql) === FALSE) {
			echo "Failed to connect to the database: " . $conn->error . "\n";
			exit;
		}
		
		$conn->close();
		
	}
	else{
		echo "Not a POST...?";
		exit;
	}
?>