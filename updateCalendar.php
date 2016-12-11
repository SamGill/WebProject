<?php
	session_start();
	function updateCalendar() {
	for(var i = 0; i < tasks.length; i++)
	{
		var newElement;
		newElement = JSON.stringify({date: tasks[i].goal_date, badge:true, title: tasks[i].title, body: "Testing", footer: "footer", classname: "classname"});
	}	
}
?>