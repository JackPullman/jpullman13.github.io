let showOverdue = false;
let hideIncomplete = false;

let tasks = [
  {
    id: 0,
    title: "Doing Laundary",
    dueDate: new Date (2020,1,28),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,23),
    deleted:false,
    note:"I need to get quarters first at Kroger."
  },
  {
    id: 1,
    title: "CS3744 Assignment 3",
    dueDate: new Date (2020,2,17),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,24),
    deleted:false,
    note:"I better start early cuz it looks pretty complicated.\r\nLooks like I have to read w3schools.com a lot."
  },
  {
    id: 2,
    title: "Getting AAA batteries",
    dueDate: null,
    completed : true,
    completeDate : new Date (2020,2,1),
    createdDate: new Date (2020,1,26),
    deleted:false,
    note:"for my remote control."
  },
  {
    id: 3,
    title: "Booking a flight ticket ACM CHI conference",
    dueDate: new Date (2020,3,15),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,2,26),
    deleted:false,
    note:"I would have to book a flight ticket to ACM CHI conference.\r\nKeep an eye on the cancellation policy. the conference may be cancelled due to the cornoa virus outbreak. :( Although flight tickets are getting cheaper."
  }
];

function getFormattedDate(date) {
  if (!(date instanceof Date)) {
    return "";
  }
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  
  return `${month}/${day}/${year}`;
}

function taskToRow(task) {
  let taskClass = "";
  let checked = "";
  switch(true) {
    case !task.completed && task.dueDate && (task.dueDate < Date.now()):
      taskClass = "danger";
      break;
    case task.completed:
      taskClass = "success";
      checked = "checked";
      break;
    default:
      taskClass = "";
  }
  let taskTitle = task.title.length <= 30 ? task.title : `${task.title.substr(0,30)}...`;
  taskTitle = task.completed ? `<del>${taskTitle}</del>` : taskTitle;
  return `
  <tr id="${task.id}" class="${taskClass}">
    <td class="text-center"><input type="checkbox" class="form-check-input" value="${task.id}" ${checked}></td>
    <td class="text-center">${taskTitle}</td>
    <td class="text-center">
      <span class="text-right">
        <button class="btn btn-xs btn-warning" data-toggle="collapse" data-target="#note-${task.id}">
          <span class="glyphicon glyphicon-triangle-bottom"></span>Note
        </button>
      </span>
    </td>
    <td class="text-center">${getFormattedDate(task.dueDate)}</td> 
    <td class="text-center">${getFormattedDate(task.completeDate)}</td>
    <td class="text-center">
      <button type="button" class="btn btn-danger btn-xs deletetask" alt="Delete the task" value="${task.id}">
        <span class="glyphicon glyphicon-trash"></span>
      </button>
      <a target="_blank" href="mailto:?body=${task.note}&amp;subject=${task.title}">
        <button type="button" class="btn btn-danger btn-xs emailtask" alt="Send an email" value="${task.id}">
          <span class="glyphicon glyphicon-envelope"></span>
        </button>
      </a>
    </td>
  </tr>
  <tr id="note-${task.id}" class="collapse">
    <td></td>
    <td colspan="5">
      <div class="well">
          <h3>${task.title}</h3>
          <div>${task.note}</div>
      </div>
    </td>
  </tr>
  `
}

function renderAllTasks() {
  let renderedTasks = "";
  let filteredTasks = tasks.filter(task => !task.deleted);
  switch(true) {
    case showOverdue:
      filteredTasks = filteredTasks.filter(task => ((task.dueDate < Date.now()) && !task.completed));
      break;
    case hideIncomplete:
      filteredTasks = filteredTasks.filter(task => !task.completed);
      break;
  }
  filteredTasks.forEach(task => {
    renderedTasks += taskToRow(task);
  });
  renderedTasks.replace(/<br\s?\/?>/g,"\n"); // https://stackoverflow.com/questions/5999792/new-line-in-textarea-to-be-converted-to-br
  $("#tasks").find("tbody").html(renderedTasks);
  let completeCheck = filteredTasks.filter(checkTask => (checkTask.completed && !checkTask.deleted));
  $("#deleteCompletedTasks").attr("disabled", completeCheck.length == 0);
}

// Main Code
$(document).ready(function() {
  renderAllTasks();

  $(document).on("click", ".deletetask", function() {
    const toDelete = $(this).attr("value");
    if (confirm("Are you sure?")) {
      tasks.find(task => task.id == toDelete).deleted = true;
      renderAllTasks();
    }
  });

  $(document).on("click", ".form-check-input", function() {
    const toComplete = $(this).attr("value");
    const completedTask = tasks.find(task => task.id == toComplete);
    completedTask.completed = !completedTask.completed;
    completedTask.completeDate = completedTask.completed ? new Date() : null;
    renderAllTasks();
  });

  $("#overdue a").on("click", function() {
    $("#overdue").toggleClass("active");
    showOverdue = !showOverdue;
    renderAllTasks();
  });

  $("#hidecompleted a").on("click", function() {
    $("#hidecompleted").toggleClass("active");
    hideIncomplete = !hideIncomplete;
    renderAllTasks();
  });

  $(document).on("click", "#deleteCompletedTasks", function() {
    let completedTasks = tasks.filter(task => task.completed && !task.deleted);
    let confirmMsg = completedTasks.length < 2 ? "task" : "tasks";
    if (confirm(`Do you want to delete ${completedTasks.length} ${confirmMsg}?`)) {
      completedTasks.forEach(completedTask => {
        tasks.find(task => task.id == completedTask.id).deleted = true;
      });
      renderAllTasks();
    }
  });

  $(".addtask").on("click", function() {
    $("#myModal").modal();
  });

  $("#newtask").on("submit", function(event) {
    event.preventDefault();
    
    const newTaskTitle = $("#task-title").val();
    if (!newTaskTitle) {
      alert("Task title is required");
      return;
    }
    const dateValue = $("#due-date").val();
    const newTaskDate = dateValue ? new Date(dateValue) : null;
    if (dateValue && isNaN(Date.parse(dateValue))) {
      alert("Check your date format.");
      return;
    }
    tasks.push({
      id: tasks[tasks.length - 1].id + 1,
      title: newTaskTitle,
      dueDate: newTaskDate,
      completed: false,
      completeDate: null,
      createdDate: new Date(),
      deleted: false,
      note: $("#task-note").val()
    });
    $("#newtask").trigger("reset");
    $("#myModal").modal("hide");
    console.log(tasks);
    renderAllTasks();
  });

  $('#myModal').on('hidden.bs.modal', function() {
    $("#newtask").trigger("reset");
  });
});