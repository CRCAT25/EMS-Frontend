import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* http://localhost:3000 */}
          <Route path='/' element={<ListEmployeeComponent />} />
          {/* http://localhost:3000/employees */}
          <Route path='/employees' element={<ListEmployeeComponent />} />
          {/* http://localhost:3000/add-employee */}
          <Route path='/add-employee' element={<EmployeeComponent />} />
          {/* http://localhost:3000/update-employee/1 */}
          <Route path='/update-employee/:id' element={<EmployeeComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
