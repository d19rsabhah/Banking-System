import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
// importing components
//import Header from "./Header";
import CreateUser from "./CreateUser";
import Home from "./Home";
import Users from "./Users";
import Transaction from "./Transaction";
import History from "./History";


const App = () => {
   let routes = useRoutes([
      { path: '/', element: <Home /> },
      { path: '/home', element: <Home /> },
      { path: '/createuser', element: <CreateUser /> },
      { path: '/users', element: <Users /> },
      { path: '/transaction', element: <Transaction /> },
      { path: '/history', element: <History/> }
    ]);
    return routes;
  };

 

export default App;
