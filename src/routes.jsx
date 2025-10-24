import { useRoutes, Navigate, useNavigate } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import LandingLayout from "./layout/LandingLayout";
import Login from "./Views/auth/Login";
import SignUp from "./Views/auth/SignUp";
import Layout from "./layout/DashboardLayout/Layout";
import Settings from "./Views/Settings/Settings";
import ChatbotBuilder from "./Views/ChatbotBuilder/ChatbotBuilder";

export default function Router() {
  const isAuthenticated  = false;
  const navigate=useNavigate()

  const element = useRoutes([
    {
      path: "/login",
      element:  <Login />,
    },
     {
      path: "/signup",
      element:  <SignUp />,
    },
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
      ],
    },
  ]);

  return element;
}