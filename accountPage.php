<?php
session_start();
?>
<!DOCTYPE html>

<div id="accountModal" class="modal">
	<!-- Modal content -->
	<div class="col-md-6 col-md-offset-3" id="errors-location">

	</div>
	<div id="accountInfo">
		<div class="modal-content">
			<div class="modal-header">
				<span class="close closeAccount">&times; </span>
				<h2>My Account </h2>
			</div>
			<div class="modal-body">
				<center>
					Hello, <strong> <?php
					echo($_SESSION["username"]);
					?></strong>!
				</center>
				<center>
					You've completed
					<?php echo($_SESSION["completed_tasks"])?>
					tasks.
				</center>
				<center>
					<?php
					if ($_SESSION["is_gold"]) {
						echo("Status: <strong>Gold</strong>. Thanks for using our Website!");
					} else {
						echo("Status: <strong>Normal</strong>. Complete " . (15 - $_SESSION["completed_tasks"]) . " more tasks to become gold!");
					}
					?>
				</center>
			</div>
			<div class="modal-footer">
				<div class="row">
					<div class="col-sm-2 text-center">
						<footer style="float:left">
							<a id="changePasswordLink">Change Password </a>
						</footer>
					</div>
					<div class="col-sm-8 text-center">
						<button type="button" class="btn btn-warning center-block closeAccount">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
<div id="resetPasswordInfo">
	<div class="modal-content">
		<div class="modal-header">
			<span class="close closeAccount">&times; </span>
			<h2> Reset Password </h2>
		</div>
		<div class="modal-body">
			<form role="form" method="post" id="new-password-form" action="accountPage.php">
				<div class="form-group reset-group">
					<label for="old-password">Old Password </label>
					<input name="old-password" type="password" id="old-password" class="form-control"/>
				</div>
				<div class="form-group reset-group">
					<label for="new-password"> New Password </label>
					<input name="new-password" type="password" id="new-password" class="form-control"/>
				</div>
				<div class="form-group reset-group">
					<label for="confirm-new-password"> Confirm Password </label>
					<input name="confirm-new-password" type="password" id="confirm-new-password" class="form-control"/>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<div class="row">
				<div class="col-sm-6 text-center">
					<button type="button" class="btn btn-warning center-block" id="btn-cancel-reset-password">
						Back
					</button>
				</div>
				<div class="col-sm-6 text-center">
					<button class="btn btn-warning center-block" onclick="resetPassword()">
						Submit
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
</div>