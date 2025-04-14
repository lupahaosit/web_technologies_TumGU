import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
var token = localStorage.getItem('access-token')

var allToDo = null
var lastId = null

const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    
    console.log(token)
    async function getBasket() {

          const response = await fetch('http://127.0.0.1:8000/api/todo', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            credentials: 'include' 
          });

            const todoData = await response.json();
            const todoContainer = document.getElementById("todoList");
            allToDo = todoData.data
            todoData.data.forEach(item => {
                console.log(item)
                const todoElement = createToDoItemHtml(item.description, item['completed'], item.id);
                todoContainer.appendChild(todoElement);
            });
            lastId = allToDo[allToDo.length-1].id

      }

      getBasket();

    // create POST /todo { description: string }
    // get get /todo/1 - 1 это id
    // getAll get /todo
    // update put /todo/1 - 1 это id { description: string }
    // delete delete /todo/1 - 1 это id
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}

async function addTodo(todoText) {
  
      const response = await fetch('http://127.0.0.1:8000/api/todo', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        credentials: 'include', 
        body: JSON.stringify({description : todoText}), 
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Задача добавлена:', result);
      }
      const todoElement = createToDoItemHtml(todoText, false, lastId + 1)
      const todoContainer = document.getElementById("todoList");
      todoContainer.appendChild(todoElement);
  }


  async function getTodo(todoId) {
  
    const response = await fetch(`http://127.0.0.1:8000/api/todo/${todoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      credentials: 'include',  
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result)
      console.log(result.data)
      return result.data
    }
    
}
async function updateToDo(todoId, status, target) {
    // Отключаем чекбокс, чтобы предотвратить дальнейшие клики
    target.disabled = true;

    const response = await fetch(`http://127.0.0.1:8000/api/todo/${todoId}`, {
        method: 'put',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include',  
        body: JSON.stringify({
            completed: status // Только это поле!
        })
    });

    if (response.ok) {
        console.log('ответ получен');
        var result = await response.json()
        target.checked = result.data['completed']; // Обновляем состояние чекбокса
        console.log(`checkbox обновлен ${todoId}`);
    } else {
        // Если произошла ошибка, можно вернуть чекбокс в исходное состояние
        target.checked = !status; // Возвращаем предыдущее состояние
    }

    // Включаем чекбокс обратно
    target.disabled = false;
}

function createToDoItemHtml(todoText, completedStatus, id) {
    var element = document.createElement("div");
    element.className = "d-flex flex-row w-100 align-items-baseline";
    element.innerHTML = `
        <p class="w-75">${todoText}</p>
        <input class="d-flex flex-row todo-checkbox" type="checkbox" ${completedStatus == true ? 'checked' : ''} name="checkCompleted">
        <p class="ms-2">Completed</p>
        <button class="ms-3 remove-btn" id = "${id}">Remove</button>
    `;

    const checkbox = element.querySelector('.todo-checkbox')
    checkbox.addEventListener('click', (event) => {
        const isChecked = event.target.checked
        updateToDo(id, isChecked, event.target)
    })

    const removeBtn = element.querySelector('.remove-btn');
    removeBtn.addEventListener('click', () => toDoRemove(id));


    return element;
}

function createNewToDO(){
    var text = document.getElementById('toDoInput')

    addTodo(text.value)
}

async function toDoRemove(todoId) {
    const response = await fetch (`http://127.0.0.1:8000/api/todo/${todoId}`,{
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',  
    })

    if(response.ok){
        document.getElementById(todoId).parentElement.remove()
    }

}



document.onreadystatechange = function() {
    if (document.readyState == "complete") {
        document.getElementById('toDoInputConfirm').addEventListener('click', createNewToDO);
        
    }
};