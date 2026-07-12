import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import LoginView from "./pages/Auth/LoginView"
import RegisterView from "./pages/Auth/RegisterView"
import DIndex from "./layouts/DashboardLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import ProfileSettingLayout from "./layouts/ProfileSettingLayout"
import ProfileView from "./pages/dashboard/ProfileView"
import SecurityProfileView from "./pages/dashboard/SecurityProfileView"

export default function router() {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route  path="login" element={<LoginView/>} />
          <Route  path="register" element={<RegisterView/>} />
        </Route>
        <Route path="/dashboard" element={<DIndex/>}>
            <Route index element={<DIndex/>} />
            <Route path="menu" element={<DIndex/>} />
            <Route path="orders" element={<DIndex/>} />
            <Route path="tables" element={<DIndex/>} />
            <Route path="pos" element={<DashboardLayout/>} />
        </Route>

        {/* Profile Settings */}
        <Route path="/profile" element={<DashboardLayout/>}>
            <Route element={<ProfileSettingLayout/>}>
              <Route path="index" index element={<ProfileView/>} />
              <Route path="security" index element={<SecurityProfileView/>} />
            </Route>
        </Route>
    </Routes>
   </BrowserRouter>
  )
}
