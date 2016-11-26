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
	
	//Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 
	$sql = "SELECT `task_id`, `entry_date`, `goal_date`, `title`, `total_hours`, `progress_hours` FROM `tasks` WHERE `user_id` = '";
	$sql .= $_SESSION["user_id"];
	$sql .= "';";
	
	$result = $conn->query($sql);
	if ($result === FALSE) {
		echo "Failed to connect to the database: " . $conn->error . "\n";
	}
	else{
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
		    $rows[] = $r;
		}
		print json_encode($rows);
	}
	
	$conn->close();
?>