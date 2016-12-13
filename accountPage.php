<?php
session_start();
?>
<!DOCTYPE html>

<div id="accountModal" class="modal">
	<!-- Modal content -->	
	<div id="accountInfo">
		<div class="modal-content">
			<div class="modal-header greenBackground">
				<span class="close closeAccount">&times; </span>
				<h2>My Account </h2>
			</div>
			<div class="modal-body">
				<center>
					<h3>
					Hello, <strong> <?php
					echo($_SESSION["username"]);
					?></strong>!
					</h3>
				</center>
				
				<center >
				<h3 id="tasks-completed">
					
				</h3>	
				</center>
				<center >
					<h3 id="account-gold-section">
						
					</h3>
					
				</center>
			</div>
			<div class="modal-footer greenBackground">
				<div class="row">
					<div class="col-sm-8 text-center">
						<button type="button" style="margin-bottom: 2%; font-size: 1.1em;" class="btn btn-warning center-block closeAccount">
							Close
						</button>
					</div>
					<div class="col-sm-2 text-center">
						<a id="changePasswordLink">Change Password</a>
					</div>
				</div>
			</div>
		</div>
	</div>
<div id="resetPasswordInfo">
	<div class="row">
		<div class="col-md-6 col-md-offset-3" id="errors-location" style="margin-top: 10%">
	</div>
	</div>
	<div class="modal-content" style="margin-top: 0%;">
		<div class="modal-header greenBackground">
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
		<div class="modal-footer greenBackground">
			<div class="row">
				<div class="col-sm-6 text-center">
					<button type="button" style="width: 6em; margin-bottom: 1%;" class="btn btn-warning center-block" id="btn-cancel-reset-password">
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
