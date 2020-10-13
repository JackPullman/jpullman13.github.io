
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

function taskToRow(task) {
  let taskClass = "danger"; // TODO: make this dynamic
  return `
  <tr id="${task.id}" class="${taskClass}">
    <td class="text-center"><input type="checkbox" class="form-check-input" value="0"></td>
    <td class="text-center">${task.title}</td>
    <td class="text-center">
      <span class="text-right">
        <button class="btn btn-xs btn-warning" data-toggle="collapse" data-target="#note-${task.id}">
          <span class="glyphicon glyphicon-triangle-bottom"></span>Note
        </button>
      </span>
    </td>
    <td class="text-center">${task.dueDate}</td> 
    <td class="text-center">${task.completeDate}</td>
    <td class="text-center">
      <button type="button" class="btn btn-danger btn-xs deletetask" alt="Delete the task" value="0">
        <span class="glyphicon glyphicon-trash"></span>
      </button>
      <a target="_blank" href="mailto:?body=${task.note}&amp;subject=${task.title}">
        <button type="button" class="btn btn-danger btn-xs emailtask" alt="Send an email" value="0">
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

// Main Code
$(document).ready(function() {
  $("#tasks").find("tbody").html(taskToRow(tasks[0]));
  // loop through tasks, convert, and append them
});