import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './components/Login'
import Me from './components/Me'
import Employees from './components/Employees'
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit'
import Reviews from './components/Reviews'
import ReviewCreate from './components/ReviewCreate'
import ReviewEdit from './components/ReviewEdit'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={'/login'} exact component={Login}/>
        <Route path={'/me'} exact component={Me}/>
        <Route path={'/'} exact component={Employees}/>
        <Route path={'/employees/create'} exact component={EmployeeCreate}/>
        <Route path={'/employees/:id/edit'} exact component={EmployeeEdit}/>
        <Route path={'/employees/:id/reviews'} exact component={Reviews}/>
        <Route path={'/employees/:id/reviews/create'} exact component={ReviewCreate}/>
        <Route path={'/employees/:id/reviews/:reviewId/edit'} exact component={ReviewEdit}/>
      </BrowserRouter>
    </div>
  )
}

export default App
