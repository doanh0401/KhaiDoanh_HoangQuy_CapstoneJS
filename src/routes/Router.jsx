import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import HomeLayout from "../layouts/HomeLayout/HomeLayout";
import MovieDetail from "../pages/MovieDetail/MovieDetail";
import UserProfile from "../pages/UserProfile/UserProfile";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import MovieManagement from "../pages/MovieManagement/MovieManagement";
import Login from "../pages/Login/Login";
import Booking from "../pages/Booking/Booking";
import AuthGuard from "../guards/AuthGuard";
import AdminGuard from "../guards/AdminGuard";

import Film from "../pages/Film/Film";
import Users from "../pages/Users/Users";
import Showtime from "../pages/Showtime/Showtime";
import Addnew from "../pages/Film/AddNew/Addnew";
import Edit from "../pages/Film/Edit/Edit";
import Showtimes from "../pages/Film/Showtimes/Showtimes";
export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movie-detail/:movieId",
          element: <MovieDetail />,
        },
        {
          path: "/movie-list",
          element: <MovieList/>
        },
        {
          path: "/booking/:id",
          element: <Booking />
        }
      ]
    },
    {
      path: "/admin",
      element: (
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      ),
      children: [
        {
          path: "/admin",
          element: <MovieManagement />,
        },
        {
          path: "/admin/users",
          element: <Users />,
        },
        {
          path: "/admin/film",
          element: <Film />,
        },
        {
          path: "/admin/film/addnew",
          element: <Addnew />,
        },
        {
          path: "/admin/edit/:id",
          element: <Edit />,
        },
        {
          path: "/admin/showtime",
          element: <Showtime />,
        },
        {
          path: "/admin/showtimes/:id/:tenphim",
          element: <Showtimes />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return routing;
}
