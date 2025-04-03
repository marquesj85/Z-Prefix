import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ManagerProvider } from './Context.jsx'

createRoot(document.getElementById('root')).render(
  <ManagerProvider>
  <BrowserRouter>
  <App />
  </BrowserRouter>
  </ManagerProvider>,
)
