// elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; // untuk get value yang sudah ada
    if (userEnteredValue.trim() != 0) { // mengecek value apakah sudah di input
        addBtn.classList.add("active"); // aktifkan button
    } else {
        addBtn.classList.remove("active"); // non aktif button
    }
}
showTask();

addBtn.onclick = () => { // ketika button + di klik
    let userEnteredValue = inputBox.value; // mengambil value yang ada didalam value box
    let getLocalStorageData = localStorage.getItem("New Todo"); // get local
    if (getLocalStorageData == null) { // mengecek kondisi data kosong 
        listArray = []; // membuat array kosong untuk value baru
    } else {
        listArray = JSON.parse(getLocalStorageData); // mengubah json string ke json Object
    }

    listArray.push(userEnteredValue); // menambahkan data value ke array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); // mengubaj json object ke json array
    showTask();
    addBtn.classList.remove("active") // non aktifkan button 
}

function showTask() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }

    const pendingTaskNumb = document.querySelector(".pendingTask");
    pendingTaskNumb.textContent = listArray.length; // memberikan jumlah panjang array di pending Task
    if (listArray.length > 0) { // kondisi jika panjang array lebih dari 0
        deleteAllBtn.classList.add("active")
    } else {
        deleteAllBtn.classList.remove("active")
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})">
            <i class="fas fa-trash"></i></span></li>`; //mengambil data yang ada pada array untuk di ulang di dalam tag <ul></ul>
    });
    todoList.innerHTML = newLiTag; // menambahkan tag <li> ke dalam tag <ul>
    inputBox.value = "";
}

function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTask();
}

deleteAllBtn.onclick = () => {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
        listArray = [];
    }
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTask();
}
