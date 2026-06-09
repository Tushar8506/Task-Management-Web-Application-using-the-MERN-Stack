import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import TaskListPage from './pages/TaskListPage'
import ShowTask from './pages/ShowTask'
import Login from './pages/Login/Login'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>

    {/* Login Page */}
    <Route path="/" element={<Login />} />

    {/* Protected Pages */}
    <Route element={<Layout />}>
      <Route path="/home" element={<HomePage />} />
      <Route path="/task-list" element={<TaskListPage />} />
      <Route path="/show-task/:taskid" element={<ShowTask />} />
    </Route>

  </Routes>
    </BrowserRouter>
   
  )
}

export default App