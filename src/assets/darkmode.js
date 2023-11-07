// check for saved 'darkMode' in localStorage
let darkMode = localStorage.getItem('darkMode') 

const darkModeToggle = document.querySelector('#dark-mode-toggle')
const darkModeMeta = document.querySelector('meta[name="color-scheme"]')

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('darkmode')
  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled')
  // 3. Update the meta color-scheme
  darkModeMeta.setAttribute('content', 'dark')
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmode')
  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null)
   // 3. Update the meta color-scheme
   darkModeMeta.setAttribute('content', 'light')
}
 
// If the user already visited and enabled darkMode
if (darkMode === 'enabled') {
  enableDarkMode()
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('darkMode') 
  
  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode()
  // if it has been enabled, turn it off  
  } else {  
    disableDarkMode() 
  }
})