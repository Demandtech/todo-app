const themeToggleBtn = document.querySelector('.toggle-theme')
const html = document.querySelector('html')
const toggleImg = document.querySelector('.toggle-img')

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
  text: 'Complete Online Javascript Course'
 }
]