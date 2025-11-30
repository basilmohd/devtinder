import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes, Route} from 'react-router-dom'
import Body from './pages/Body'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Profile from './pages/Profile'

function App() {

  return (        
      <Routes>
        <Route path='/' element={<Body />} >   
          <Route path='/' element={<Feed/>} /> 
          <Route path='/login' element={<Login/>} />     
          <Route path='/profile' element={<Profile/>} /> 
        </Route>
        <Route path='/error' element={<h1>Error Page</h1>} />
      </Routes>      
  )
}

export default App
