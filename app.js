"use strict"
const themeToggleBtn = document.querySelector('.toggle-theme')
const html = document.querySelector('html')
const toggleImg = document.querySelector('.toggle-img')
const todoList = document.querySelector('.todo-list')
const todoVal = document.querySelector('.todo-val')
const form = document.querySelector('.form')
const checker = document.querySelector('.checker')
const controller = document.querySelector('.controllers')
const itemLeftEl = document.querySelector('.items-left')
const controleBtn = document.querySelectorAll('.btn')
const active = document.querySelector('.active')
const clearBtn = document.querySelector('.clear-btn')
const list = document.getElementById('list')

//Placeholder
let todos = [
  {
    text: 'Complete online javaScript course',
    isCompleted: true,
    id: '111',
  },
  {
    text: 'Jog around the park 3x',
    isCompleted: false,
    id: '222',
  },
  {
    text: '10 minutes meditation',
    isCompleted: false,
    id: '333',
  },
  {
    text: 'Read for 1 hour',
    isCompleted: false,
    id: '444',
  },
  {
    text: 'Pick up groceries',
    isCompleted: false,
    id: '555',
  },
  {
    text: 'Complete Todo App on Frontend Mentor',
    isCompleted: false,
    id: '666',
  },
]


//Todos Storage
if(localStorage.getItem('myTodos')){
  todos = JSON.parse(localStorage.getItem('myTodos'))
}
//theme storage
const theme = localStorage.getItem('theme') || 'light-theme'
html.classList.add(theme)

//Theme Toggle and change toggle image 
themeToggleBtn.addEventListener('click', () => {
  html.classList.toggle('dark-theme')
  html.classList.toggle('light-theme')


  if (html.classList.contains('dark-theme')) {
    toggleImg.src = './images/icon-sun.svg'
  } else {
    toggleImg.src = './images/icon-moon.svg'
  }
   const selectedTheme = html.classList.contains('dark-theme')
     ? 'dark-theme'
     : 'light-theme'
   localStorage.setItem('theme', selectedTheme)
})

let dataIndex =  0;

//render function
const renderList = (arr) => {
  const todosToRender = arr || todos
  todoList.innerHTML = ''

  todosToRender.forEach((todo) => {
    todoList.innerHTML += `
     <li id="${todo.id}" class="${
      todo.isCompleted ? 'todo completed draggable' : 'todo draggable'
    }" draggable="true" >
         <button class="checker" id="${todo.id}">
         <img src="./images/icon-check.svg"> 
         </button>
         <div class="todo-text">${todo.text}</div>
         <button class="close-btn">
           <img src="./images/icon-cross.svg" alt="close-icon">
         </button>
     </li>
 `
  })
}

renderList()

//function to get todos from local storage
const getTodos = ()=> {
  localStorage.setItem('myTodos', JSON.stringify(todos))
}



//Onsubmit to add items to array and render
form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (todoVal.value) {
    todos.unshift({
      text: todoVal.value,
      isCompleted: false,
      id: new Date().getTime().toString().slice(-4, -1),
    })
  } else {
    return
  }
  todoVal.value = ' '
  renderList()
  getTodos()
  getItemLeft()
})

//add completed todo
const AddCompleted = (e) => {
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
    getItemLeft()
    renderList()
    getTodos()
  }
}
document.addEventListener('click', AddCompleted)


//Filter buttons functionality 
controller.addEventListener('click', (e) => {
  const allBtn = e.target.closest('.all-btn')
  const activeBtn = e.target.closest('.active-btn')
  const completedBtn = e.target.closest('.completed-btn')

  controleBtn.forEach((btn) => btn.classList.remove('active'))

  //Display all activetodo List, and I removed this event listeners from check btn and close
  if (activeBtn) {
    removeEventListener('click', AddCompleted)
    const activeTodos = todos.filter((todo) => !todo.isCompleted)
    renderList(activeTodos)
    activeBtn.classList.add('active')
    document.removeEventListener('click', AddCompleted)
    document.removeEventListener('click', removeTodo)
    hideClosebtn()

    //Display all Completed todo List, and I removed this event listeners from check btn and close
  } else if (completedBtn) {
    document.removeEventListener('click', AddCompleted)
    const completedTodos = todos.filter((todo) => todo.isCompleted)
    renderList(completedTodos)
    document.removeEventListener('click', AddCompleted)
    document.removeEventListener('click', removeTodo)
    completedBtn.classList.add('active')
    hideClosebtn()

    //Display All Todos List 
  } else if (allBtn) {
    renderList(todos)
    allBtn.classList.add('active')
    document.addEventListener('click', AddCompleted)
    document.addEventListener('click', removeTodo)
    getTodos()
  }
})

//get active item length and print to the screen
const getItemLeft = () => {
  let itemsLeft = []
  itemsLeft = todos.filter((todo) => {
    return !todo.isCompleted
  })

  itemLeftEl.innerText = `${itemsLeft.length} Items left`
}
getItemLeft()

//clear completed todo function
const clearCompleted = () => {
  clearBtn.addEventListener('click', () => {
    todos = todos.filter((todo) => !todo.isCompleted)
    renderList(todos)
    getTodos()
  })
}
clearCompleted()

//remove single todos function
const removeTodo = (e) => {
  let click = e.target.closest('.close-btn')
  if (!click) return
  const removedEl = click.parentElement
  todos = todos.filter((todo) => todo.id !== removedEl.id)
  renderList(todos)
  getItemLeft()
  getTodos()
}
document.addEventListener('click', removeTodo)

//Hide close btns when active or completed is render
const hideClosebtn = ()=> {
 let removeds = document.querySelectorAll('.close-btn')
 removeds.forEach((i) => (i.style.display = 'none'))
}




//Draggable Functions
const li = document.querySelectorAll('li')

li.forEach(draggable=> {
 draggable.addEventListener('dragstart', ()=>{
  draggable.classList.add('dragging')
 })

 draggable.addEventListener('dragend', ()=> {
  draggable.classList.remove('dragging')
 })
})

list.addEventListener('dragover', e => {
 e.preventDefault()
 const afterElement = getDragAfterElement(list, e.clientY)
 const draggable = document.querySelector('.dragging');
 if(afterElement === null){
  list.appendChild(draggable)
 }else {
  list.insertBefore(draggable, afterElement)
 }
})

const getDragAfterElement = (container, y)=> {
 const draggableElent =  [...container.querySelectorAll('.draggable:not(.dragging)')]
 return draggableElent.reduce((closest, child)=>{
  const box = child.getBoundingClientRect()
  const offset = y - box.top - box.height / 2
  if(offset < 0 && offset > closest.offset){
   return {offset:offset, element:child}
  }else{
   return closest
  }
 }, {offset: Number.NEGATIVE_INFINITY}).element
}