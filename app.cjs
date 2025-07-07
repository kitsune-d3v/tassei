const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const app = express();

const {Schema, model} = mongoose;
const imgUrls = ["images/solar_home-2-broken.svg", "images/solar_calendar-broken.svg", "images/solar_archive-check-broken.svg", "images/solar_archive-check-broken.svg"]


mongoose.connect("mongodb+srv://kitsuned3v:jyWA0GlT8Yc1ngi4@cluster0.ztca7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({extended:false}));



const taskSchema = mongoose.Schema ({
  task: String,
  taskTitle: String,
  priority: {
    type: Number,
    default: 3
  },
  dateMade: Date,
  dateComp: Date,
  deadline: Date,
  completed: {
    type: Boolean,
    deafult: false
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Task = mongoose.model("Task", taskSchema);

function formatDate (date) {
  let yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  let formattedDate = dd + '-' + mm + '-' + yyyy;
  return formattedDate;
}
 
app.get("/", async (req, res) => {
  let imgUrl = imgUrls[0];
  (async () => {
    await Task
      .find({})
      .then (function(results) {
          let records = results.map(r => r);
          let active_tasks = [];
          let comp_tasks = [];
          records.forEach(function(record){
            if (record.active == true){
              active_tasks.push(record)
            } else {
              comp_tasks.push(record)
            }
            comp_tasks.sort((a, b) => {
              a.dateComp - b.dateComp
            })
            active_tasks.sort((a, b) => {
              a.deadline - b.dateComp
            })
          })
          let today = new Date();
          let todaysTasks =[];
          let todaysComp = [];
          active_tasks.forEach(task => {
            let dateString = formatDate(task.dateMade);
            task.dateMadeStr = dateString;
            if (task.deadline.setHours(0,0,0,0) == today.setHours(0,0,0,0)){
              todaysTasks.push(task);
            }
          });
          comp_tasks.forEach(task => {
            if (task.dateComp.setHours(0,0,0,0) == today.setHours(0,0,0,0))
              todaysComp.push(task);
          })
          res.render("home", {ACTIVE_TASKS: active_tasks, COMP_TASKS: comp_tasks, TODAYS_TASKS: todaysTasks, TODAYS_COMP: todaysComp, TODAY:today, imgUrls: imgUrl})
      })})()
  
  })

  app.get("/tasks", async(req, res) => {
    let imgUrl = imgUrls[3];
    (async () => {
      await Task
        .find({})
        .then (function(results) {
            let records = results.map(r => r);
            let active_tasks = [];
            let comp_tasks = [];
            records.forEach(function(record){
              if (record.active == true){
                active_tasks.push(record)
              } else {
                comp_tasks.push(record)
              }
              comp_tasks.sort((a, b) => {
                a.dateComp - b.dateComp
              })
              active_tasks.sort((a, b) => {
                a.deadline - b.dateComp
              })
            })
            let today = new Date();
            let todaysTasks =[];
            let todaysComp = [];
            active_tasks.forEach(task => {
              let dateString = formatDate(task.dateMade);
              task.dateMadeStr = dateString;
              if (task.deadline.setHours(0,0,0,0) == today.setHours(0,0,0,0)){
                todaysTasks.push(task);
              }
            });
            comp_tasks.forEach(task => {
              if (task.dateComp.setHours(0,0,0,0) == today.setHours(0,0,0,0))
                todaysComp.push(task);
            })
            res.render("tasks", {ACTIVE_TASKS: active_tasks, COMP_TASKS: comp_tasks, TODAYS_TASKS: todaysTasks, TODAYS_COMP: todaysComp, TODAY:today, imgUrl:imgUrl})
        })})()
  })

  app.get("/archive", async(req,res) => {
    let imgUrl = imgUrls[3];
    (async () => {
      await Task
        .find({})
        .then (function(results) {
            let records = results.map(r => r);
            let comp_tasks = [];
            records.forEach(function(record){
               if(!record.active) {
                comp_tasks.push(record)
              }
              comp_tasks.sort((a, b) => {
                a.dateComp - b.dateComp
              })
            })
            comp_tasks.forEach((task) => {
              task.deadlineStr = formatDate(task.deadline);
              task.dateCompStr = formatDate(task.dateComp);
              task.dateMadeStr = formatDate(task.dateMade);
            })
            res.render("archive", {COMP_TASKS: comp_tasks, imgUrls: imgUrl})
        })})()
  })

  app.get("/calendar", async (req, res) => {
    let imgUrl = imgUrls[1];
    (async () => {
      await Task
        .find({})
        .then (function(results) {
            let records = results.map(r => r);
            let active_tasks = [];
            let comp_tasks = [];
            records.forEach(function(record){
              if (record.active == true){
                active_tasks.push(record)
              } else {
                comp_tasks.push(record)
              }
              comp_tasks.sort((a, b) => {
                a.dateComp - b.dateComp
              })
              active_tasks.sort((a, b) => {
                a.deadline - b.dateComp
              })
            })
            let today = new Date();
            res.render("calendar", {ACTIVE_TASKS: active_tasks, COMP_TASKS: comp_tasks, TODAY:today, ALL_TASKS: records, imgUrls: imgUrl})
        })})()
    
    })

.post("/create", (req, res) => {
  if(req.body.taskTitle == "" && req.body.taskDesc == ""){
    res.redirect(req.get("Referrer"));
  } else {
    let newToday = new Date();
    today = formatDate(newToday);
    let newDeadline = new Date;
    if (req.body.deadline){
      newDeadline = req.body.deadline
    } else {
      newDeadline.setDate(newDeadline.getDate() + 7);
      deadline = formatDate(newDeadline)
    }
    
    let priority = Number(req.body.priority);
    const task = Task.create({
      task: req.body.taskDesc,
      taskTitle: req.body.taskTitle,
      dateMade: newToday,
      deadline: newDeadline,
      priority: priority
    });
    res.redirect(req.get("Referrer"));
  }
  
})

.get("/edit/:_id", (req, res) => {
  (async () => {
    await Task
      .findOne({_id: req.params._id})
      .then (function(results) {
          let records = results.map(r => r);
          console.log(records);
          res.render("home", {TASKS: records})
      })})()
})

.get("/complete/:_id", (req, res) => {
  let taskComp = new Date();
  (async () => {
    await Task
      .findOneAndUpdate({_id: req.params._id}, {$set: {active: false, dateComp: taskComp}})
      .then (function() {
        res.redirect(req.get("Referrer"));
      })})()
})

.get("/return/:_id", (req, res) => {
  (async () => {
    await Task
      .findOneAndUpdate({_id: req.params._id}, {$set: {active: true, dateComp: undefined}})
      .then (function() {
          console.log("record updated!");
          res.redirect("/");
      })})()
})

.get("/delete/:_id", (req, res) => {
  (async () => {
    await Task
      .findByIdAndDelete({_id: req.params._id})
      .then (function() {
        res.redirect(req.get("Referrer"));
      })})()
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
  console.log(`Server running on Port ${PORT}`);
})