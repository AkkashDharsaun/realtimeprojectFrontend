import './App.css'
import Form from './Components/Form'
import RegisterForm from './Components/Register'
import {Routes, Route } from 'react-router-dom'
function App() {

  return (
      <div>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
      </div>
  )
}

export default App
