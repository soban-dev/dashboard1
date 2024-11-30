import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from './Layout/DashboardLayout';
import SignIn from './pages/SignIn/SignIn';
import DashboardContent from './pages/Dashboard/DashboardContent';
import Invoices from './pages/Billing/BillingContent';
import EmployRegistration from "./pages/EmployRegistration/EmployRegistration";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/sign-up" element={<EmployRegistration />} />
        {/* Add more public routes like SignUp here */}
        <Route path="/sign-in" element={<SignIn />} />

        {/* Private/Dashboard Routes */}
        <Route path="/*" element={<DashboardLayout />} >
          <Route path="" element={<DashboardContent />} />
          <Route path="billing" element={<Invoices />} />
          {/* Add more dashboard-related routes here */}
          {/* <Route path="/" element={<DashboardContent />} />
            <Route path="/billing" element={<Invoices />} />
            <Route path="/tables" element={<TableContent />} />
            <Route path="/profile" element={<ProfileComponent />} />
            <Route path="/notifications" element={<NotificationComponent />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
