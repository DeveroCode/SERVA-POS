import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import LoginView from "./pages/Auth/LoginView"
import RegisterView from "./pages/Auth/RegisterView"

export default function router() {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route  path="login" element={<LoginView/>} />
          <Route  path="register" element={<RegisterView/>} />
        </Route>
    </Routes>
   </BrowserRouter>
  )
}
