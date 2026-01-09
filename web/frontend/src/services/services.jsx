import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../routes/routes.jsx'
import '../assets/css/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
