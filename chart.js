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
		tempDate.setDate(now.getDate() + i + (weekNum * 7));
		data.labels[i] = (tempDate.getMonth() + 1) + "/" + tempDate.getDate();
	}

	//setting the bars
	for (var i = 0; i < tasks.length; i++) {
		if(!tasks[i].visible)
		{
			for (var j = 0; j < 14; j++) {
				data.series[i][j] = 0;
			}
		}
		else if(tasks[i].getDaysLeft(now) <= 0)//past the due date
		{
			if(weekNum == 0)//if we aren't looking at the current week, we shouldn't see any of these
				data.series[i][0] = tasks[i].getTime();
			else
				data.series[i][0] = 0;
			for (var j = 1; j < 14; j++) {
				data.series[i][j] = 0;
			}
		}
		else//not past due date
		{
			for (var j = 0; j < 14; j++) {
				data.series[i][j] = tasks[i].getTime() - (tasks[i].getDailyTime(now) * (j + ( weekNum * 7)));
				if (data.series[i][j] < 0) {
					data.series[i][j] = 0;
				}
			}
		}	
	}

	var maxBarHeight = 0;
	//get maxBarHeight
	for (var i = 0; i < tasks.length; i++) {
		if(tasks[i].visible)
			maxBarHeight += tasks[i].getTime();
	}
	
	options = {
		high: maxBarHeight,
        seriesBarDistance: 100,
        fullWidth: true,
		stackBars : true,
		axisY : {
			labelInterpolationFnc : function(value) {
				return value;
			},
			onlyInteger : true
		},
		axisX: {
	        showGrid: false,
	        // This value specifies the minimum width in pixel of the scale steps
	        scaleMinSpace: 40
      	}
    };
	//new Chartist.Line('.ct-chart', data);
	new Chartist.Bar('.ct-chart', data, options).on('draw', function(data, i) {
		if (data.type === 'bar') {
			data.element.attr({
				style : 'stroke-width: 5%',
				onclick : "chartBoxClick(this);"
			});
		}
	});
	updateLegend();
}


function updateLegend(){
	var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	
	$("#legendContent").html("");
	for(var i = 0; i < tasks.length; i++)
	{
		var newElement;
		if(tasks[i].visible)
			newElement = "<label class='legendLabels color-" + alpha[i] + "'><input type='checkbox' id='" + tasks[i].task_id + "' onClick='filterTask(this)' checked> " + tasks[i].title + "</label>";
		else
			newElement = "<label class='legendLabels color-" + alpha[i] + "'><input type='checkbox' id='" + tasks[i].task_id + "' onClick='filterTask(this)'> " + tasks[i].title + "</label>";
		$(legendContent).append(newElement);
	}	
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

function advanceOneWeek() {
	weekNum = weekNum + 1;	
	updateGraph();
}

function goBackOneWeek() {
	weekNum = weekNum - 1;	
	updateGraph();
}

function filterTask(item) {
	var id = $(item).attr("id");
	for(var i = 0; i < tasks.length; i++)
	{
		if(tasks[i].task_id == id)
		{
			if(tasks[i].visible)
				tasks[i].visible = false;
			else
				tasks[i].visible = true;
		}
	}
	updateGraph();
}
