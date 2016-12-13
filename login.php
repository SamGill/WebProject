<?php
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "leveleffort";
	
	if(isset($_SESSION["user_id"]))//redirect to main page if they already have a session
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
		/*else if(!ctype_alnum ($_POST['username'])){
			array_push($errors, "Username not valid, letters and numbers only.");
		}*/
		
		//check the password
		if($_POST['password'] === ''){
			array_push($errors, "Password field empty.");
		}
		else{
			if(strlen($_POST['password']) < 8){
				array_push($errors, "Password too short, must be at least 8 characters long.");
			}
			if(!mb_detect_encoding($_POST['password'], 'ASCII', true)){
				array_push($errors, "Password field contains non-ASCII character.");
			}
		}
		
		//cleared initial errors
		if(sizeof($errors) == 0){
			//get the user's info
			
			//Create connection
			$conn = new mysqli($servername, $username, $password, $dbname);
			// Check connection
			if ($conn->connect_error) {
			    die("Connection failed: " . $conn->connect_error);
			} 
			
			$sql = "SELECT * FROM accounts WHERE username='" . strtolower($_POST['username']) . "'";
			$sqlEmail = "SELECT * FROM accounts WHERE email='" . strtolower($_POST['username']) . "'";
			
			$result = $conn->query($sql);
			$resultEmail = $conn->query($sqlEmail);
			
			if ($result === FALSE) {
    			array_push($errors, "Failed to connect to the database");
			}	
			else if ($result->num_rows == 0 && $resultEmail->num_rows == 0) {
			    array_push($errors, "Account not found.");
			}
			else{					
				
				$row = $result->fetch_assoc();
				if ($result->num_rows == 0) {
					$row = $resultEmail->fetch_assoc();
				}
				
				//echo $row['name'];
				if(password_verify($_POST['password'], $row['password'])) {//check if the passwords match
					// Set session variables
					$_SESSION["username"] = $row['username'];
					$_SESSION["user_id"] = $row['user_id'];
					$_SESSION["is_gold"] = $row['is_gold'];
					$_SESSION["completed_tasks"] = $row['completed_tasks'];
					//finally, go to the main page
					header("Location: index.php");
					exit;
				}
				else {//bad password
					array_push($errors, "Username/email and password do not match.");
				}
			}
		}
		if(sizeof($errors) == 0){
			//create session
			header("Location: index.php");
			exit;
		}//else, continue to the login page.
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
								<a href="#" class="active" id="login-form-link">Login</a>
							</div>
							<div class="col-xs-6">
								<a href="#" id="register-form-link">Register</a>
							</div>
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form id="login-form" action="login.php" method="post" role="form" style="display: block;">
									<div class="form-group">
										<input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Username" value="">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password">
									</div>
									<div class="form-group text-center">
										<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
										<label for="remember">Remember Me</label>
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
													<a tabindex="5" class="forgot-password">Forgot Password?</a>
												</div>
											</div>
										</div>
									</div>
								</form>
								<form id="register-form" action="register.php" method="post" role="form" style="display: none;">
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
								<div id="password-recovery-form" style="display:none">
									<div id="new-password-main-info">
										<div class="form-group">
											<h3>
												Password Recovery
											</h3>
											<input type="email" class="form-control" placeholder="enter email" name="recovery-field" id="recovery-field">
										</div>
										<div class="form-group">
											<div class="row">
												<div class="col-sm-6 col-sm-offset-3">
													<input type="submit" class="form-control btn btn-recovery" onclick="send_recovery_email()" value="Send Recovery Email"/>
												</div>
											</div>
										</div>
									</div>
									<div id="reset-successful-info">
										<p>New Password sent!</p>
									</div>
								</div>
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