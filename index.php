<?php
	session_start();
	if(!isset($_SESSION["user_id"]))//redirect to login page
	{
		header("Location: login.php");
		exit;
	}
?>

<!-- Copy and paste this anywhere where gold users get special privileges.
	<?php
		if($_SESSION["is_gold"] != 0){
			//Do stuff for gold users!
		}
	?>
-->

<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta charset="utf-8">
		<title>Level.Effort</title>
		<!--<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.1/themes/smoothness/jquery-ui.css" />-->
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<link rel="stylesheet" href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css">
		<link rel="stylesheet" href="styles.css">
		<link rel="stylesheet" href="button.css">
		<link rel="stylesheet" href="aboutModal.css">
		<link rel="stylesheet" href="myCalendar.css">
		<link rel="stylesheet" href="zabuto_calendar.min.css">
		<link rel="stylesheet" href="colors.css">
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=PT+Sans">
		<link rel="stylesheet" type="text/css" href="overlay.css">
	</head>
	<body>
		<nav class="navbar navbar-light greenBackground" id="navContainer">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" style="border-color: #ECECEA;">
						<span class="icon-bar" style="background-color: #ECECEA;"></span>
						<span class="icon-bar" style="background-color: #ECECEA;"></span>
						<span class="icon-bar" style="background-color: #ECECEA;"></span>
					</button>
					<!-- <a class="navbar-brand" href="#" style="color: white;">Level.Effort</a> -->
					<a class="navbar-brand" href="#"><img src="logo1.png" class="center-block logo"></a>
				</div>
				<div class="collapse navbar-collapse" id="myNavbar">
					<ul class="nav navbar-nav">
						<li>
							<a href="#" id="btn-toggleTasks" style="color: white;"class="mainButton greenBackground">Show Tasks</a>
						</li>
						<li>
							<a href="#" id="btn-calendar" style="color: white;"class="mainButton greenBackground">Calendar</a>
						</li>
						<?php
							//if($_SESSION["is_gold"] != 0){
									//Do stuff for gold users!
								echo("<li>" .
								"<a href='#' id='btn-change-background' onclick='changeBackground()' style='color: white;' class='mainButton greenBackground'>Change Color</a>"
								."</li>"						
								 );
							//}
						?>
						
					</ul>
					<ul class="nav navbar-nav navbar-right navbar">
						<!-- <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li> -->
						<!-- <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li> -->
						<li>
							<a href="#" id="btn-account" style="color: white;" class="mainButton greenBackground">
							<?php
								echo ucfirst($_SESSION["username"]);
							?>
							</a>
						</li>
						<li>
							<a href="logout.php" id="btn-logout" style="color: white; border-color: white" class="mainButton greenBackground">Logout</a>
						</li>
						<li>
							<a href="#" id="btn-about" style="color: white; border-color: white" class="mainButton greenBackground">About</a>
						</li>

					</ul>
				</div>
			</div>
		</nav>
		<div id="tasksBar" class="sidenav greenBackground"></div>
		<div id="mainSection"></div>
		<div id="CalendarModal" class="modal">
		<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-header greenBackground">
					<span class="close" id="closeCalendar">&times;</span>
					<h2>My Calendar</h2>
				</div>
				<div class="modal-body" id="about-modal-body">
					<div id="my-calendar"></div>
				</div>
				<div class="modal-footer greenBackground">
				</div>
			</div>
		</div>
		<div id="DateModal" class="modal">
		<!-- Modal content -->
			<div class="modal-content">
				<div class="modal-header greenBackground">
					<span class="close" id="closeDate">&times;</span>
					<h2 id="dateHeader">My Assignment</h2>
				</div>
				<div class="modal-body" id="dateModalBody">
				</div>
				<div class="modal-footer greenBackground">
				</div>
			</div>
		</div>
		<div id="accountPage"></div>
		<div id="chartInfoModal"></div>
		<!--<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/2.7.1/less.min.js"></script>
		<script src="http://code.jquery.com/jquery-3.1.0.min.js"   integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="   crossorigin="anonymous"></script>-->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<!-- Latest compiled and minified JavaScript -->
		<script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript" src="accountPage.js"></script>
		<script type="text/javascript" src="task_functions.js"></script>
		<script type="text/javascript" src="database_connections.js"></script>
		<script type="text/javascript" src="chart.js"></script>
		<script type="text/javascript" src="tasksBar.js"></script>
		<script type="text/javascript" src="myCalendar.js"></script>
		<script type="text/javascript" src="app.js"></script>
		<script type="text/javascript" src="zabuto_calendar.min.js"></script>
	</body>
	<!--for instance!-->
	<?php
		if($_SESSION["is_gold"] != 0){
			echo '<img src="http://25.media.tumblr.com/7747602ffb00f8bca26d2ecef35a682b/tumblr_mslx9kWDn11rkumvuo1_400.gif">';
		}
	?>
	<!--delete this bullcrap later-->
</html>