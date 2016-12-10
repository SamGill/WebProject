<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "leveleffort";
$number = 0;
if (!isset($_SESSION["user_id"])) {//make sure they're logged in
	echo "Not logged in.";
	exit ;
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {//make sure it's a GET
	//Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn -> connect_error) {
		die("Connection failed: " . $conn -> connect_error);
	}

	$sql = "SELECT completed_tasks FROM `accounts` WHERE `user_id`='" . $_SESSION["user_id"] . "'";
	
	$result = $conn->query($sql);
	if ($result === FALSE) {
		echo "Failed to connect to the database: " . $conn->error . "\n";
	}
	else{
		$r = mysqli_fetch_assoc($result);
		//echo($number);
		$number = $r['completed_tasks'];		
	}
	$conn -> close();
	
	$jsonArray = array("numberTasks" => $number);
	print json_encode($jsonArray);
} else {
	echo "Not a GET request";
	exit ;
}
?>