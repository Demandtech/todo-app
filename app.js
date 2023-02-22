const themeToggleBtn = document.querySelector('.toggle-theme')
const html = document.querySelector('html')
const toggleImg = document.querySelector('.toggle-img')
const todoList = document.querySelector('.todo-list')
const todoVal = document.querySelector('.todo-val')
const form = document.querySelector('.form')
const checker = document.querySelector('.checker')
const controller = document.querySelector('.todo-footer')

themeToggleBtn.addEventListener('click', () => {
  html.classList.toggle('dark-theme')

  if (html.classList.contains('dark-theme')) {
    toggleImg.src = './images/icon-sun.svg'
  } else {
    toggleImg.src = './images/icon-moon.svg'
  }
})

let todos = [
  {
    text: 'Complete Online Javascript Course',
    isCompleted: true,
    id: '1',
  },
  {
    text: 'Jog around the park 3x',
    isCompleted: false,
    id: '2',
  },
  {
    text: '10 minutes meditation',
    isCompleted: false,
    id: '3',
  },
  {
    text: 'Read for one hour',
    isCompleted: true,
    id: '4',
  },
  {
    text: 'Pickup groceries',
    isCompleted: false,
    id: '5',
  },
  {
    text: 'Complete todo app on frontend mentor',
    isCompleted: false,
    id: '6',
  },
]

const renderList = (arr) => {
  const todosToRender = arr || todos
  todoList.innerHTML = ''

  todosToRender.forEach((todo) => {
    todoList.innerHTML += `
     <li id="${todo.id}" class="${
      todo.isCompleted ? 'todo completed' : 'todo'
    }">
         <div class="checker" id="${todo.id}">
         <img src="./images/icon-check.svg"> 
         </div>
         <div class="todo-text">${todo.text}</div>
         <button class="close-btn">
           <img src="./images/icon-cross.svg" alt="close-icon">
         </button>
     </li>
 `
  })
}

renderList()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (todoVal.value) {
    todos.push({
      text: todoVal.value,
      isCompleted: false,
      id: new Date().getTime().toString().slice(-4, -1),
    })
  } else {
    return
  }
  todoVal.value = ' '
  renderList()
})

const AddCompleted = () => {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.checker')
    if (target) {
      todos.map((todo) => {
        if (todo.id === target.id) {
          if (todo.isCompleted === true) {
            todo.isCompleted = false
          } else {
            todo.isCompleted = true
          }
        }
      })
      renderList()
    }
  })
}

AddCompleted()

controller.addEventListener('click', (e) => {
  const allBtn = e.target.closest('.all-btn')
  const activeBtn = e.target.closest('.active-btn')
  const completedBtn = e.target.closest('.completed-btn')
  const clearCompleted = e.target.closest('.clear-completed-btn')

  
  if (activeBtn) {
    removeEventListener('click', AddCompleted)
   const activeTodos = todos.filter((todo) => !todo.isCompleted)
    renderList(activeTodos)
  } else if (completedBtn) {
    removeEventListener('click', AddCompleted)
    const completedTodos = todos.filter((todo) => todo.isCompleted)
    renderList(completedTodos)
  } else if (allBtn){ renderList()}
  else if (clearCompleted){
    todos = todos.filter(todo=> !todo.isCompleted)
    renderList(todos)
  }
})
