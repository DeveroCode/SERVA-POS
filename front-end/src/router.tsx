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
              <Route index path="general" element={<OIndexView />} />
              <Route path="business/:businessId" element={<BusinessView />} />
              <Route path="business/:businessId/branches" element={<BranchesIndexView />}/>
              <Route path="business/:businessId/branches/new" element={<AddBranchView />}/>
              <Route path="business/:businessId/:branchId/update" element={<UpdateBranchView />}/>
              <Route path="business/:businessId/personnel" element={<PersonnelView />}/>
              <Route path="business/:businessId/register/member" element={<RegisterPersonalView />}/>
              <Route path="business/:businessId/add/member" element={<AddPersonnelView />}/>
              <Route index path="example" element={<ExampleOwerner />} />
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
