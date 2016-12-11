function updateCalendar() {
	var newElement;
	/*for(var i = 0; i < tasks.length; i++)
	{
		//var newElement;
		newElement = JSON.stringify({date: tasks[i].goal_date, badge:true, title: tasks[i].title, body: "Testing", footer: "footer", classname: "classname"});
	}*/
	
	newElement = {
		date: "2016-12-10", 
		badge: true, 
		title: "test", "body": "Testing", 
		footer: "footer", 
		classname: "classname"
	};
	
	var json = JSON.stringify(newElement);
	var dataStuff = [json];
	//console.log(json);
	return dataStuff;
}