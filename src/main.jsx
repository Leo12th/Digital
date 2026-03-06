import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './styles/global.css'
import App from './App.jsx'

document.documentElement.setAttribute('data-theme', 'dark')

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
