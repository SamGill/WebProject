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
		$entry_date = filter_var($_POST["entry_date"], FILTER_SANITIZE_STRING);
		$goal_date = filter_var($_POST["goal_date"], FILTER_SANITIZE_STRING);
		$title = filter_var($_POST["title"], FILTER_SANITIZE_STRING);
		$total_hours = filter_var($_POST["total_hours"], FILTER_SANITIZE_NUMBER_INT);
		$progress_hours = filter_var($_POST["progress_hours"], FILTER_SANITIZE_NUMBER_INT);
		
		$date1=date_create($entry_date);
		$date2=date_create($goal_date);
		if($date2 < $date1){
			echo "Error: goal_date < entry_date.";
			exit;
		}
		
		if($total_hours < 0){
			echo "total_hours too small.";
			exit;
		}
		
		if($progress_hours < 0){
			echo "progress_hours too small.";
			exit;
		}
		
		$sql = "UPDATE `tasks`
				SET `goal_date`='" . $goal_date . "', ";
		$sql .= "`title`='" . $title . "', ";
		$sql .= "`total_hours`='" . $total_hours . "', ";
		$sql .= "`progress_hours`='" . $progress_hours . "'";
		$sql .= "WHERE `task_id`='" . $task_id . "';";
		
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