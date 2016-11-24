<?php
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "leveleffort";
	
	if(isset($_SESSION["user_id"]))//redirect to main page
	{
		header("Location: index.php");
		exit;
	}
	
	$errors = array();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		
		//check the username
		if($_POST['username'] === ''){
			array_push($errors, "Username field empty.");
		}
		else if(!ctype_alnum ($_POST['username'])){
			array_push($errors, "Username not valid, letters and numbers only.");
		}
		else{//make sure it's not taken 
			//Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);
			// Check connection
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 
			
			$sql = "SELECT * FROM accounts WHERE username='" . $_POST['username'] . "'";
			$result = $conn->query($sql);
			
			if ($result === FALSE) {
    			array_push($errors, "Failed to connect to the database");
			}
			else if ($result->num_rows > 0) { //username taken
			    array_push($errors, "Username unavailable.");
			}
			$conn->close();
		}
		
		//check the email 
		if($_POST['email'] === ''){
			array_push($errors, "Email field empty.");
		}
		else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			array_push($errors, "Email invalid.");
		}
		else{//make sure it isn't taken
			//Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);
			// Check connection
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 
			
			$sql = "SELECT * FROM accounts WHERE email='" . $_POST['email'] . "'";
			$result = $conn->query($sql);
			
			if ($result === FALSE) {
    			array_push($errors, "Failed to connect to the database");
			}
			else if ($result->num_rows > 0) { //username taken
			    array_push($errors, "Email already registered.");
			}
			$conn->close();
		}
		
		//check the password
		if($_POST['password'] === ''){
			array_push($errors, "Password field empty.");
		}
		else{
			if($_POST['password'] !== $_POST['confirm-password']){
				array_push($errors, "Passwords do not match.");
			}
			if(strlen($_POST['password']) < 8){
				array_push($errors, "Password too short, must be at least 8 characters long.");
			}
			if(!mb_detect_encoding($_POST['password'], 'ASCII', true)){
				array_push($errors, "Password field contains non-ASCII character.");
			}
		}
		
		//cleared initial errors
		if(sizeof($errors) == 0){
			//create user
			//hash the password
			$hashedEnteredPass = password_hash($_POST['password'], PASSWORD_DEFAULT);
			
			//create a unique user_id
			$user_id = uniqid();
						
			//Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);
			// Check connection
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 
			
			$sql = "INSERT INTO `accounts` (`username`, `email`, `is_gold`, `register_timestamp`, `user_id`, `password`) VALUES ('";
			$sql .= $_POST['username'] . "', '";
			$sql .= $_POST['email'] . "', '0', CURRENT_TIMESTAMP, '";
			$sql .= $user_id . "', '";
			$sql .= $hashedEnteredPass . "');";
			
			if ($conn->query($sql) === FALSE) {
    			array_push($errors, "Failed to connect to the database");
			}
			
			$conn->close();
		}
		if(sizeof($errors) == 0){
		
			// Set session variables
			$_SESSION["username"] = $_POST['username'];
			$_SESSION["user_id"] = $user_id;
			$_SESSION["is_gold"] = 0;
			
			//finally, go to the main page
			header("Location: index.php");
			exit;
		}
	}
?>

<!DOCTYPE html>
<html>
	<title>Level.Effort</title>
	<head>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
	
	<link rel="stylesheet" href="login_register.css">
	</head>
	<body>
	<div class="container">
        <div class="row">
        	<img src="logo1.png" class="center-block logo">
			<div class="col-md-6 col-md-offset-3"><br />
				<?php
					foreach ($errors as &$value) {
						echo('<div class="alert alert-danger">');
						echo('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>');
						echo('<strong>Error: </strong>');
						echo($value);
						echo('</div>');
					}
				?>
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row">
							<div class="col-xs-6">
								<a href="#" id="login-form-link">Login</a>
							</div>
							<div class="col-xs-6">
								<a href="#" class="active" id="register-form-link">Register</a>
							</div>
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form id="login-form" action="login.php" method="post" role="form" style="display: none;">
									<div class="form-group">
										<input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
									</div>
									<div class="form-group text-center">
										<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
										<label for="remember"> Remember Me</label>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Log In">
											</div>
										</div>
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-lg-12">
												<div class="text-center">
													<a href="http://phpoll.com/recover" tabindex="5" class="forgot-password">Forgot Password?</a>
												</div>
											</div>
										</div>
									</div>
								</form>
								<form id="register-form" action="register.php" method="post" role="form" style="display: block;">
									<div class="form-group">
										<input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
									</div>
									<div class="form-group">
										<input type="email" name="email" id="email" tabindex="1" class="form-control" placeholder="Email Address" value="">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
									</div>
									<div class="form-group">
										<input type="password" name="confirm-password" id="confirm-password" tabindex="2" class="form-control" placeholder="Confirm Password">
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Register Now">
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    
    <script src="http://code.jquery.com/jquery-3.1.0.min.js"   integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="   crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<script type="text/javascript" src="login_register.js"></script>
	</body>
</html>