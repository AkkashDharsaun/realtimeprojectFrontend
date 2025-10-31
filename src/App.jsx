import './App.css'
import Form from './Components/Form'
import RegisterForm from './Components/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/https://realtimeprojectfrontend-m73v.vercel.app/register" element={<RegisterForm />} />
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
