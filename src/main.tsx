import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import './index.css'
import App from './App.tsx'
  import '@fontsource/roboto/300.css';
    import '@fontsource/roboto/400.css';
    import '@fontsource/roboto/500.css';
    import '@fontsource/roboto/700.css';
import {  UserProvider } from './Context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
    
  </StrictMode>,
)
