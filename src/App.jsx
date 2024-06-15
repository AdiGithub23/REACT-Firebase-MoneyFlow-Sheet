import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Auth from './pages/auth/auth.jsx'
import ExpenseTracker from './pages/expense_tracker/expense_tracker.jsx'

function App() {

  return (
    <>
    
      <Router>
        <Routes>
          <Route path='/' element={<Auth/>} />
          <Route path='/expenses' element={<ExpenseTracker/>} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
