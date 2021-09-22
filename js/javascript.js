const inputBox = document.querySelector("#task");
const addBtn = document.querySelector(".addBtn");
const todoList = document.querySelector("#list");
const successToast = document.querySelector("#success");
const errorToast = document.querySelector("#error");
const listGroup = document.querySelector(".list-group");

showTasks();

addBtn.addEventListener("click", function () {
  if (!inputBox.value || inputBox.value.trim().length == 0) {
    errorToast.classList.replace("hide", "show");
  }

  if (inputBox.value.length > 1) {
    successToast.classList.replace("hide", "show");

    let userEnteredValue = inputBox.value;
    let getLocalStorageData = localStorage.getItem("New Todo");

    if (getLocalStorageData == null) {
      listArray = [];
    } else {
      listArray = JSON.parse(getLocalStorageData);
    }

    listArray.push(userEnteredValue);
    localStorage.setItem("New Todo", JSON.stringify(listArray));

    showTasks();
  }
});

function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");

  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }

  let newLiTag = "";

  listArray.forEach((element, index) => {
    newLiTag += `<li class="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
      <div class="d-flex">
        <input class="form-check-input me-2" type="checkbox" name="checkbox" value="" aria-label="..." />
        <p class="mx-2 my-auto">${element}</p>
      </div>
      <button type="button" class="btn btn-outline-danger justify-content-md-end-2" onclick="deleteTask(${index})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          ></path>
        </svg>
        Sil
      </button>
    </li>`;
  });

  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks();
}

listGroup.addEventListener("click", function (e) {
  const item = e.target.querySelector(".d-flex");
  const text = item.querySelectorAll("p")[0];
  const checkbox = e.target.querySelector("input");
  console.log(item);
  console.log(text);

  if (text.classList.contains("checked")) {
    checkbox.checked = false;
    text.classList.remove("checked");
  } else {
    checkbox.checked = true;
    text.classList.add("checked");
  }
});