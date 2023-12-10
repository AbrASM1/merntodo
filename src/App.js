import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Register from './Routes/Register';
import Home from './Routes/Home';
import Login from './Routes/Login';
import Help from './Routes/Help';
export const CredentialsContext = React.createContext()

function App() {
  const credentialsState = useState({});

  return (

    <CredentialsContext.Provider value={credentialsState}>
      <Router>

        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/register" Component={Register} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/help" Component={Help}/>
        </Routes>
      </Router>
    </CredentialsContext.Provider>

  );
}

export default App;
