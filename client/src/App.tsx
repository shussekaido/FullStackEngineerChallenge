import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './components/Login'
import Me from './components/Me'
import Employees from './components/Employees'
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/login'} exact component={Login}/>
        <Route path={'/me'} exact component={Me}/>
        <Route path={'/'} exact component={Employees}/>
        <Route path={'/employees/create'} exact component={EmployeeCreate}/>
        <Route path={'/employees/:id/edit'} exact component={EmployeeEdit}/>
      </BrowserRouter>
    </div>
  )
}

export default App
