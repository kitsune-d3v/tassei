const ALL_TASKS = JSON.parse(document.currentScript.getAttribute("data-active"))
const MONTHS = [
    {
        name: "January",
        days: 31,
        number: 1
    },
    {
        name: "Feburary",
        days: 28,
        number: 2
    },
    {
        name: "March",
        days: 31,
        number: 3
    },
    {
        name: "April",
        days: 30,
        number: 4
    },
    {
        name: "May",
        days: 31,
        number: 5
    },
    {
        name: "June",
        days: 30,
        number: 6
    },
    {
        name: "July",
        days: 31,
        number: 7
    },
    {
        name: "August",
        days: 31,
        number: 8
    },
    {
        name: "September",
        days: 30,
        number: 9
    },
    {
        name: "October",
        days: 31,
        number: 10
    },
    {
        name: "November",
        days: 30,
        number: 11
    },
    {
        name: "December",
        days: 31,
        number: 12
    }]

var today = new Date();

currentMonth = today.getMonth();

function formatDate (date) {
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    let formattedDate = dd + '-' + mm + '-' + yyyy;
    return formattedDate;
  }

function generateMonthTitle (date) {
    console.log("This is the date for the month title function:" + date)
    const day = date.getDay();
    console.log("This is the day of the week number: "+ day)
    const year = date.getFullYear();
    let month;
    
    
    let dateForMonth = new Date();
    //console.log("This is the date" + dateForMonth)
    //let month;

    if (day < 6) {
        const distanceToMonday = day + 1
        console.log("This is distance to Monday:" + distanceToMonday)
        dayForMonth = date.getDay() + distanceToMonday;
        console.log("This is day for Month : " + dayForMonth)
        dateForMonth.setDate(dayForMonth)
        console.log("This date renders the Title" + dateForMonth)
        month = date.toLocaleString('default', { month: 'long' });
        document.getElementById("month-header").innerHTML = `${month} ${year}`;
    } else {
        month = date.toLocaleString('default', {month: 'long'});
        document.getElementById("month-header").innerHTML = `${month} ${year}`;
    }
    document.getElementById("month-header").innerHTML = `${month} ${year}`;
    //console.log(month)
}

generateMonthTitle(today);

function generateWeek (date){
    let thisWeeksDates = [];
    for(let i = 0; i < 7; i++){
        let dateDate = date.getDate()
        let weekDate = date.setDate(dateDate+i)
        thisWeeksDates.push(weekDate)
    }
    return thisWeeksDates;
}


function nextMonth(monthChange){
    //Accesses and returns Monday's and Sunday's date of the current week as integer
    let currentDay = parseInt(document.getElementById("1").innerHTML);
    let lastDay = parseInt(document.getElementById("0").innerHTML)

    // Access the currently displayed Month Title + Year
    let header = document.getElementById("month-header").innerHTML;
    let currentMonthStr = header.substring(0, header.indexOf(' '));
    let currentYear = parseInt(header.substring(header.indexOf(' ') + 1));

    let currentMonth;
    
    //Uses String from header to search for the month in the array
    MONTHS.forEach((month) => {
        if(month.name == currentMonthStr){
                currentMonth = month.number-1;
        }
    })
    
    // Set new date using Monday's date
    var newDate = new Date(currentYear, currentMonth, currentDay);
    // Set date for given increment -> +7 days or -7 days
    newDate.setDate(newDate.getDate() + monthChange);  
    generateMonthTitle(newDate);

    let datesToRender = [];
    for(let i = 0; i < 7; i++){
        let weekDate = new Date (newDate);
        weekDate.setDate(newDate.getDate()+i)
        datesToRender.push(weekDate);
        
        if (i == 6){
            let idNumber = 0;
            let idNumberStr = idNumber.toString()
            let dateDisplay = weekDate.getDate();
            let dateHeader = document.getElementById(idNumberStr);
            dateHeader.innerHTML = `${dateDisplay}`
            
        } else {
            let idNumber = i+1;
            let idNumberStr = idNumber.toString();
            let dateDisplay = weekDate.getDate();
            let dateHeader = document.getElementById(idNumberStr);
            dateHeader.innerHTML = `${dateDisplay}`
        }
    }
    
    let standardBin = "-task-title-bin-calendar"
    let counter = 0;
   


    datesToRender.forEach((date) => {
        let calendarBin;
        counter ++;
        if (counter == 7){
            let calendarBinStr = "0"+standardBin;
            calendarBin = document.getElementById(calendarBinStr);
            calendarBin.innerHTML = ``
        } else if (counter > 7) {

        } else {
            let iStr = counter.toString();
            let calendarBinStr = iStr+standardBin;
            calendarBin = document.getElementById(calendarBinStr);
            calendarBin.innerHTML = ``;
        }

        let taskListforDate=[];
        
        ALL_TASKS.forEach ((task) => { 
            date.setHours(0,0,0,0);
            task.deadline = new Date(task.deadline);
            task.deadline.setHours(0,0,0,0);
            if(task.deadline >= date && task.deadline <= date){
                console.log("success!")
                taskListforDate.push(task);
            }
        })
        taskListforDate.forEach((task) => {
            let taskDetails;
            let taskPriority;
            console.log(task)
            if (task.priority == 1){
                taskPriority = "high-priority"
                taskDetails = `<h3 class="calendar-task-title">${task.taskTitle}</h3></div>`
            } else if (task.priority == 2){
                taskPriority = "mid-priority"
                taskDetails = `<h3 class="calendar-task-title">${task.taskTitle}</h3>`
            } else {
                taskPriority = "low-priority"
                taskDetails = `<h3 class="calendar-task-title">${task.taskTitle}</h3>`
            }

            if(taskDetails != ""){
                const taskChild = document.createElement("div");
                taskChild.classList.add(taskPriority);
                taskChild.innerHTML= taskDetails;
                calendarBin.appendChild(taskChild);
            }
        })
    

    })

}

