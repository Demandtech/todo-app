const themeToggleBtn = document.querySelector('.toggle-theme')
const html = document.querySelector('html')
const toggleImg = document.querySelector('.toggle-img')
const todoList = document.querySelector('.todo-list')
const todoVal = document.querySelector('.todo-val')
const form = document.querySelector('.form')
const checker = document.querySelector('.checker')

themeToggleBtn.addEventListener('click', () => {
  html.classList.toggle('dark-theme')

  if (html.classList.contains('dark-theme')) {
    toggleImg.src = './images/icon-sun.svg'
  } else {
    toggleImg.src = './images/icon-moon.svg'
  }
})

const todos = [
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
    text: 'pickup groceries',
    isCompleted: false,
    id: '5',
  },
  {
    text: 'Complete todo app on frontend mentor',
    isCompleted: false,
    id: '6'
  },
]

const renderList = () => {
  todoList.innerHTML = ''

  todos.forEach((todo) => {
    todoList.innerHTML += `
   <li id="${todo.id}" class="${todo.isCompleted ? 'todo completed' : 'todo'}">
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
  renderList()
  todoVal.value = ' '
})

document.addEventListener('click', (e) => {
  const target = e.target.closest('.checker')
  if(target){
     todos.map(todo=> {
      if(todo.id === target.id){
         if(todo.isCompleted === true){
          todo.isCompleted = false
         }else{
          todo.isCompleted = true
         }
      }
     })
  }
  renderList()
 })
