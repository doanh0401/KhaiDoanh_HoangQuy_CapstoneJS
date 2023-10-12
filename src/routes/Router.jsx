import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import HomeLayout from '../layouts/HomeLayout/HomeLayout'
import MovieDetail from '../pages/MovieDetail/MovieDetail'
import UserProfile from '../pages/UserProfile/UserProfile'
import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import MovieManagement from '../pages/MovieManagement/MovieManagement'
import Login from '../pages/Login/Login'
import Booking from '../pages/Booking/Booking'
import AuthGuard from '../guards/AuthGuard'
export default function Router() {

  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/movie-detail/:movieId",
          element: <MovieDetail/>
        },
        {
          path: "/booking/:id",
          element: <AuthGuard>
                    <Booking />
                  </AuthGuard>
        },
        {
          path: "/profile",
          element: <UserProfile />
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <MovieManagement />,
        }
      ]

    },
    {
      path: "/login",
      element: <Login />
    }
  
  ])
  return routing;
}
