// Criando o nosso banco de dados
const storage = localStorage.getItem("tasks") || "[]";

let dados = JSON.parse(storage);

const inputAdd = document.querySelector(".input-add");
const btnAdd = document.querySelector(".btn-add");
const tasks = document.querySelector(".tasks");


// Função que add tarefa na lista
function addTaskToList() {
    // Pegando o valor digitado
    const tarefa = inputAdd.value;

    // Criando o objeto que será adicionado
    const item = {
        id: crypto.randomUUID(),
        name: tarefa,
        checked: false
    }
    // Adicionando a tarefa
    dados.push(item);
    // Adicionando no localstorage
    localStorage.setItem("tasks", JSON.stringify(dados));
    alert("Tarefa adicionado com sucesso!");
    inputAdd.value = ""
    inputAdd.focus();
    populateTasks();
}

function populateTasks() {
    let tasksItems = "";
    //percorrendo todas as tasks
    dados.forEach(task => {
        tasksItems += `
    <li>
        <label for="${task.id}">
            <input onChange="changeTask('${task.id}')" type="checkbox" id="${task.id}" ${task.checked ? "checked" : ""}>
            <span>${task.name}</span>
        </label>
        <i class="bx bx-trash" onclick="deleteTask('${task.id}')"></i>
    </li>
    `
    })
    tasks.innerHTML = tasksItems
}

function deleteTask(id) {
    // atualizando a lista com todos os itens menos o item com o id passado
    const newList = dados.filter(item => item.id !== id);
    dados = newList;
    populateTasks();
    localStorage.setItem("tasks", JSON.stringify (dados));
}

function changeTask (id){
    const checkbox = document.getElementById(id);
    let newList = dados.map(item => {
        if(item.id == id){
        item.checked = checkbox.checked;
    }
    return item;
    })
    dados= newList
}

inputAdd.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        addTaskToList(

        )
    }

})

btnAdd.addEventListener("click", addTaskToList)
populateTasks() 