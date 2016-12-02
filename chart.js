function updateGraph() {
	//gives us the current time (used multiple places below)
	var now = new Date();

	//sort the tasks based on finishDate
	tasks.sort(function(a, b) {
		return (a.getDaysLeft(now) > b.getDaysLeft(now)) ? 1 : ((b.getDaysLeft(now) > a.getDaysLeft(now)) ? -1 : 0);
	});

	data = {
		labels : [],
		series : []
	}

	//initialize the task series
	for (var i = 0; i < tasks.length; i++) {
		data.series[i] = [];
	}

	//setting up the date legend
	for (var i = 0; i < 14; i++) {
		var tempDate = new Date();
		tempDate.setDate(now.getDate() + i);
		data.labels[i] = (tempDate.getMonth() + 1) + "/" + tempDate.getDate();
	}

	//setting the bars
	for (var i = 0; i < tasks.length; i++) {
		for (var j = 0; j < 14; j++) {
			data.series[i][j] = tasks[i].getTime() - (tasks[i].getDailyTime(now) * j);
			if (data.series[i][j] < 0) {
				data.series[i][j] = 0;
			}
		}
	}

	options = {
		stackBars : true,
		axisY : {
			labelInterpolationFnc : function(value) {
				return value;
			},
			onlyInteger : true
		}
	}
	//new Chartist.Line('.ct-chart', data);
	new Chartist.Bar('.ct-chart', data, options).on('draw', function(data) {
		if (data.type === 'bar') {
			data.element.attr({
				style : 'stroke-width: 5%',
				onclick : "chartBoxClick(this);"
			});
		}
	});
}

//Legend functions
function setLegend() {
	var rowCount = $("#tasksTable tr");
	console.log(rowCount);
}

function chartBoxClick(box){
	var parent = $(box).closest("g");
	var childNum;
	for(var i = 0; i < parent[0].childNodes.length; i++){
		if($(parent[0].childNodes[i]).is($(box))){
			childNum = i;
			break;
		}
	}
	
	var grandParent = $(parent).parent();
	var parentNum;
	for(var i = 0; i < grandParent[0].childNodes.length; i++){
		if($(grandParent[0].childNodes[i]).is($(parent))){
			parentNum = i;
			break;
		}
	}
	
	var taskName = tasks[parentNum].title;
	var hoursToday = tasks[parentNum].getDailyTime(new Date());
	var percentComplete = 100 * tasks[parentNum].progress_hours / tasks[parentNum].total_hours;
	var goal_date = easyReadingFormattedDate(tasks[parentNum].goal_date);
	$("#chartDialog_hoursToday").text(hoursToday.toFixed(2));
	$("#chartDialog_percentComp").text(percentComplete.toFixed(2));
	$("#chartDialog_goalDate").text(goal_date);
	
	$("#chartDialog").dialog({
		autoOpen : false,
		modal : true,
		"title" : taskName
	});
	$("#chartDialog").dialog("open");
}

function runChartInfoEventHandlers(){
	//$("#chartDialog").toggle();
	$("#chartDialog").dialog({
		autoOpen : false,
		modal : true,
		"title" : "1"
	});
}

	

