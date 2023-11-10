// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('darkMode') 

const darkModeToggle = document.querySelector('#dark-mode-toggle')
const darkModeMeta = document.querySelector('meta[name="color-scheme"]')
const sun = document.querySelector('#sun')
const moon = document.querySelector('#moon')

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('darkmode')
  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled')
  // 3. Update the meta color-scheme
  darkModeMeta.setAttribute('content', 'dark')
  // 4. Change the icon
  sun.style.display = "block"
  moon.style.display = "none"
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmode')
  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null)
   // 3. Update the meta color-scheme
   darkModeMeta.setAttribute('content', 'light')
   // 4. Change the icon
  sun.style.display = "none"
  moon.style.display = "block"
}
 
// If the user already visited and enabled darkMode
if (darkMode === 'enabled') {
  enableDarkMode()
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode') 
  
  if (darkMode !== 'enabled') {
    enableDarkMode()
  } else {  
    disableDarkMode() 
  }
})