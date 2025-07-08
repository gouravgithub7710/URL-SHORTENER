//import { Link, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayouts from './Layouts/AppLayouts'
import Auth from './Pages/Auth'
import Dashboard from './Pages/Dashboard'
import RedirectLink from './Pages/RedirectLink'
import LandingPage from './Pages/LandingPage'
import Links from './Pages/Links'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UrlProvider from './Context'
import RequireAuth from './components/require-auth'

const router = createBrowserRouter([
  {
    element:<AppLayouts />,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      {
        path:'/dashboard',
        element:(
          <RequireAuth>
          <Dashboard/>
          </RequireAuth>
        ),
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      {
        path:'/link/:id',
        element: (
                  <RequireAuth>
                  <Links/>
                  </RequireAuth>
                ),
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      }
    ]
  }
])
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router}/>
    </UrlProvider>
    
      
    
  )
}

export default App
