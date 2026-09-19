import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./pages/Auth/LoginView";
import RegisterView from "./pages/Auth/RegisterView";
import DIndex from "./layouts/DashboardLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProfileSettingLayout from "./layouts/ProfileSettingLayout";
import ProfileView from "./pages/dashboard/ProfileView";
import SecurityProfileView from "./pages/dashboard/SecurityProfileView";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import RoleMiddleware from "./middlewares/RoleMiddleware";
import { USER_ROLES } from "./types/Index.types";
import OwnerLayout from "./layouts/OwnerLayout";
import OIndexView from "./pages/dashboard/Owner/OIndexView";
import ExampleOwerner from "./pages/dashboard/Owner/ExampleOwener";
import BusinessView from "./pages/dashboard/Owner/Business/BusinessView";
import BranchesIndexView from "./pages/dashboard/Owner/Branch/BranchesIndexView";
import AddBranchView from "./pages/dashboard/Owner/Branch/AddBranchView";
import UpdateBranchView from "./pages/dashboard/Owner/Branch/UpdateBranchView";
import PersonnelView from "./pages/dashboard/Owner/Business/PersonnelView";
import RegisterPersonalView from "./pages/dashboard/Owner/Business/RegisterPersonalView";
import AddPersonnelView from "./pages/dashboard/Owner/Business/AddPersonalView";
import UpdatePersonnelView from "./pages/dashboard/Owner/Business/UpdatePersonnelView";

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
        </Route>

        <Route element={<AuthMiddleware />}>
          {/* Owner - Routes */}
          <Route element={<RoleMiddleware allowedRoles={[USER_ROLES.OWNER]} />}>
            <Route path="/dashboard" element={<OwnerLayout />}>
              {/* Dashboard */}
              <Route index element={<OIndexView />} />
              <Route path="example" element={<ExampleOwerner />} />
              {/* Business */}
              <Route path="business/:businessId">
                <Route index element={<BusinessView />} />
                {/* Branches */}
                <Route path="branches">
                  <Route index element={<BranchesIndexView />} />
                  <Route path="new" element={<AddBranchView />} />
                  <Route
                    path=":branchId/update"
                    element={<UpdateBranchView />}
                  />
                </Route>
                {/* Personnel */}
                <Route path="personnel">
                  <Route index element={<PersonnelView />} />
                  <Route path="register" element={<RegisterPersonalView />} />
                  <Route path="update/:memberId" element={<UpdatePersonnelView />} />
                  <Route path="add" element={<AddPersonnelView />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="/dashboard" element={<DIndex />}>
            <Route index element={<DIndex />} />
            <Route path="menu" element={<DIndex />} />
            <Route path="orders" element={<DIndex />} />
            <Route path="tables" element={<DIndex />} />
            <Route path="pos" element={<DashboardLayout />} />
          </Route>

          {/* Profile Settings */}
          <Route path="/profile" element={<DashboardLayout />}>
            <Route element={<ProfileSettingLayout />}>
              <Route path="index" index element={<ProfileView />} />
              <Route path="security" index element={<SecurityProfileView />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