function popUpTask (){
    let popUp = document.getElementById("pop-up")
    if(popUp.style.display="none"){
        popUp.style.display="block"
        popUp.innerHTML = `
            <div class="task-form">
                <form class="task-form-inner" id="insertTask" action="/create" method="POST">
                    <div class="add-task-header form-header">
                        <h2> Add Task </h2>
                        <button onlcick=closePopUp()><img src="icons/close.png"></button>
                    </div>
                    <div class="bin-col form-element">
                        <label class="form-label" for="task-title">Title of Task:</label>
                        <input id="task-title" class="input-field" type="text" name="taskTitle">
                    </div>
                    <div class="bin-50 deadline-priority form-element">
                        <div class="bin-col form-row">
                            <label class="form-label" for="deadline">Date to be completed:</label> 
                            <input id="deadline" class="input-field" type="date" name="deadline">
                        </div>
                        <div class="bin-col form-row">
                            <label  class="form-label" for="priority">Priority:</label>
                            <select name="priority" class="input-field"  id="priority" form-id="insertTask">
                                <option value="1" class="dropdown-option">High Priority</option>
                                <option value="2" class="dropdown-option">Get it Done</option>
                                <option value="3" class="dropdown-option">Low Priority</option>
                            </select>   
                        </div>
                    </div>
                    <div class="bin-col form-element">
                        <label class="form-label" for="task-desc">Task Description: </label>
                        <textarea id="task-desc" class="input-field task-desc" form="insertTask" name="taskDesc"></textarea>
                    </div>
                    
                    <div class="form-element button-div">
                        <button onclick=closePopUp()" class="pop-up-button-cancel">Cancel</button>
                        <input class="pop-up-button-add" type="submit">
                    </div> 
                </form>
            </div>
        `
    } 
}

function closePopUp() {
    let popUp = document.getElementById("pop-up");
    popUp.innerHTML = ``;
}

function archiveNextMonth(increment){
    let monthHeader = document.getElementById("month-header").innerHTML
    let currentMonthStr = monthHeader.substring(0, monthHeader.indexOf(' '));
    let currentYearStr = monthHeader.substring(monthHeader.indexOf(' ') + 1);
    let currentYear = parseInt(currentYearStr);
    let newMonth;
    let taskCompList = document.getElementById("comp-task-list");
    
    taskCompList.innerHTML = ``;
    MONTHS.forEach((month) => {
        if (currentMonthStr == month.name){
            if (increment == 1) {
                newMonth = MONTHS[month.number].name
            } else {
                newMonth = MONTHS[month.number -2].name
            }
            document.getElementById("month-header").innerHTML = `${newMonth} ${currentYear}`
            let monthNumber = month.number - 1 + increment;
            console.log(monthNumber)
            let newDate = new Date;
            newDate.setMonth(monthNumber);
            console.log(newDate)
            let comp_task = []
            
            // Create Div and Append Child //
            ALL_TASKS.forEach((task) => {
                task.deadline = new Date(task.deadline);
                task.deadline.setHours(0,0,0,0);
                let taskDeadline = task.deadline.getMonth()
                let newDateMonth = newDate.getMonth();
                if (task.active == false && taskDeadline == newDateMonth) {
                    task.deadlineStr = formatDate(task.deadline)
                    task.dateMadeStr = formatDate(new Date(task.dateMade));
                    task.dateCompStr = formatDate(new Date (task.dateComp))
                    let taskCompListDiv = document.createElement("div");
                    let classes = ["bin-50", "task", "dashboard-card"]
                    taskCompListDiv.classList.add(...classes);

                    taskCompListDiv.innerHTML = `
                                                <div class="bin-50 task-icon-date-tasks">
                                                    <img class="task-icon" src="icons/Vector.svg" alt="">
                                                    <div class="task-date">
                                                        <p>Task From: </p>
                                                        <p>${task.dateMadeStr}</p>
                                                    </div>
                                                </div>
                                                <div class="task-title">
                                                    <p>${task.taskTitle}</p>
                                                </div>
                                                <div class="task-date archive-task-date">
                                                    <p>Task Deadline:</p>
                                                    <p>${task.deadlineStr}</p>
                                                </div>
                                                <div class="task-date archive-task-date">
                                                    <p>Completed: </p>
                                                    <p>${task.dateCompStr}</p>
                                                </div>
                                                <div class="task-complete-archive">
                                                    <button class="task-button"><a class="task-button-complete" href="/delete/${task._id}">Delete</a></button>
                                                </div>
                    `
                    
                    
                    taskCompList.appendChild(taskCompListDiv)
                }

            })

        }
    })


}






