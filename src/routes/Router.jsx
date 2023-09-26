import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import HomeLayout from '../layouts/HomeLayout/HomeLayout'
import MovieDetail from '../pages/MovieDetail/MovieDetail'
import MovieList from '../pages/MovieList/MovieList'
<<<<<<< HEAD
import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import MovieManagement from '../pages/MovieManagement/MovieManagement'
=======
import Login from '../pages/Login/Login'
>>>>>>> bfcd9434559a7d0989e8483be9d8e5786d4dfe6f

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
          path: "/movie-list",
          element: <MovieList/>
        },
      ]
    },
    {
<<<<<<< HEAD
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <MovieManagement />,
        }
      ]
=======
      path: "/login",
      element: <Login />
>>>>>>> bfcd9434559a7d0989e8483be9d8e5786d4dfe6f
    }
  ])
  return routing;
}
