import './App.css'
import { Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Admin } from './pages/AdminDashboard/Admin';
import { User } from './pages/User';
import { Destination } from './pages/AdminDashboard/Destination';
import { Package } from './pages/AdminDashboard/Package';
import { Booking } from './pages/AdminDashboard/Booking';
import { Payments } from './pages/AdminDashboard/Payments';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  
  return (
   <div>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/destination' element={<ProtectedRoute><Destination /></ProtectedRoute> }></Route>
      <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>
      <Route path='/user' element={<User />}></Route>
      <Route path='/packages' element={<ProtectedRoute><Package /></ProtectedRoute>}></Route>
      <Route path='/bookings' element={<ProtectedRoute><Booking /></ProtectedRoute>}></Route>
      <Route path='/payments' element={<ProtectedRoute><Payments /></ProtectedRoute>}></Route>

    </Routes>
   </div>
  )
}

export default App
