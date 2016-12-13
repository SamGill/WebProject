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
		
		//remove old task
		$sql = "DELETE FROM `tasks` ";
		$sql .= "WHERE `task_id`='" . $task_id . "' AND ";
		$sql .= "`user_id`='" . $_SESSION["user_id"] . "';";
		
		//echo $sql;
		if ($conn->query($sql) === FALSE) {
			echo "Failed to connect to the database: " . $conn->error . "\n";
			exit;
		}
		
		//add one task completion to the user's account
		$sql = "UPDATE `accounts` ";
		$sql .= "SET `completed_tasks` = `completed_tasks` + 1 ";
		$sql .= "WHERE `user_id`='" . $_SESSION["user_id"] . "';";
		
		if ($conn->query($sql) === FALSE) {
			echo "Failed to connect to the database: " . $conn->error . "\n";
			exit;
		}
		
		//now check to see if he should be upgraded to gold.
		$sql = "SELECT `completed_tasks` FROM `accounts` ";
		$sql .= "WHERE `user_id`='" . $_SESSION["user_id"] . "';";
		
		$result = $conn->query($sql);
		if ($result === FALSE) {
			echo "Failed to connect to the database: " . $conn->error . "\n";
			exit;
		}
		$row = $result->fetch_array(); 
    	$completedTasks = $row[0];
		if($completedTasks >= 15){////GOLLLLLD!
			//set user to gold (yes this will run even if he's already gold, checking for this will probably take nearly as much server cpu time (well... I doubt that, but development time is more important right now)).
			$sql = "UPDATE `accounts` ";
			$sql .= "SET `is_gold` = 1 ";
			$sql .= "WHERE `user_id`='" . $_SESSION["user_id"] . "';";
			
			if ($conn->query($sql) === FALSE) {
				echo "Failed to connect to the database: " . $conn->error . "\n";
				exit;
			}
			else {
				$_SESSION["is_gold"] = 1;
			}
		}
		$conn->close();
		
	}
	else{
		echo "Not a POST...?";
		exit;
	}
?>