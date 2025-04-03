const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText === "") {
    alert("You must write something!!!");
    return;
  }

  // ✅ Check if the task already exists
  const tasks = Array.from(document.querySelectorAll("#list-container li"));
  const isDuplicate = tasks.some(
    (task) => task.textContent.replace("×", "").trim() === taskText
  );

  if (isDuplicate) {
    alert("Task already exists!");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = taskText;
  listContainer.appendChild(li);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7"; // '×' close button
  li.appendChild(span);

  inputBox.value = "";
  saveData();
}

// ✅ Listen for "Enter" key press
inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();
