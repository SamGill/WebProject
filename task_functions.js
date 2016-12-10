class Task {
	constructor(task_id, entry_date, goal_date, title, total_hours, progress_hours) {
		this.task_id = task_id;
		this.entry_date = entry_date;
		this.goal_date = goal_date;
		this.title = title;
		this.total_hours = total_hours;
		this.progress_hours = progress_hours;
		this.visible = true;
	}
	getDaysLeft(fromHere) {
		//returns the number of hours to work each day based on fromHere and finishDate.
		var timeDiff = this.goal_date.getTime() - fromHere.getTime();
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
		
		return diffDays;
	}
	getDailyTime(fromHere) {
		if(this.getDaysLeft(fromHere) <= 0)
			return this.getTime();
		return this.getTime() / this.getDaysLeft(fromHere);
	}
	getTime() {
		return this.total_hours - this.progress_hours;
	}
}

var tasks = [];
var lastTaskClicked;//this is for keeping track of which task we're updating after we open the update modal
var weekNum = 0;//at this point we should really make a class for this
