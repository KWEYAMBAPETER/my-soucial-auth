import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//  import { Auth0Provider } from '@auth0/auth0-react';

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
//  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;


createRoot(document.getElementById('root')).render(
  
    //  <Auth0Provider
    // // domain={domain}
    // // clientId={clientId}
    // // redirectUri={window.location.origin}
    // > 
    
    // // </Auth0Provider> 
    <StrictMode>
      <App />
      </StrictMode>
  
)
