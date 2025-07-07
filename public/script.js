// Global Variables
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

const CALENDAR_DAYS = document.getElementById("calendar-dates")
const topNavImg = document.getElementById("top-nav-img");
const topNavA = document.getElementById("top-nav-a");
let imgUrl = window.location.href;
imgUrl = imgUrl.substring(21, imgUrl.length);
let activeIcon;

switch(imgUrl) {
    
    case "/":
        topNavImg.src="images/solar_home-2-broken.svg"
        topNavA.innerHTML="Home";
        activeIcon = document.getElementById("home-icon");
        activeIcon.classList.remove("side-nav-button-inactive");
        activeIcon.classList.add("side-nav-button-active")
        break;
    case "/calendar":
        topNavImg.src="images/solar_calendar-broken.svg"
        topNavA.innerHTML="Calendar";
        activeIcon = document.getElementById("calendar-icon");
        activeIcon.classList.remove("side-nav-button-inactive");
        activeIcon.classList.add("side-nav-button-active")
        break;
    case "/archive":
        topNavImg.src="images/solar_archive-complete.svg"
        topNavA.innerHTML="Archive";
        activeIcon = document.getElementById("archive-icon");
        activeIcon.classList.remove("side-nav-button-inactive");
        activeIcon.classList.add("side-nav-button-active")
        break;
    case "/tasks":
        topNavImg.src="images/solar_tasks-todo.svg"
        topNavA.innerHTML="Tasks";
        activeIcon = document.getElementById("tasks-icon");
        activeIcon.classList.remove("side-nav-button-inactive");
        activeIcon.classList.add("side-nav-button-active")
        break;
}


function generateCalendar (){
    let today = new Date();
    let monthNum = today.getMonth()+1;
    let year = today.getFullYear();
    let firstDayofMonth = new Date(`${year}-${monthNum}-01`);
    let dayOfWeek = firstDayofMonth.getDay()
    isLeapYear(year);

    MONTHS.forEach((month) => {
        if (month.number == monthNum){
            generateEmptyDays(dayOfWeek)
            generateCalendarDates(month)
            }
       });
}

function generateEmptyDays (dayOfWeek) {
    if (dayOfWeek == 0) {
        for(let i=0; i < 6; i++) {
            let blankDate = document.createElement("li");
            blankDate.classList.add("blank-date");
            blankDate.innerHTML= ``
            CALENDAR_DAYS.appendChild(blankDate);   
        }
    } else {
        for(let i=0; i< dayOfWeek-1; i++){
            let blankDate = document.createElement("li");
            blankDate.classList.add("blank-date");
            blankDate.innerHTML= ``
            CALENDAR_DAYS.appendChild(blankDate) 
        }
    }
}

function generateCalendarDates(month) {
    let monthName = document.getElementById("calendar-month");
    monthName.innerHTML = month.name;
    for (let i=1; i < month.days+1; i++){
        let activeDate = document.createElement("li");
        activeDate.innerHTML = i;
        CALENDAR_DAYS.appendChild(activeDate);
    }

}

function isLeapYear (year){
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        MONTHS[1].days = 29;
    } else {
        MONTHS[1].days = 28;
    }
}



function getStats (activeTasks, compTasks) {
    let openTasks = activeTasks.length;
    let totalCompTasks = compTasks.length;
    let totalTasks = openTasks+totalCompTasks;

    let headerComp = document.getElementById("header-comp-tasks");
    let headerOpen = document.getElementById("header-open-tasks");
    headerComp.innerHTML = `Tasks completed: ${totalCompTasks}`
    headerOpen.innerHTML = `Tasks open: ${openTasks}`

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

generateCalendar();









