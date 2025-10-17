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
import { ViewDestination } from "./pages/UserDashboard/ViewDestination";
import { AboutUs } from "./pages/AboutUs";
import { AdminProtected } from "./components/AdminProtected";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/destination"
          element={
            <AdminProtected>
              <Destination />
            </AdminProtected>
          } 
        />
        <Route
          path="/admin"
          element={
            <AdminProtected>
              <Admin />
            </AdminProtected>
          }
         />
        <Route
          path="/packages"
          element={
            <AdminProtected>
              <Package />
            </AdminProtected>
          }
         />
        <Route
          path="/bookings"
          element={
            <AdminProtected>
              <Booking />
            </AdminProtected>
          }
         />
        <Route
          path="/payments"
          element={
            <AdminProtected>
              <Payments />
            </AdminProtected>
          }
         />
        <Route path="/package-view" element={<PackagePage />} />
        <Route path="/package-view/:id" element={<PackageDetail />} />

        <Route
          path="/book-your-pkg/:id"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
         />
        <Route
          path="/payment-session/:bookingId"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success/:sessionId"
          element={
            <ProtectedRoute>
              <SuccessPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-my-booking/:id"
          element={
            <ProtectedRoute>
              <ViewMyBooking />
            </ProtectedRoute>
          }
        />
        <Route path="/destination-view" element={<ViewDestination />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
