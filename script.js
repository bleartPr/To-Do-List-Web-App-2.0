
const tasks_data = {
  
}






// add new task
const newtaskbutton = document.getElementById("new-task-button");
const popup = document.querySelector(".hide-popup")
newtaskbutton.addEventListener("click", function() {
  popup.classList.remove("hide-popup");
  popup.classList.add("show-popup");
})


function reverseDateString(dateString) {
  const dateParts = dateString.split('-');
  
  const reversedParts = dateParts.reverse();

  const reversedString = reversedParts.join('-');

  return reversedString;
}

// close popup
const close_popup_button = document.getElementById("close-popup-button");
close_popup_button.addEventListener("click", function() {
  popup.classList.remove("show-popup");
  popup.classList.add("hide-popup");
  let nameinput = document.querySelector(".nameInput");
  let dateinput = document.querySelector(".dateInput");
  let timeinput = document.querySelector(".timeInput");
  let priorityinput = document.querySelector(".priorityInput");
  let fill_text = document.querySelector(".fill-input-text")
  nameinput.value = "";
  dateinput.value = "";
  timeinput.value = "";
  priorityinput.value = 1;
  if (fill_text !== null) {
    fill_text.remove();
  }
})



// "create" button logic
var counter = 0;
const create_popup_button = document.getElementById("create-popup-button");
const task_div = document.querySelector(".task-container");
create_popup_button.addEventListener("click", function() {

  counter++;

  let nameinput = document.querySelector(".nameInput");
  if (nameinput.value === "") {
    if (popup.querySelector("p")) {
      return;
    }
    let fill_para = document.createElement("p");
    fill_para.append("please type the task name");
    fill_para.classList.add("fill-input-text")
    popup.append(fill_para)
    return;
  }
  let dateinput = document.querySelector(".dateInput");
  let timeinput = document.querySelector(".timeInput");
  let priorityinput = document.querySelector(".priorityInput");

  let new_task_container = document.createElement("div");
  new_task_container.classList.add("new-task-container");
  new_task_container.id = `task-${counter}`
  new_task_container.setAttribute("onclick", `open_settings_popup("task-${counter}")`)

  let task_name_container = document.createElement("p");
  task_name_container.append(nameinput.value)
  task_name_container.classList.add("task-name-container");

  var info_count = 1;
  let task_info_container = document.createElement("div");
  let task_info1 = document.createElement("p");
  task_info1.className = "task-info"
  let icon1 = document.createElement("i");
  icon1.className = "fa-regular fa-calendar fa-2x"
  let text1 = document.createElement("p");
  text1.className = `text-info${info_count}`
  if (dateinput.value === "") {
    text1.append("Not Set")
  } else {
    text1.append(reverseDateString(dateinput.value));
  }
  task_info1.append(icon1)
  task_info1.append(text1)
  
  info_count++
  let task_info2 = document.createElement("p");
  task_info2.className = "task-info"
  let icon2 = document.createElement("i");
  icon2.className = "fa-regular fa-clock fa-2x"
  let text2 = document.createElement("p");
  text2.className = `text-info${info_count}`
  if (timeinput.value === "") {
    text2.append("Not Set")
  } else {
    text2.append(timeinput.value);
  }
  task_info2.append(icon2)
  task_info2.append(text2)
  
  info_count++
  let task_info3 = document.createElement("p");
  task_info3.className = "task-info"
  let icon3 = document.createElement("i");
  icon3.className = "fa-solid fa-circle-exclamation fa-2x"
  let text3 = document.createElement("p");
  text3.className = `text-info${info_count}`
  if (priorityinput.value === "") {
    text3.append("Not Set")
  } else {
    text3.append(priorityinput.value);
  }
  task_info3.append(icon3)
  task_info3.append(text3)
  

  task_info_container.append(task_info1)
  task_info_container.append(task_info2)
  task_info_container.append(task_info3)
  task_info_container.classList.add("task-info-container");

  let new_checkbox = document.createElement("input");
  new_checkbox.type = "checkbox";
  new_checkbox.classList.add("new-checkbox");
  new_checkbox.setAttribute("onclick", "removeParentDiv(this)")

  new_task_container.append(task_name_container);
  new_task_container.append(task_info_container);
  new_task_container.append(new_checkbox);

  task_div.append(new_task_container)



  popup.classList.remove("show-popup");
  popup.classList.add("hide-popup");

  nameinput.value = "";
  dateinput.value = "";
  timeinput.value = "";
  priorityinput.value = 1;
});





// remove task when completed
function removeParentDiv(checkbox) {
  const parentDiv = checkbox.parentNode;

  parentDiv.classList.add("fadeOut");

  parentDiv.addEventListener('animationend', function() {
    parentDiv.remove();
  });

  if (document.querySelector('.show-popup-settings')) {
    close_settings()
  }
}






// Function to open task settings popup and populate it with task details
function open_settings_popup(div_id) {

  const parent_div = document.getElementById(div_id);
  const checkbox = parent_div.querySelector(".new-checkbox");

  last_task_opened = parent_div

  if (checkbox.checked) {
    return;
  }

  const popup = document.querySelector('.hide-popup-settings');
  popup.classList.remove('hide-popup-settings');
  popup.classList.add('show-popup-settings');

  const name_info = parent_div.querySelector(".task-name-container");
  const date_info = parent_div.querySelector(".text-info1");
  const time_info = parent_div.querySelector(".text-info2");
  const priority_info = parent_div.querySelector(".text-info3");

  const settings_tab_name = document.querySelector(".nameInput-settings");
  const settings_tab_date = document.querySelector(".dateInput-settings");
  const settings_tab_time = document.querySelector(".timeInput-settings");
  const settings_tab_priority = document.querySelector(".priorityInput-settings");

  // reverse the date format
  date_as_string = date_info.innerHTML
  const parts = date_as_string.split('-');
  const formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
  
  settings_tab_name.value = name_info.innerHTML
  settings_tab_date.value = formattedDate
  settings_tab_time.value = time_info.innerHTML
  settings_tab_priority.value = priority_info.innerHTML
}

// close the settings popup
function close_settings() {
  const popup = document.querySelector('.show-popup-settings');
  popup.classList.remove('show-popup-settings');
  popup.classList.add('hide-popup-settings');
}

// update button logic
function update_task() {
  update_div = last_task_opened

  const name_info = update_div.querySelector(".task-name-container");
  const date_info = update_div.querySelector(".text-info1");
  const time_info = update_div.querySelector(".text-info2");
  const priority_info = update_div.querySelector(".text-info3");

  const settings_tab_name = document.querySelector(".nameInput-settings");
  const settings_tab_date = document.querySelector(".dateInput-settings");
  const settings_tab_time = document.querySelector(".timeInput-settings");
  const settings_tab_priority = document.querySelector(".priorityInput-settings");
  
  name_info.innerHTML = settings_tab_name.value
  if (settings_tab_date.value === "") {
    date_info.innerHTML = "Not Set"
  } else {
    date_info.innerHTML = settings_tab_date.value

    // reverse the date format
    date_as_string = date_info.innerHTML
    const parts = date_as_string.split('-');
    const formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
    date_info.innerHTML = formattedDate
  }

  if (settings_tab_time.value === "") {
    time_info.innerHTML = "Not Set"
  } else {
    time_info.innerHTML = settings_tab_time.value
  }

  if (settings_tab_priority.value === "") {
    priority_info.innerHTML = "Not Set"
  } else {
    priority_info.innerHTML = settings_tab_priority.value
  }

  close_settings()
  
}