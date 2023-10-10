import { useState } from 'react'
import { Route ,Routes } from "react-router-dom";

import './App.css'
import Home from './views/home/home';
import Create from './views/create/create';
import Detail from './views/detail/detail';
import Landing from './views/landing/landing';

function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" Component={Landing}/>
        <Route exact path="/home" Component={Home}/>
        <Route path="/home/:id" Component={Detail}/>
        <Route path="/create" Component={Create}/>
      </Routes>
    </div>
  )
}

export default App;
