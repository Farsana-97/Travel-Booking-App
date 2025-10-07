import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Admin } from "./pages/AdminDashboard/Admin";
import { Destination } from "./pages/AdminDashboard/Destination";
import { Package } from "./pages/AdminDashboard/Package";
import { Booking } from "./pages/AdminDashboard/Booking";
import { Payments } from "./pages/AdminDashboard/Payments";
import ProtectedRoute from "./components/ProtectedRoute";
import { PackagePage } from "./pages/UserDashboard/PackagePage";
import { PackageDetail } from "./pages/UserDashboard/PackageDetail";
import { BookingPage } from "./pages/UserDashboard/BookingPage";
import { PaymentPage } from "./pages/UserDashboard/PaymentPage";
import { SuccessPage } from "./components/SuccessPage";
import { ViewMyBooking } from "./pages/UserDashboard/ViewMyBooking";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/destination"
          element={
            <ProtectedRoute>
              <Destination />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/packages"
          element={
            <ProtectedRoute>
              <Package />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/package-view" element={<PackagePage />}></Route>
        <Route path="/package-view/:id" element={<PackageDetail />}></Route>
        
        <Route path="/book-your-pkg/:id" element={<BookingPage />}></Route>
        <Route path="/payment-session/:bookingId" element={<PaymentPage />} />
        <Route path="/payment-success/:sessionId" element={<SuccessPage />} />
        <Route path="/view-my-booking/:id" element={<ViewMyBooking />} />

      </Routes>
    </div>
  );
}

export default App;
