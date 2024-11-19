import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="457746752857-n3b8nimk2pbdb7vuegsl26h8nudbpbdo.apps.googleusercontent.com">
      <App/>
    </GoogleOAuthProvider>
  </StrictMode>,
)
