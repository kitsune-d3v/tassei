export const MONTHS = [
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


export function formatDate (date) {
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    let formattedDate = dd + '-' + mm + '-' + yyyy;
    return formattedDate;
  }  

export function popUpTask (){
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

export function isLeapYear (year){
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        MONTHS[1].days = 29;
    } else {
        MONTHS[1].days = 28;
    }
}

export function closePopUp() {
    let popUp = document.getElementById("pop-up");
    popUp.innerHTML = ``;
}
  //module.exports = {
    //formatDate: formatDate,
    //isLeapYear: isLeapYear,
    //popUpTask: popUpTask,
    //closePopUp: closePopUp
  //}