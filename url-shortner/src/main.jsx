import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Router, RouterProvider, createBrowserRouter} from 'react-router-dom'
import ShortURLAnalysis from './components/ShortUrlAnalytics/ShortURLAnalysis.jsx'
import { QRCode } from './components/QRCode/QRCode.jsx'
import { URLContextProvider } from './contexts/URLContext.jsx'
import {Loginpage} from './pages/Loginpage.jsx'
import {Registerpage} from './pages/Registerpage.jsx'
import { FirebaseAuthContextProvider } from './contexts/FirebaseAuthContext.jsx'


const Routes =createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/url-analytics',
    element:<ShortURLAnalysis/>
  },
  {
    path:'/qr-code',
    element:<QRCode/>
  },
  {
    path:'/url-redirection',
    element:<div>URL redirection componenet..</div>
  },{
    path:'/login',
    element:<Loginpage/>
  },
  {
    path:'/register',
    element:<Registerpage/>
  }
])

createRoot(document.getElementById('root')).render(



<FirebaseAuthContextProvider>
  
<URLContextProvider>

<RouterProvider router={Routes}></RouterProvider>
  </URLContextProvider>
</FirebaseAuthContextProvider>





    

)
